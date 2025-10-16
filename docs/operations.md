## Operations

### Deploy
- Recommended: Vercel or any Node hosting
- Set environment variables for each app (Project Settings)
- Build with `next build`, run with `next start`

### Environment Management
- Keep `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in project settings
- Rotate anon keys if leaked; RLS should mitigate

### Admin Tasks
- Toggle event registration in admin UI (writes to `options` table)
- Manage registrants: CRUD, status changes, check-in
- Export/backup: use Supabase exports or SQL

### Monitoring & Logs
- Supabase dashboard: SQL logs and table activity
- Vercel/hosting logs for server actions

### Backups
- Schedule database backups in Supabase
- Store exports securely


