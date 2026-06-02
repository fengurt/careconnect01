# CareConnect ePRO

Oncology clinical trial ePRO platform (Study C-194) — WeChat-ready H5 built on the **Compassionate Care Framework**.

## Repository layout

| Path | Description |
|------|-------------|
| `h5/` | React + Vite H5 application |
| `ecare-DESIGN.md` | Design system tokens |
| `docker/` | Nginx config for production |
| `Dockerfile` | Nginx image serving pre-built H5 (`linux/amd64`) |
| `docker-compose.yml` | Single-service deployment |

## Quick start (development)

```bash
cd h5
npm install
npm run dev -- --port 5180
```

Open http://localhost:5180/login

## Docker deployment (AMD64 server)

```bash
cp .env.example .env
chmod +x scripts/deploy-amd.sh
./scripts/deploy-amd.sh
```

Or manually:

```bash
docker compose build
docker compose up -d
```

Default URL: **http://\<server-ip\>:8080/login**

### Production notes

- Set `HOST_PORT` in `.env` (default `8080`).
- Put a reverse proxy (Caddy/Nginx) in front for TLS and WeChat domain verification.
- Image targets **`linux/amd64`** for standard AMD VPS/bare metal.

## Authentication

Username/password login with coarse roles (`system_admin`, `org_admin`, `external_user`). Auth is abstracted in `h5/src/auth/` for future Logto SSO.
