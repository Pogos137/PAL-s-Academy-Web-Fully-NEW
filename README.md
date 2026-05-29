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
  - **Course homepages** focused on **Assignments & tasks** — click the circle to mark a task
    complete; completed work sinks to the bottom and is labelled *Completed* (it never vanishes).
  - A real **month-grid Calendar** plotting recurring weekly sessions + every assignment due date,
    with a click-through day detail panel and "Join Meet" links.
  - A two-pane **Messages inbox** with one private conversation per course. An academy **admin is
    part of every conversation** (privacy/legal), and threads are deep-linkable from each course.
- **Admin console** at `/admin` (owner only):
  - **Enrollment manager** — create courses, assign tutors, and control which students are
    enrolled in each course. Students only ever see the courses you enrol them in.
  - **Messages** oversight across every class conversation, plus users, approvals, classes,
    leads, and applications.
  - **Simulate bot activity** to test-drive the platform with lifelike messages + completions.
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

The academy is seeded with a full **8-course catalog** and a roster of demo "bot" tutors and
students so the portal and admin console feel alive for a test-run. **Every seeded account uses
the password `PalsDemo2025!`** — sign out and log in as any of them to see their view:

| Role    | Example email                      | Password         |
|---------|------------------------------------|------------------|
| Student | `student.demo@palsacademy.local`   | `PalsDemo2025!`  |
| Student | `ava.bennett@palsacademy.bot`      | `PalsDemo2025!`  |
| Tutor   | `tutor.demo@palsacademy.local`     | `PalsDemo2025!`  |
| Tutor   | `priya.anand@palsacademy.bot`      | `PalsDemo2025!`  |

See **Admin → Users** for the full roster. They come with classes, assignments, completions, and
realistic message threads so nothing is empty. (The admin account is the one **you** sign up with
using `palseduacademy@gmail.com` — see above.)

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
  admin/                 admin console: overview, enrollment, classes, messages, users,
                         approvals, leads, applications
  api/
    auth/                signup, login, logout
    portal/classes/[id]/ messages + assignments (submit = mark complete, DELETE = undo)
    admin/approvals/     approve / reject pending accounts
    admin/classes/       create course; [id] = enrol/remove students, set tutor, edit, delete
    admin/simulate/      inject demo bot activity for a test-run
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
