## Client Flows

### Registration
1. User opens registration page
2. Fills form; Zod validates inputs
3. Server action `submitRegistration` checks event status and email uniqueness
4. On success, redirect to `/success?e=<base64 email>`

### Verification
1. Success page or separate flow passes encoded email
2. Server action `verifyRegistration` decodes and fetches latest record
3. Renders name, status, timestamp

### Event Status
- `getEventRegistrationStatus` reads `options(id=is_event_closed)`
- UI disables form when closed


