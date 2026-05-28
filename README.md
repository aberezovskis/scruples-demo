# Scruples — AI Command Center (Demo)

A login-able, wow-factor demo of the **3 systems** Scruples Spa asked for, on one screen:
1. **AI Voice Receptionist** — answers calls, books into Phorest, transfers to the front desk
2. **Social Scheduler** — one video → captioned posts across Instagram, Facebook, TikTok, YouTube
3. **Comment Reply AI** — replies to every comment from the shared Knowledge Base; routes anything sensitive to a human

…all powered by one **shared Knowledge Base** (the brain) — exactly the architecture in the implementation guide.

## How to open
Double-click **`index.html`** (opens in any browser, no install, works offline).

**Login:** email `owner@scruplesspa.com` · password `demo` — or just click **"Enter the live demo →"**.

## What to show the client (the wow path)
1. Land on the **Overview** — animated KPIs, booked-value chart, "what your AI did today" feed.
2. Hit **"Simulate an incoming call"** (top-right or Voice Receptionist tab) — watch the AI answer, book a Thursday manicure into Phorest, and log it. This is the moment.
3. **Social Scheduler** — the approval queue (nothing posts without a yes; TikTok runs draft-and-approve, as promised honestly).
4. **Comment Replies** — auto-replies vs the complaint/health questions correctly routed to the team.
5. **Knowledge Base** — "edit once, both agents update." Try the ask box.
6. **Integrations** — the Connect buttons for the tools you'll wire (VAPI, Phorest, Publer, Meta, YouTube).
7. Toggle **dark mode** (sun icon) for extra polish.

## What's real vs. demo
- The UI, flows, charts, and interactions are **real and working**.
- All numbers, calls, posts, and comments are **illustrative demo data** (`data.js`) — no live feeds yet.
- **You connect** the live services: VAPI (voice), Phorest (booking), Publer (social), Meta/YouTube (comments). The Integrations tab is where those plug in. Edit `data.js` to reskin numbers/services per client in minutes.

## Deploy (optional, to share a link)
It's a static site. From this folder: `vercel --prod` (or drag the folder into Vercel/Netlify). Set a password on the project if you want it private.

## Files
`index.html` (shell) · `styles.css` (design system) · `app.js` (logic, charts, live-call) · `data.js` (all demo content) · `shot-*.png` (preview screenshots) · `_shot*.mjs` (dev-only screenshot scripts, ignore).

*Built by ApexRun AI on the 3-system Scruples architecture.*
