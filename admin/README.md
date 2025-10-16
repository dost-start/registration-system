## Admin App

Admin portal for managing registrants, event status, and check-ins.

### Run Locally
Prereqs: Node 20+, npm, Supabase project

1) Set env in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
2) Install and start:
```
npm install
npm run dev
```
Open http://localhost:3000

### Features
- Login via email/password
- Dashboard stats and event info
- Registrant table: filter, sort, view details
- Update status (pending/accepted/rejected)
- Toggle check-in, batch actions
- Toggle registration open/closed

### Tech Notes
- Supabase client (browser): `src/lib/supabase/client.ts`
- Supabase server client: `src/lib/supabase/server.ts`
- Data utilities: `src/lib/data.ts`
- Auth server actions: `src/app/actions/auth.ts`
- Zod admin schema: `src/schemas/addRegistrantSchema.ts`

### Production
- Deploy (e.g., Vercel)
- Provide env vars in project settings
