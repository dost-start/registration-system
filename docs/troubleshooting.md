## Troubleshooting

### Missing Supabase env vars
Symptoms: runtime errors "Missing Supabase configuration".
Fix: set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Email already registered
`submitRegistration` returns error and form shows validation error.
Fix: use a different email or clear duplicate record.

### SSR cookies not set
Symptoms: auth/session not persisting on server.
Fix: ensure `@supabase/ssr` cookie get/set is wired and not called in disallowed contexts.

### PGRST116 not found
This is OK for lookup misses; handle as empty state.

### Deployment issues
- Verify env vars in hosting provider
- Rebuild after changing env


