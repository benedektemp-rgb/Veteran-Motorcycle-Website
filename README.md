# Iron & Chrome Motorcycle Museum

A Next.js website for a retro motorcycle museum: Home, Gallery, Events, About, and Contact pages, plus a
password-protected `/admin` dashboard for editing all of it. Hungarian is the default language at `/`;
English lives under `/en` for tourists, reachable via the language switcher in the header. Built to
deploy on Vercel from GitHub.

Content (museum info, gallery, events) lives as JSON files in this repo under `content/`, and uploaded
photos live in `public/uploads/` -- there is no external database. Saving a change in `/admin` commits
the update directly to this GitHub repo, which triggers Vercel's normal auto-deploy. That means every
edit has full history in `git log`, and nothing can silently disappear the way a paused/reset database
can. The trade-off: a save takes a minute or two to actually go live (it's a real deploy), not instant.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Content comes straight from the `content/*.json` files, so the site works
immediately with no setup. Locally, admin edits write straight to disk (no `GITHUB_TOKEN` needed) --
saving in `/admin` updates the JSON files and image files directly, and you'll see the change on refresh.

## 1. Set up admin login

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

## 2. Get a GitHub token (production only -- skip for local dev)

This is what lets `/admin` commit content changes back to this repo once deployed:

1. Go to [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens) -> **Generate new token** (fine-grained).
2. Set **Repository access** to "Only select repositories" -> this repo (`Veteran-Motorcycle-Website`).
3. Under **Permissions -> Repository permissions**, set **Contents** to **Read and write**. Leave everything else as-is.
4. Generate the token and copy it (starts with `github_pat_`) -- you won't be able to see it again.

## 3. Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values from steps 1 and 2:

```bash
cp .env.local.example .env.local
```

| Variable | Where it's used |
| --- | --- |
| `GITHUB_TOKEN` | Fine-grained PAT that lets admin saves commit to this repo (production only; leave unset locally) |
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
2. In the project's **Environment Variables** settings, add `GITHUB_TOKEN`, `ADMIN_USERNAME`,
   `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET`.
3. Deploy. Every future push to `main` -- including ones made automatically by saving in `/admin` --
   redeploys automatically.

## Languages

Hungarian is the default and lives unprefixed at `/`, `/gallery`, etc.; English is the same set of pages
under `/en`. The header's HU/EN switcher links between the equivalent page in each language. Editable
content (museum description, gallery item descriptions, event titles/descriptions) has separate
English/Hungarian fields in `/admin` -- if the Hungarian field is left blank, the site falls back to
showing the English text instead of a blank. Everything else (address, phone, email, motorcycle model
names, event dates/locations) is shared across both languages.

## Museum tours (QR codes)

Every motorcycle has its own page at `/gallery/{id}` (Hungarian) / `/en/gallery/{id}` (English) --
gallery cards link there, and each gallery item's row in `/admin` has a **QR kód** button that
generates a scannable QR code pointing at that bike's Hungarian page, with a PNG download link for
printing and posting next to the physical motorcycle in the museum. Generated entirely in the browser
(the `qrcode` package), no external service involved.

## Project structure

- `src/app/(hu)/` -- Hungarian pages (Home, Gallery, Events, About, Contact, and `gallery/[id]` for a
  single motorcycle), served unprefixed at `/`; `src/app/en/` -- their English mirrors, served under
  `/en`. Both are thin wrappers around the shared implementations in `src/app/_pages/`.
- `src/app/admin/` -- the admin dashboard (Hungarian-only, it's an internal tool) and `actions.ts`, the
  server actions for login/logout and all content CRUD.
- `src/lib/i18n/` -- `dictionaries.ts` (translated UI strings) and `locale.ts` (the `localize()` helper
  that picks the English or Hungarian value of a bilingual field, with English as the fallback).
- `src/lib/data.ts` -- reads content from `content/*.json` (bundled at build time).
- `src/lib/content-writer.ts` -- writes content: straight to disk locally, or via `src/lib/github-content.ts`
  (GitHub's Contents API) on Vercel.
- `content/` -- the actual site content: `site-settings.json`, `gallery.json`, `events.json`. Edit these
  directly (and commit) if you ever want to change content without going through `/admin`.
- `public/uploads/` -- photos uploaded via `/admin`.
- `src/proxy.ts` -- protects `/admin/*` routes, redirecting to `/admin/login` if not signed in.
