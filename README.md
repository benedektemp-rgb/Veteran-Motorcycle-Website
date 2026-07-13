# Iron & Chrome Motorcycle Museum

A Next.js website for a retro motorcycle museum: Home, Gallery, Events, About, and Contact pages, plus a
password-protected `/admin` dashboard for editing all of it. Available in English (`/`) and Hungarian
(`/hu`) via the language switcher in the header. Built to deploy on Vercel from GitHub.

The site works out of the box with placeholder content (no setup required to run it locally). To make
admin edits actually save, and to see your real content in production, connect Supabase and set the
admin credentials as described below.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without any environment variables set, every page renders with placeholder
motorcycle-museum content from `src/lib/seed-data.ts`.

## 1. Connect Supabase (so admin edits persist)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor -> New query**, paste in the contents of [`supabase/schema.sql`](supabase/schema.sql),
   and run it. This creates the `site_settings`, `gallery_items`, and `events` tables (pre-filled with the
   same placeholder content, in both English and Hungarian), a public `media` storage bucket for photo
   uploads, and read-only public access policies.
   - Already ran `schema.sql` before? Run [`supabase/migrations/002_add_hungarian_fields.sql`](supabase/migrations/002_add_hungarian_fields.sql)
     instead -- it adds the Hungarian columns to your existing tables and backfills translations onto the
     placeholder rows without touching anything you've already edited.
3. In **Project Settings -> API**, copy the **Project URL**, **anon public** key, and **service_role**
   key (keep the service role key secret -- never put it in client-side code).

## 2. Set up admin login

Generate a password hash for your chosen admin password:

```bash
node scripts/hash-password.mjs "your-chosen-password"
```

That prints two versions of the hash:

- The **raw hash** -- paste this as-is into Vercel's Environment Variables UI.
- An **escaped version** (`\$` instead of `$`) for `.env.local` -- Next.js treats `$` in `.env*`
  files as a variable reference (e.g. `$FOO`), so the literal `$` characters in a bcrypt hash must
  be escaped with a backslash or the value gets silently mangled. This only applies to `.env` files;
  Vercel's dashboard does not need escaping.

## 3. Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values from steps 1 and 2:

```bash
cp .env.local.example .env.local
```

| Variable | Where it's used |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (read-only access) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used by admin actions to write data |
| `ADMIN_USERNAME` | Username for `/admin/login` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash from `scripts/hash-password.mjs` |
| `SESSION_SECRET` | Random string used to sign the admin session cookie |

Restart `npm run dev` after editing `.env.local`.

## 4. Push to GitHub

```bash
git remote add origin https://github.com/benedektemp-rgb/YOUR_REPO_NAME.git
git push -u origin main
```

(Create an empty repository first at github.com/new under the `benedektemp-rgb` account.)

## 5. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. In the project's **Environment Variables** settings, add all six variables from the table above.
3. Deploy. Every future push to `main` redeploys automatically.

## Languages

English lives at `/`, `/gallery`, etc.; Hungarian is the same set of pages under `/hu`. The header's
EN/HU switcher links between the equivalent page in each language. Editable content (museum description,
gallery item descriptions, event titles/descriptions) has separate English/Hungarian fields in `/admin` --
if the Hungarian field is left blank, the site falls back to showing the English text instead of a blank.
Everything else (address, phone, email, motorcycle model names, event dates/locations) is shared across
both languages.

## Project structure

- `src/app/(en)/` -- English pages (Home, Gallery, Events, About, Contact); `src/app/hu/` -- their
  Hungarian mirrors. Both are thin wrappers around the shared implementations in `src/app/_pages/`.
- `src/app/admin/` -- the admin dashboard (English-only) and `actions.ts`, the server actions for
  login/logout and all content CRUD.
- `src/lib/i18n/` -- `dictionaries.ts` (translated UI strings) and `locale.ts` (the `localize()` helper
  that picks the English or Hungarian value of a bilingual field, with English as the fallback).
- `src/lib/data.ts` -- data-fetching layer; falls back to seed data when Supabase isn't configured.
- `src/lib/seed-data.ts` -- placeholder content (English + Hungarian) shown before Supabase is connected.
- `src/proxy.ts` -- protects `/admin/*` routes, redirecting to `/admin/login` if not signed in.
- `supabase/schema.sql` -- database schema, security policies, and seed data for a fresh Supabase project.
- `supabase/migrations/` -- incremental SQL changes to run against an already-provisioned database.
