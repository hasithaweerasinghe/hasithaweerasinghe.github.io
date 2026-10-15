# hasithaweerasinghe.github.io

My portfolio, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Edit content

All the text (bio, skills, projects, open source contributions, social links) lives in
[`src/data/profile.ts`](src/data/profile.ts). The components in `src/components/` only handle layout.

## Deploy

Every push to `master` builds and deploys the site via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
