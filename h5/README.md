# CareConnect ePRO · H5

WeChat-ready H5 for oncology ePRO (Study C-194), **Compassionate Care Framework**.

## Authentication

Unified **username / password** login with coarse roles (Logto-ready via `src/auth/`):

| Role | Accounts | Access |
|------|----------|--------|
| 系统管理员 | `admin` | Admin console + all portals + password reset |
| 组织管理员 | `orgadmin` | Admin console + reset external users |
| 外部用户 | `user1` | 患者端 |
| 外部用户 | `user2` | 临床端 |
| 外部用户 | `user3` | 研究端 |

Replace `LocalAuthProvider` with a Logto provider implementing the same `AuthProvider` interface.

## User journeys

**Login** → role-based home → full flows with consistent **返回** navigation on every sub-page.

- **患者端**: Home → Assessment (review) → Success → Wisdom → Notifications → Profile
- **临床端**: Cohort (filter/search) → Patient → Intervention → Success
- **研究端**: Analytics → Export (file download)
- **管理端**: Hub → User management (password reset)

## Quick start

```bash
cd h5
npm install
npm run dev -- --port 5180
```

Open http://localhost:5180/login

## Build

```bash
npm run build && npm run preview
```
