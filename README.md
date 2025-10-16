## Registration System Monorepo

Two Next.js 15 apps powered by Supabase for an event registration workflow:
- `client`: public-facing registration and verification
- `admin`: admin portal for managing registrants, check-ins, and event status

### Quick Start
1) Prerequisites: Node 20+, npm (or pnpm/yarn), a Supabase project
2) Set environment variables (both apps use the same names):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3) Install and run:
```bash
cd client && npm install && npm run dev
# in a second terminal
cd ../admin && npm install && npm run dev
```
Visit `http://localhost:3000` for each app.

### Repository Structure
```
registration-system/
  admin/            # Admin portal
  client/           # Public registration app
  docs/             # Architecture, setup, DB, security, ops, troubleshooting
  README.md         # You are here
```

### What This System Does
- Collects attendee info via `client`
- Persists data to Supabase table `form_entries`
- Lets admins review, update status, check-in, and toggle registration state via `admin`

### Key Technologies
- Next.js 15 (App Router, Server Actions)
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- TypeScript, Zod, Tailwind, Radix UI

### Documentation
See additional docs in `docs/`:
- `docs/architecture.md`
- `docs/setup.md`
- `docs/database.md`
- `docs/security-auth.md`
- `docs/operations.md`
- `docs/troubleshooting.md`


