## Setup

### Prerequisites
- Node.js 20+
- npm (or pnpm/yarn)
- Supabase project (URL + anon key)

### Environment Variables
Set in both `client` and `admin` (e.g., `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=... 
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Install & Run
```
cd client && npm install && npm run dev
cd ../admin && npm install && npm run dev
```

### Scripts
- client
  - `dev`: next dev --turbopack
  - `build`: next build
  - `start`: next start
  - `lint`: next lint
- admin
  - `dev`: next dev --turbopack
  - `build`: next build
  - `start`: next start
  - `lint`: next lint

### Local URLs
- Client: http://localhost:3000
- Admin: http://localhost:3000


