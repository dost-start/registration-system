## Admin Technical Notes

### Core Modules
- `src/lib/data.ts`: CRUD and stats for `form_entries`; toggles in `options`
- `src/lib/supabase/client.ts`: browser Supabase client
- `src/lib/supabase/server.ts`: SSR Supabase client with cookies wiring
- `src/app/actions/auth.ts`: sign-in and sign-out server actions

### UI
- Registrant table components in `src/components/registrant-table/*`
- Shared UI primitives in `src/components/ui/*`

### Validation
- `src/schemas/addRegistrantSchema.ts` aligns with DB types


