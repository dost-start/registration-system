## Database

### Tables

#### form_entries
- Identity: `id` (int), `created_at` (timestamp)
- Person: `first_name`, `middle_name?`, `last_name`, `suffix?`, `email`
- Contact: `contact_number`, `facebook_profile?`
- Academic: `region`, `university`, `course`, `year_level?`, `year_awarded?`, `scholarship_type`
- Status: `status` (pending|accepted|rejected), `is_checked_in` (boolean)

Recommendations:
- Unique index on `email`
- Index on `(status)`, `(is_checked_in)` for admin dashboards

#### options
- `id` (text primary key) — e.g., `is_event_closed`
- `value` (boolean)

### Data Mapping
- Client schema to DB (example):
  - `firstName` -> `first_name`
  - `middleName` -> `middle_name`
  - `lastName` -> `last_name`
  - `email` -> `email`
  - `contactNumber` -> `contact_number`
  - `facebookProfile` -> `facebook_profile`
  - `yearLevel` -> `year_level`
  - `yearAwarded` -> `year_awarded`
  - `dostStartMember` -> `is_start_member`

### Error Conventions
- Not found: Supabase code `PGRST116`
- Insert/update errors surface `error.message`


