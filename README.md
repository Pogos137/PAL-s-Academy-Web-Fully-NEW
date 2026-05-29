# PAL's Academy

A modern, luxury-academic website + student portal for PAL's Academy private tutoring.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. It ships
with a **self-contained backend** (file-based store + cookie sessions) so the whole thing —
account requests, admin approvals, the Google-Classroom-style portal, leads, and tutor
applications — works out of the box with **no external services required**.

---

## ✨ What's inside

- **Marketing site** — Home, How it works, Subjects, Pricing, Testimonials, Booking, Careers,
  About, Contact. Emerald + gold brand theme, fully responsive, animated.
- **Locked student portal** (Google Classroom-style):
  - Per-class pages with **upcoming sessions**, a **"Join Google Meet"** quick link,
    **assignments with due dates**, and a **private per-class message thread**.
  - Calendar view (recurring sessions + every due date) and a Messages inbox.
- **Admin console** at `/admin` — see **all users, approvals, classes, leads, and applications**.
- **Auth with admin approval** — anyone can request access; new accounts stay *pending* until
  an admin approves them. **The owner email is auto-promoted to admin** (see below).
- **Lead capture + tutor applications** with confirmation emails (no-op in dev until you add a key).

---

## 🔑 The admin account

The email in `ADMIN_EMAIL` (default **palseduacademy@gmail.com**) is special: the first time
you **sign up** with it at `/auth/signup`, the account is created as an **approved admin**
automatically. Use that account to sign in at `/auth/login` and manage the platform at `/admin`.

> Any other email that signs up becomes a **pending student** until you approve it from
> **Admin → Approvals**.

### Demo accounts (seeded automatically for previewing the portal)

| Role    | Email                              | Password          |
|---------|------------------------------------|-------------------|
| Student | `student.demo@palsacademy.local`   | `StudentDemo2025!`|
| Tutor   | `tutor.demo@palsacademy.local`     | `TutorDemo2025!`  |

These come with two sample classes, assignments, and messages so the portal isn't empty.

---

## 🏃 Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

That's it — no `.env` required for local use. (A `.env.local` with safe placeholders is included.)

---

## 🚀 Put it on GitHub + get an always-on link (Vercel)

This is the recommended way to get a shareable link that "always runs."

### 1. Push to GitHub

```bash
# from inside this folder (pals-academy-next)
git init
git add -A
git commit -m "PAL's Academy site + portal"
git branch -M main

# create an empty repo on github.com first, then:
git remote add origin https://github.com/<your-username>/pals-academy.git
git push -u origin main
```

(Or use the GitHub CLI: `gh repo create pals-academy --public --source=. --push`.)

### 2. Deploy on Vercel (free)

1. Go to **vercel.com → Add New → Project**.
2. **Import** your `pals-academy` GitHub repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. You'll get a permanent URL like `https://pals-academy.vercel.app`. Every `git push`
   redeploys it automatically.

### 3. Set environment variables on Vercel (recommended)

In the Vercel project → **Settings → Environment Variables**, add:

| Key                   | Value                                            |
|-----------------------|--------------------------------------------------|
| `ADMIN_EMAIL`         | `palseduacademy@gmail.com`                       |
| `AUTH_SESSION_SECRET` | a long random string (e.g. `openssl rand -hex 32`)|
| `NEXT_PUBLIC_SITE_URL`| your Vercel URL                                  |
| `NEXT_PUBLIC_CALENDLY_URL` | your real Calendly link (optional)          |
| `RESEND_API_KEY`      | a Resend key for real emails (optional)          |

> **Note on data persistence:** the built-in store writes to the filesystem. On Vercel this is
> ephemeral (resets on cold starts), which is fine for a demo. For permanent multi-user data,
> swap the store in `lib/store/db.ts` for a hosted database (e.g. Supabase, Postgres, Turso) —
> the rest of the app talks to it through the small `readDb`/`mutate` helpers, so only that one
> file changes.

---

## 🗂 Project structure

```
app/
  (marketing)            home, pricing, subjects, about, booking, careers, contact…
  auth/                  login + signup (request access)
  portal/                student portal: dashboard, calendar, messages, classes/[id]
  admin/                 admin console: overview, users, approvals, classes, leads, applications
  api/
    auth/                signup, login, logout
    portal/classes/[id]/ messages + assignments (+ submit)
    admin/approvals/     approve / reject pending accounts
    leads, applications  public form intake
lib/
  auth/                  password hashing, cookie sessions (Node + Edge variants)
  store/                 file-based DB, seed data, queries, admin queries
  email/                 Resend wrapper (dev no-op) + templates
components/               layout, sections, portal, admin, ui
public/                   logos, robots.txt, sitemap.xml
```

## 🎨 Brand

- **Emerald** `#114E40` (from the logo) · **Gold** `#C99A2A` accent · ivory paper.
- Type: Cormorant Garamond (serif display) + Inter (sans).
- Logo assets in `public/logo-*.svg`.

## ✉️ Contact

`palseduacademy@gmail.com`
