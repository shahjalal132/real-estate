# TENANTS HQ

USA-focused commercial and residential real estate platform: listings, market intelligence, contact directories, underwriting workflows, and productivity tools. The public site is a [Laravel](https://laravel.com/) + [Inertia.js](https://inertiajs.com/) + [React](https://react.dev/) SPA with a separate admin area under `/admin`.

## Tech stack

| Layer | Technology |
|--------|------------|
| Backend | PHP **8.2+**, Laravel **12** |
| Frontend | React **18**, TypeScript, Vite **7**, Tailwind CSS **4** |
| App shell | Inertia.js **2**, Laravel Breeze (auth), Ziggy (named routes in JS) |
| Data | MySQL (default), session/cache/queue on database in `.env.example` |
| Maps / charts | Leaflet, react-leaflet, Recharts |
| Other | PHPSpreadsheet (imports/exports), Sanctum |

Front-end pages live under `resources/js/web/Pages/` (main app) and `resources/js/admin/Pages/` (admin). `resources/js/app.tsx` resolves Inertia pages from `web` or `admin` based on the URL path.

## Prerequisites

- PHP **8.2+** with common extensions (mbstring, openssl, pdo, etc.)
- [Composer](https://getcomposer.org/)
- Node.js **18+** and npm
- MySQL (or adjust `DB_*` in `.env` for another driver)

## Quick start

From the project root:

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Add a MySQL database and credentials in `.env`, then:

```bash
php artisan migrate
npm install
npm run build
php artisan serve
```

One-shot setup (install, env, key, migrate, npm install, production build) is also available:

```bash
composer run setup
```

### Development

Runs the PHP server, queue worker, log viewer (Pail), and Vite together:

```bash
composer run dev
```

Then open the URL shown by `php artisan serve` (typically `http://127.0.0.1:8000`).

### Tests

```bash
composer run test
```

## Environment

Copy `.env.example` to `.env` and configure at least:

- `APP_URL`, `APP_NAME` (default app name in `.env.example` is **TENANTS HQ**)
- `DB_*` for your database
- `SITE_LOCK_PASSWORD` — **required** for visitors to pass the global site gate (see below)

Optional: mail, queue, cache, and Redis settings follow standard Laravel conventions.

## Site lock (staging / private demos)

`GlobalPasswordProtection` redirects all requests to `/site-lock` until the session flag `site_unlocked` is set. Unlocking compares the submitted password to `SITE_LOCK_PASSWORD` in `.env` (`SiteLockController`). Routes under `/site-lock` are excluded from the redirect.

## Main features (by URL area)

### Listings and search

- **Home** (`/`) — Featured auctions, residential, and commercial sections with filter-aware queries.
- **Properties** (`/properties`) — Browse with filters for sale/lease, category (commercial/residential), listing type, status, and more.
- **Segments** — `/properties/auctions`, `/properties/residential`, `/properties/commercial`, `/properties/rental`.
- **Detail** — `/properties/{property}/{url_slug}` — Single listing with location, images, brokers, and details.

Authenticated users get **saved searches** via `/api/saved-searches` (CRUD + apply).

### Contacts and directories

- **Tenants** — Company and location indexes and detail tabs (summary, locations, transactions, lease expirations, contacts, relationships, news).
- **Owners** — Companies, funds, and owner detail tabs (summary, properties, transactions, listings, funds, tenants, contacts, relationships, news).
- **Brokers** — Directory contacts with search, filters, sorting, and broker detail pages.
- **Locations & companies** — `/contacts/locations`, `/contacts/companies`, plus aggregated views like `/contacts/all`.

### Comparables (“comps”)

Routes under `/comps/*` (commercial sales/lease, residential sales/lease, and “all”). Implementation mixes live placeholders and market-style UIs; see `MiscController` for page titles and descriptions.

### Scout (market intelligence)

Routes under `/scout/*` — index, owner criteria, tenant criteria, location rankings, scout map, and scout intelligence. Presented as a structured Scout product area (some screens are marked coming soon in copy).

### Zoning

- `/zoning-changes/property-map`
- `/zoning-changes/rezoning-map`

### Underwriting / pipeline

Routes under `/underwriting/*` — saved, completed, submitted, sheets, new manual, and new AI flows for deal analysis workflows.

### Tools

- **Public / semi-public** — Mortgage calculator, cost segregation calculator, zoning codes reference, ChatGPT assistant page, quick links.
- **Authenticated** — **Todo** (tasks, projects, teams) and **Calendar** (events) under `/tools/todo` and `/tools/calendar`.

### Settings and account

- `/settings/buy-box`, `/settings/notifications`, `/settings/account`, `/settings/subscription`
- **Profile** — `/profile` (edit/update/delete account) when logged in.

### Content

- **Insights** (`/insights`)
- **News** (`/news`, `/news/{slug}`)
- **Footer / CMS-style pages** — `/quick-links/{slug}`, `/learn-more/{slug}`, `/policies/{slug}`

### Admin

- **`/admin/dashboard`** — Inertia admin dashboard (`routes/admin.php`), middleware: `auth`, `verified`.
- **`/dashboard`** — Breeze default dashboard (`routes/admin.php`).

### Authentication

Laravel Breeze routes in `routes/auth.php`: register, login, logout, password reset, email verification, password confirmation.

### Utilities

- **`GET /optimize`** — Runs `optimize:clear` (requires `auth`). Intended for operators, not public use.

## Backend data model (overview)

Core domain models include `Property`, `PropertyLocation`, `PropertyDetail`, `PropertyImage`, `Broker`, `Brokerage`, tenant and owner company/location models, directory contacts/locations/broker companies, `SavedSearch`, todo (`TodoTask`, `TodoProject`, `TodoTeam`), and `CalendarEvent`. Import services under `app/Services/` support bulk loading of properties and directory data.

## Project layout (short)

| Path | Role |
|------|------|
| `routes/web.php` | Main web and API routes |
| `routes/auth.php` | Breeze authentication |
| `routes/admin.php` | `/admin` and `/dashboard` |
| `app/Http/Controllers/` | Controllers |
| `app/Models/` | Eloquent models |
| `database/migrations/` | Schema |
| `resources/js/web/` | Main React app (pages, layouts, components) |
| `resources/js/admin/` | Admin React bundle |

## License

This project inherits the **MIT** license from the Laravel application skeleton (see `composer.json`).
