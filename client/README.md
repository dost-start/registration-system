## Client App

Public registration frontend for collecting attendee information and showing confirmation.

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

### User Flows
- Registration: fill form, Zod validation, submit to server action
- Success page: redirects with base64-encoded email query param
- Verification: server action fetches the latest record by email

### Tech Notes
- Server actions: `src/app/actions/registration.ts`, `verify-registration.ts`, `event-status.ts`
- Zod schema: `src/components/registration-form/registrationSchema.ts`
- UI: Radix UI + Tailwind

### Production
- Deploy (e.g., Vercel)
- Provide env vars in project settings
