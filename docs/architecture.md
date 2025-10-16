## Architecture

### Overview
- Two Next.js 15 apps: `client` (public) and `admin` (internal)
- Data stored in Supabase tables: `form_entries`, `options`
- Auth handled via Supabase; SSR/CSR clients created with `@supabase/ssr`

### High-Level Data Flow
1. User submits registration in `client`
2. Server action validates (Zod) and inserts into `form_entries`
3. Admin reviews entries in `admin`, updates status and check-ins
4. Admin toggles event registration via `options(id=is_event_closed)`

### Key Modules
- Client server actions:
  - `submitRegistration`: validate + insert + redirect
  - `verifyRegistration`: fetch latest entry by email
  - `getEventRegistrationStatus`: read toggle from `options`
- Admin data layer (`admin/src/lib/data.ts`):
  - Fetch registrants and stats
  - Update status, check-in, info, delete
  - Read/Toggle event status
- Supabase clients:
  - `admin/src/lib/supabase/client.ts`: browser client
  - `admin/src/lib/supabase/server.ts`: server client with cookies

### Pages and Routes
- Client
  - `/` and `/national-summit`: registration UI
  - `/success`: confirmation with encoded email parameter
- Admin
  - `/login`: email/password sign-in
  - `/national-summit` and `/national-summit/manage`: dashboard and management

### Data Contracts
- `form_entries` expected fields include: name, email (unique), contact, study info, status, is_checked_in, timestamps
- `options` stores feature flags like `is_event_closed`

### Error Handling
- Uses Supabase error codes (e.g., PGRST116 not found)
- Validates inputs with Zod; returns structured errors for forms


