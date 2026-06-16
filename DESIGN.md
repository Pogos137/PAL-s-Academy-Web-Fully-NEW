---
name: PAL's Academy
description: A luxury-academic visual system for premium 1:1 tutoring — marketing site and student portal.
colors:
  emerald: "#114E40"
  emerald-deep: "#0C3D32"
  emerald-darkest: "#082A23"
  emerald-700: "#114E40"
  emerald-600: "#155843"
  emerald-500: "#226F55"
  emerald-100: "#DCEDE5"
  emerald-50: "#F0F7F4"
  gold: "#C99A2A"
  gold-300: "#D2A648"
  gold-200: "#E2C16D"
  gold-100: "#EFDDA0"
  gold-600: "#8A6A1B"
  ivory: "#FAF8F4"
  ivory-50: "#FFFDF8"
  ivory-200: "#F2EBDB"
  ivory-300: "#E5DBC0"
  accent-rose: "#B45369"
  accent-sage: "#647E68"
typography:
  display:
    fontFamily: "Cormorant Garamond, Playfair Display, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "3rem"
  xl: "5rem"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.emerald-deep}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  button-ink:
    backgroundColor: "{colors.emerald-deep}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.emerald-600}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  card-luxe:
    backgroundColor: "{colors.ivory-50}"
    textColor: "{colors.emerald-deep}"
    rounded: "{rounded.xl}"
    padding: "2rem"
  card-dark:
    backgroundColor: "{colors.emerald-700}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.xl}"
    padding: "2rem"
  input-luxe:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.emerald-deep}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
---

# Design System: PAL's Academy

## 1. Overview

**Creative North Star: "The Heritage Standard"**

PAL's Academy looks like an institution that has earned its reputation — not a startup performing prestige, but an academy that simply holds a standard. The system speaks in the visual language of established excellence: deep evergreen emerald, the burnished gold of academic honor, and warm ivory paper. It is the feel of a private tutoring atelier crossed with the quiet authority of a university library and the intimacy of an invitation-only cohort. Every surface should signal three things at once: **prestige** (we belong to a tradition), **professionalism** (we are exacting and reliable), and **premium quality** (this is an investment, treated as one).

This is a dual-register system. The marketing surface (home, pricing, subjects, booking) is where the design *is* the product — it must sell trust through restraint and craft. The portal and admin surfaces (dashboard, calendar, messages, enrollment) are where the design *serves* the work — a Google-Classroom-grade tool that still wears the academy's colors, so a parent who admired the landing page recognizes the same hand when their student logs in. The through-line is identity: same ramp, same type, same rhythm, login to coursework.

What this system explicitly rejects: corporate SaaS flatness (generic blue, rounded-everything, identical card grids), EdTech-startup brightness (gamified, playful, anxiety-inducing), cold academic utilitarianism (text-heavy, dated), and the dark patterns of fake urgency (countdowns, "spots filling fast" as manipulation rather than fact). Warmth is carried by gold, by serif type, and by generous space — never by manufactured pressure.

**Key Characteristics:**
- Drenched emerald heroes; ivory-paper body; gold reserved for accent and honor
- Serif display (Cormorant Garamond) for authority, humanist sans (Inter) for clarity
- Flat at rest, ambient depth on interaction — the `luxe` shadow as a soft emerald glow
- Generous negative space and varied vertical rhythm; never cramped, never templated
- One identity across marketing, portal, and admin

## 2. Colors

A heritage palette: deep institutional emerald as the foundation, burnished gold as the rare honor, warm ivory as the page. Three roles, used with discipline.

### Primary
- **Heritage Emerald** (#114E40, with deep #0C3D32 and darkest #082A23): The brand's spine. Carries hero sections (drenched, as the `hero` gradient from darkest → deep → emerald), dark cards, primary text on ivory, and the academy's authority. On light surfaces it is the ink; on dark surfaces it is the ground. The full ramp (50 → 900) handles tints, hovers, and muted body copy on emerald grounds (use emerald-100 / emerald-200, never gray, for text on dark emerald).

### Secondary
- **Laurel Gold** (#C99A2A, ramp 100 #EFDDA0 → 600 #8A6A1B): The mark of honor — academic laurel, achievement, the rare flourish. Used on the primary CTA (the gold gradient), the laurel-ring hero motif, dividers, eyebrow ticks, and focus rings. It is never structural and never the body. Its scarcity is what makes it read as premium.

### Tertiary
- **Accent Rose** (#B45369) and **Accent Sage** (#647E68): Deliberately rare. Reserved for portal/admin functional signals (status, category, subtle differentiation) where emerald and gold alone can't disambiguate. Never decorative on the marketing surface.

### Neutral
- **Warm Ivory** (#FAF8F4, with 50 #FFFDF8, 200 #F2EBDB, 300 #E5DBC0): The body background and light-surface paper. Carries the warmth so the emerald can stay deep and the gold can stay rare.
- **True White** (#FFFFFF): Input fields and the highest-contrast surfaces only, to separate them from the ivory page.

### Named Rules
**The Laurel Rule.** Gold is honor, not decoration. It appears on ≤10% of any surface — the primary CTA, a divider, a focus ring, the founding-cohort badge. If gold is carrying a block of text or a whole panel, it has been demoted from honor to wallpaper. Pull it back.

**The Warmth-In-Gold Rule.** Warmth lives in the gold accent, the serif type, and the ivory paper — never in a washed-out gray. Text on emerald uses the emerald ramp (emerald-100/200) or ivory at opacity; gray text on the emerald ground is forbidden.

## 3. Typography

**Display Font:** Cormorant Garamond (fallback Playfair Display, Georgia, serif)
**Body Font:** Inter (fallback ui-sans-serif, system-ui, sans-serif)

**Character:** A classic contrast pairing — a high-contrast garalde serif for authority and tradition against a neutral humanist sans for clarity and modern legibility. The serif does the prestige; the sans does the work. They never compete because they sit on opposite sides of the serif/sans axis.

### Hierarchy
- **Display** (500, clamp 2.75–5.5rem, line-height 1.04, tracking -0.015em): Hero and section headlines. Serif. Often paired with an italic gold-accented phrase for emphasis. `text-wrap: balance` always.
- **Headline** (500, clamp 1.75–2.5rem, line-height 1.1): Section titles, card headers. Serif.
- **Title** (500, 1.25rem, line-height 1.2): Sub-section and portal/course titles. Serif.
- **Body** (400, 1rem, line-height 1.65): All prose. Inter. Capped at 65–75ch (`max-w-2xl` / `max-w-xl`). `text-wrap: pretty` on long passages.
- **Label** (500, 0.6875rem/11px, tracking 0.18em, uppercase): The `eyebrow` — used as a *named brand device* (e.g. "A Private Tutoring Academy"), not a reflexive kicker over every section. Inter.

### Named Rules
**The Serif-Authority Rule.** Headings are serif, always. The sans never carries a heading. This is the single strongest signal of the academy's voice — breaking it makes the page read as generic SaaS instantly.

**The One-Eyebrow Rule.** The gold uppercase eyebrow is a deliberate brand mark, not section scaffolding. Use it sparingly (hero, a key section) — never as an automatic kicker above every heading.

## 4. Elevation

A flat-by-default system with ambient, emerald-tinted depth that appears on interaction. Surfaces rest flat on the ivory page, defined by hairline borders (emerald-100 on light, ivory/10 on dark). Depth is a *response* — to hover, to importance — never a default decoration. The signature `luxe` shadow is a deep, soft, colored glow (not a hard gray drop shadow), which is what keeps the system from looking like a 2014 app.

### Shadow Vocabulary
- **Luxe** (`box-shadow: 0 30px 80px -20px rgba(8, 42, 35, 0.35)`): The hero shadow. A large, diffuse emerald-toned glow under cards on hover and under the primary CTA. Ambient, premium, never harsh.
- **Ring** (`box-shadow: inset 0 0 0 1px rgba(201, 154, 42, 0.35)`): An inset gold hairline for selected/featured surfaces — a frame, not a shadow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest, drawn by hairline borders. The `luxe` glow appears only on hover, focus, or genuine elevation (modal, featured card). If a card has a heavy shadow sitting still, the shadow is doing the border's job — replace it with a 1px border.

**The Colored-Glow Rule.** Shadows are emerald-tinted, large, and soft (blur ≥ 60px, low opacity). A small, dark, gray drop shadow is forbidden — it reads as cheap and dated.

## 5. Components

The component feel blends three registers deliberately: **refined** in its restraint and spacing, **tactile** in how it lifts and glows on interaction, and **editorial** in its type-led hierarchy. Quiet until touched, then responsive.

### Buttons
- **Shape:** Fully pill-rounded (`rounded-full`), padding 0.75rem 1.5rem, Inter 500, transition 300ms.
- **Primary (gold):** The gold gradient (#EFDDA0 → #C99A2A → #8A6A1B), emerald-deep text, `luxe` shadow. On hover: lifts (`-translate-y-0.5`) and shadow deepens. This is the conversion button — one per view.
- **Ink:** Solid emerald-deep ground, ivory text; hover lightens to emerald-700. The serious secondary action.
- **Ghost:** Transparent, emerald-200 hairline border, emerald-700 text; hover shifts border to gold-300. The tertiary, low-commitment action. A dark variant (`btn-ghost-dark`) uses ivory/20 border on emerald grounds.

### Cards / Containers
- **Corner Style:** Generous (`rounded-2xl` / 1.5rem).
- **Background:** `card-luxe` on ivory-50 with emerald-100 hairline; `card-dark` on emerald-700/50 with `backdrop-blur` and ivory/10 hairline.
- **Shadow Strategy:** Flat at rest; on hover the border shifts to gold-300 and the `luxe` glow appears (see Elevation). 500ms transition.
- **Internal Padding:** 2rem (`p-8`).
- **Rule:** Never nest cards. Never ship an identical icon-heading-text card grid — vary size, weight, and content density.

### Inputs / Fields
- **Style:** True-white ground (to separate from ivory page), emerald-200 hairline, `rounded-xl` (1rem), Inter, emerald-deep text. Placeholder at emerald-300 — must still clear 4.5:1.
- **Focus:** Border shifts to gold-400 with a soft gold ring (`ring-2 ring-gold-200`). A dark variant sits on emerald-700/40 grounds.
- **Error:** Communicate with text + an accent-rose border, never color alone.

### Navigation
- Serif or Inter-medium links, emerald-700 default, gold-300 on hover. Underline offset 4px when underlined. Mobile collapses to a sheet; active state carries a gold mark, not just a color shift.

### Signature Devices
- **The Laurel Rings:** Concentric gold-hairline circles (border gold-400/30) drifting off the hero edge — the academy's quiet emblem of honor. Decorative, low-opacity, pointer-events-none.
- **The Gold Rule:** A centered hairline divider fading transparent → gold-400 → transparent (`gold-rule` / `lux-divider`) — punctuation between sections, used sparingly.

## 6. Do's and Don'ts

### Do:
- **Do** keep headings serif (Cormorant Garamond) — authority is non-negotiable.
- **Do** reserve Laurel Gold for honor: the primary CTA, focus rings, dividers, the founding-cohort badge. ≤10% of any surface.
- **Do** carry warmth through gold, serif type, and ivory paper — not through gray text.
- **Do** keep surfaces flat at rest with hairline borders; let the soft emerald `luxe` glow appear only on interaction.
- **Do** use emerald-100/200 (or ivory at opacity) for text on emerald grounds, so it clears 4.5:1.
- **Do** carry one identity across marketing, portal, and admin — a parent should recognize the academy when their student logs in.
- **Do** respect `prefers-reduced-motion` on every animation (the hero already does — match it everywhere).
- **Do** vary spacing and card density for rhythm.

### Don't:
- **Don't** look like corporate SaaS — no generic blue, no rounded-everything, no identical card grids.
- **Don't** look like an EdTech startup — no bright, gamified, anxiety-inducing playfulness.
- **Don't** look cold or utilitarian — no text-heavy, dated academic layouts.
- **Don't** use fake urgency as manipulation — countdowns and "spots filling fast" only when literally true (founding-cohort capacity is real; state it plainly).
- **Don't** let gold carry body text or full panels — that demotes honor to wallpaper.
- **Don't** use small, dark, gray drop shadows — shadows are large, soft, and emerald-tinted.
- **Don't** put a tracked uppercase eyebrow over every section — it's a named brand device, used sparingly.
- **Don't** put gray text on the emerald ground — use the emerald ramp or ivory at opacity.
- **Don't** signal errors or status with color alone — always pair with text or icon.
- **Don't** nest cards, ever.
