## Security and Authentication

### Supabase Clients
- Browser: `admin/src/lib/supabase/client.ts` — uses `NEXT_PUBLIC_*` keys
- Server: `admin/src/lib/supabase/server.ts` — uses cookies with `@supabase/ssr`

Both require:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Admin Authentication
- Server actions:
  - `signIn(formData)` — `supabase.auth.signInWithPassword`
  - `signOut()` — clears session and redirects to `/login`
- Protect admin pages using middleware (if added) and server checks as needed.

### Public Keys and Risk
- The anon key is public by design; restrict RLS policies appropriately in Supabase.
- Consider rate limiting on sensitive endpoints and bot protection for forms.

### Cookies and SSR
- Server client wires Next.js `cookies()` get/set for SSR
- Ensure cookies are forwarded and set even within Server Components boundaries


