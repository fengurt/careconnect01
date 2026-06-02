import type { AuthProvider, AuthSession, AuthUser, LoginResult } from './types'
import { isAdmin } from './types'

const SESSION_KEY = 'careconnect_session'
const PASSWORD_OVERRIDES_KEY = 'careconnect_password_overrides'

interface AccountDef {
  password: string
  role: AuthUser['role']
  displayNameZh: string
  displayNameEn: string
  portal: AuthUser['portal']
  organizationId: string
}

/** Default accounts — credentials never rendered in UI. Swap provider for Logto in production. */
const ACCOUNTS: Record<string, AccountDef> = {
  admin: {
    password: '123456a',
    role: 'system_admin',
    displayNameZh: '系统管理员',
    displayNameEn: 'System Admin',
    portal: null,
    organizationId: 'org-careconnect',
  },
  orgadmin: {
    password: '123456a',
    role: 'org_admin',
    displayNameZh: '组织管理员',
    displayNameEn: 'Org Admin',
    portal: null,
    organizationId: 'org-careconnect',
  },
  user1: {
    password: '123456a',
    role: 'external_user',
    displayNameZh: '小康',
    displayNameEn: 'Alex',
    portal: 'patient',
    organizationId: 'org-careconnect',
  },
  user2: {
    password: '123456a',
    role: 'external_user',
    displayNameZh: '临床专员',
    displayNameEn: 'Clinical Staff',
    portal: 'clinical',
    organizationId: 'org-careconnect',
  },
  user3: {
    password: '123456a',
    role: 'external_user',
    displayNameZh: '研究协调员',
    displayNameEn: 'Research Coordinator',
    portal: 'research',
    organizationId: 'org-careconnect',
  },
}

function loadPasswordOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PASSWORD_OVERRIDES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function savePasswordOverrides(overrides: Record<string, string>) {
  localStorage.setItem(PASSWORD_OVERRIDES_KEY, JSON.stringify(overrides))
}

function resolvePassword(username: string): string | undefined {
  const key = username.toLowerCase()
  const overrides = loadPasswordOverrides()
  if (overrides[key]) return overrides[key]
  return ACCOUNTS[key]?.password
}

function toAuthUser(username: string): AuthUser | null {
  const key = username.toLowerCase()
  const def = ACCOUNTS[key]
  if (!def) return null
  return {
    username: key,
    role: def.role,
    displayNameZh: def.displayNameZh,
    displayNameEn: def.displayNameEn,
    portal: def.portal,
    organizationId: def.organizationId,
  }
}

function persistSession(session: AuthSession | null) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  else localStorage.removeItem(SESSION_KEY)
}

function readSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as AuthSession
    if (session.provider !== 'local' || !session.user?.username) return null
    return session
  } catch {
    return null
  }
}

class LocalAuthProvider implements AuthProvider {
  readonly name = 'local' as const
  private session: AuthSession | null = readSession()

  async login(username: string, password: string): Promise<LoginResult> {
    const key = username.trim().toLowerCase()
    const expected = resolvePassword(key)
    if (!expected || password !== expected) {
      return { ok: false, error: 'invalid_credentials' }
    }
    const user = toAuthUser(key)
    if (!user) return { ok: false, error: 'invalid_credentials' }
    this.session = { user, provider: 'local', issuedAt: Date.now() }
    persistSession(this.session)
    return { ok: true, session: this.session }
  }

  async logout(): Promise<void> {
    this.session = null
    persistSession(null)
  }

  getSession(): AuthSession | null {
    return this.session
  }

  async resetPassword(actor: AuthUser, targetUsername: string, newPassword: string) {
    if (!isAdmin(actor.role)) {
      return { ok: false, error: 'forbidden' }
    }
    const target = targetUsername.toLowerCase()
    const targetUser = toAuthUser(target)
    if (!targetUser) return { ok: false, error: 'not_found' }
    if (targetUser.role === 'system_admin' && actor.role !== 'system_admin') {
      return { ok: false, error: 'forbidden' }
    }
    if (newPassword.length < 6) return { ok: false, error: 'weak_password' }
    const overrides = loadPasswordOverrides()
    overrides[target] = newPassword
    savePasswordOverrides(overrides)
    return { ok: true }
  }

  listManagedUsers(actor: AuthUser): AuthUser[] {
    if (!isAdmin(actor.role)) return []
    return Object.keys(ACCOUNTS)
      .map(toAuthUser)
      .filter((u): u is AuthUser => u !== null)
      .filter(u => {
        if (actor.role === 'system_admin') return true
        return u.role === 'external_user' && u.organizationId === actor.organizationId
      })
  }
}

let provider: AuthProvider = new LocalAuthProvider()

/** Future: replace with LogtoAuthProvider when VITE_AUTH_PROVIDER=logto */
export function getAuthProvider(): AuthProvider {
  return provider
}

export function setAuthProvider(next: AuthProvider) {
  provider = next
}

export function syncSessionFromProvider(): AuthSession | null {
  return getAuthProvider().getSession()
}
