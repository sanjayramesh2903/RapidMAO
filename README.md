# FAMATrivial

Fast, minimal, AMCtrivial-style FAMAT practice built with Next.js App Router.

## What this app does

- Immediately serves a problem on load.
- Single answer box + Enter to submit.
- Instant correct/incorrect feedback.
- Auto-advance after correct answers (0.7s).
- Streak tracking, best streak, solved totals.
- Infinite mode with non-repeating session pulls.
- Timed 10-minute challenge mode.
- 25-problem contest simulation mode with AMC-style score display.
- Round filtering: Algebra 1, Algebra 2, Statistics, Geometry, Calculus, Pre-Calculus.
- Lightweight review after misses (short solution + next button).
- Difficulty targeting based on rating.
- Per-topic performance snapshot.
- Dark mode toggle.

## Stack

- Next.js (App Router)
- Tailwind CSS
- KaTeX
- Next.js API Route (`/api/problems/next`)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

Deploy on Vercel:

```bash
npm run build
npm run start
```
