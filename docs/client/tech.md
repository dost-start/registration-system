## Client Technical Notes

### Server Actions
- `submitRegistration` — validates via Zod, checks duplicates, inserts row, returns redirect URL
- `verifyRegistration` — decodes email, fetches latest record by email
- `getEventRegistrationStatus` — checks `options` table for `is_event_closed`

### Validation
- `src/components/registration-form/registrationSchema.ts`
- Strong types via `Database` and `TablesInsert` generated types

### UI
- Form built with React Hook Form + Zod resolver, Radix UI, Tailwind


