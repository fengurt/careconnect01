import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { type Locale, t } from '../i18n'
import {
  type InterventionType,
  type InterventionRecord,
  type AppNotification,
  DEFAULT_NOTIFICATIONS,
  avgScore,
} from '../data/mock'
import {
  type AuthSession,
  type AuthUser,
  type Portal,
  getAuthProvider,
  syncSessionFromProvider,
  homePathForUser,
  canAccessPortal,
  isAdmin,
} from '../auth'

const APP_STORAGE_KEY = 'careconnect_app_state'
const TASK_WISDOM_ARTICLE_ID = '1'

export interface AssessmentRecord {
  date: string
  scores: Record<string, number>
  avg: number
}

interface AppState {
  locale: Locale
  assessmentDone: boolean
  readArticles: string[]
  streak: number
  lastScores: Record<string, number>
  assessmentHistory: AssessmentRecord[]
  notifications: AppNotification[]
  interventions: InterventionRecord[]
  privacyMode: boolean
}

interface AppContextValue extends AppState {
  tr: ReturnType<typeof t>
  session: AuthSession | null
  user: AuthUser | null
  wisdomRead: boolean
  unreadCount: number
  isAuthenticated: boolean
  setLocale: (l: Locale) => void
  toggleLocale: () => void
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  resetUserPassword: (username: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>
  listManagedUsers: () => AuthUser[]
  canAccess: (portal: Portal) => boolean
  completeAssessment: (scores: Record<string, number>) => void
  markArticleRead: (id: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  logIntervention: (patientId: string, patientAlias: string, type: InterventionType, notes: string, followUp: boolean) => InterventionRecord
  togglePrivacyMode: () => void
}

const defaultState: AppState = {
  locale: 'zh',
  assessmentDone: false,
  readArticles: [],
  streak: 12,
  lastScores: {},
  assessmentHistory: [],
  notifications: DEFAULT_NOTIFICATIONS,
  interventions: [],
  privacyMode: true,
}

function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...defaultState,
        ...parsed,
        notifications: parsed.notifications ?? DEFAULT_NOTIFICATIONS,
        interventions: parsed.interventions ?? [],
        assessmentHistory: parsed.assessmentHistory ?? [],
        readArticles: parsed.readArticles ?? [],
      }
    }
  } catch { /* ignore */ }
  return defaultState
}

function saveAppState(state: AppState) {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state))
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadAppState)
  const [session, setSession] = useState<AuthSession | null>(() => syncSessionFromProvider())

  useEffect(() => { saveAppState(state) }, [state])
  useEffect(() => {
    document.documentElement.lang = state.locale === 'zh' ? 'zh-CN' : 'en'
  }, [state.locale])

  const user = session?.user ?? null

  const setLocale = useCallback((locale: Locale) => {
    setState(s => ({ ...s, locale }))
  }, [])

  const toggleLocale = useCallback(() => {
    setState(s => ({ ...s, locale: s.locale === 'zh' ? 'en' : 'zh' }))
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const result = await getAuthProvider().login(username, password)
    if (!result.ok) return { ok: false, error: result.error }
    setSession(result.session)
    return { ok: true }
  }, [])

  const logout = useCallback(async () => {
    await getAuthProvider().logout()
    setSession(null)
  }, [])

  const resetUserPassword = useCallback(async (username: string, newPassword: string) => {
    if (!user) return { ok: false, error: 'forbidden' }
    return getAuthProvider().resetPassword(user, username, newPassword)
  }, [user])

  const listManagedUsers = useCallback(() => {
    if (!user) return []
    return getAuthProvider().listManagedUsers(user)
  }, [user])

  const canAccess = useCallback((portal: Portal) => {
    if (!user) return false
    return canAccessPortal(user, portal)
  }, [user])

  const completeAssessment = useCallback((scores: Record<string, number>) => {
    const record: AssessmentRecord = {
      date: new Date().toISOString(),
      scores,
      avg: avgScore(scores),
    }
    setState(s => ({
      ...s,
      assessmentDone: true,
      lastScores: scores,
      streak: s.assessmentDone ? s.streak : s.streak + 1,
      assessmentHistory: [record, ...s.assessmentHistory].slice(0, 10),
    }))
  }, [])

  const markArticleRead = useCallback((id: string) => {
    setState(s => ({
      ...s,
      readArticles: s.readArticles.includes(id) ? s.readArticles : [...s.readArticles, id],
    }))
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => ({ ...n, read: true })),
    }))
  }, [])

  const logIntervention = useCallback((
    patientId: string,
    patientAlias: string,
    type: InterventionType,
    notes: string,
    followUp: boolean,
  ): InterventionRecord => {
    const record: InterventionRecord = {
      id: `INT-${Date.now()}`,
      patientId,
      patientAlias,
      type,
      notes,
      followUp,
      timestamp: new Date().toISOString(),
    }
    setState(s => ({ ...s, interventions: [record, ...s.interventions] }))
    return record
  }, [])

  const togglePrivacyMode = useCallback(() => {
    setState(s => ({ ...s, privacyMode: !s.privacyMode }))
  }, [])

  const wisdomRead = state.readArticles.includes(TASK_WISDOM_ARTICLE_ID)
  const unreadCount = state.notifications.filter(n => !n.read).length
  const tr = t(state.locale)

  return (
    <AppContext.Provider
      value={{
        ...state,
        tr,
        session,
        user,
        wisdomRead,
        unreadCount,
        isAuthenticated: !!session,
        setLocale,
        toggleLocale,
        login,
        logout,
        resetUserPassword,
        listManagedUsers,
        canAccess,
        completeAssessment,
        markArticleRead,
        markNotificationRead,
        markAllNotificationsRead,
        logIntervention,
        togglePrivacyMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export { homePathForUser, isAdmin }
