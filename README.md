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
