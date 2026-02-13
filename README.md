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
# FAMAT Randomizer

A production-ready static site for drawing random FAMAT-style sample problems by:

- Regional source (January Regional, February Regional, March Regional)
- Test level (Alg 1, Geometry, Stats, Alg 2, Calc, Precalc)
- Question number metadata

## Features

- AMCtrivial-style random problem selection from the current filter pool.
- Sleek black/blue visual style with vibrant gradients and glassmorphism cards.
- Built-in LaTeX rendering using MathJax.
- Instant filter controls and reset behavior.
# FAMAT Problem Hub

A production-ready static site for browsing FAMAT-style sample problems by:

- Subject division (Alg 1, Geometry, Stats, Alg 2, Calc, Precalc)
- Source test (January Regional, February Regional, March Regional)
- Question number

## Features

- Sleek black/blue visual style inspired by futuristic editorial web design.
- One curated sample problem per requested category.
- Built-in LaTeX rendering using MathJax.
- Instant filtering by subject and source.
- GitHub Pages deployment workflow included.

## Local preview

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deployment to GitHub Pages

1. Push to the `main` branch.
2. In GitHub repository settings, ensure **Pages** source is set to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy-pages.yml` deploys automatically.
