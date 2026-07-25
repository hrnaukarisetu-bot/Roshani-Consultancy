# Client Portfolio Setup

The public module works immediately with the privacy-safe seed in `src/data/clients.ts`. Persistent admin changes require Cloudflare D1 and R2 bindings because this project builds for the Cloudflare Nitro preset.

## Routes

- Public listing: `/clients`
- Public detail: `/clients/:slug`
- Admin: `/admin/clients`
- API: `/api/clients`, `/api/admin/*`, `/api/client-logos/*`

## Required bindings and secrets

Create and bind:

- D1 database binding: `CLIENTS_DB`
- R2 bucket binding: `CLIENT_LOGOS`
- Secret: `ADMIN_PASSWORD` (use a strong unique password)
- Secret: `ADMIN_SESSION_SECRET` (at least 32 random bytes)

Cloudflare binding example (merge into the generated/deployment worker configuration; do not replace existing Nitro settings):

```jsonc
{
  "d1_databases": [
    { "binding": "CLIENTS_DB", "database_name": "roshani-clients", "database_id": "YOUR_D1_DATABASE_ID" }
  ],
  "r2_buckets": [
    { "binding": "CLIENT_LOGOS", "bucket_name": "roshani-client-logos" }
  ]
}
```

Set the two secrets in the Cloudflare/Lovable deployment environment. Do not commit real values.

## Database

Apply migrations in order:

1. `migrations/0001_client_portfolio.sql` creates `clients`, `services`, `client_services`, `client_settings`, and `client_imports`, plus foreign keys, unique constraints, and indexes.
2. `migrations/0002_seed_clients.sql` imports the cleaned workbook portfolio: 36 unique clients and 17 services.

Example Wrangler commands after creating the D1 database:

```powershell
npx wrangler d1 execute roshani-clients --remote --file migrations/0001_client_portfolio.sql
npx wrangler d1 execute roshani-clients --remote --file migrations/0002_seed_clients.sql
```

## Workbook normalization report

Source: `Claint List_Website.xlsx`

- Spreadsheet rows excluding header: 51
- Serial-only/blank rows removed: 12
- Populated rows evaluated: 39
- Invalid rows skipped (missing company name): 1
- Duplicate company/city pairs merged: 2
- Unique clients imported: 36
- Normalized services: 17
- Failed rows: 0

Column mapping:

- `Sr.No` → ignored/import row reference
- `Claint Name` → `clients.client_name` (private by default)
- `Company Name` → `clients.company_name`
- `Nature of Business` → `clients.nature_of_business`
- `City` → `clients.city`
- `Service We Offer` → `services` and `client_services`

The admin importer also recognizes Client/Claint Name, Company/Company Name, Business Type/Nature of Business, Location/City, and Service/Services/Service We Offer. It supports `.xlsx`, `.xls`, and `.csv`, previews the first ten records, and reports imported, updated, duplicate, invalid, and failed rows.

## Admin usage

1. Open `/admin/clients` and sign in with `ADMIN_PASSWORD`.
2. Use **Import from Excel** to preview a workbook, choose skip/update/import-as-new duplicate handling, and run the import.
3. Use **Add New Client** or **Edit** to manage company data, private contact name, service tags, case-study fields, ordering, published state, and featured state.
4. Save a new client before uploading its logo. Edit it, select a PNG/JPG/WEBP/SVG up to 2 MB, then choose **Upload / Replace Logo**. Use **Remove Logo** to restore deterministic initials.
5. Enable **Featured Client** for homepage visibility and **Published** for public visibility.
6. Change **Display Order** to control default sorting.
7. Use the listing checkboxes for bulk publish, hide, feature, unfeature, or delete.
8. Keep “Show client/contact person name publicly” off unless explicit consent exists.

Uploaded logo objects are stored in R2 under `clients/{client_id}/{uuid}.{extension}` and served through `/api/client-logos/*`. SVG uploads are rejected when active/scripted content is detected.