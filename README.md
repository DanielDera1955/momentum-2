# Momentum — Adaptive Fitness Tracker

An accessible fitness tracker built for wheelchair users and people with limited
mobility. It replaces step-based tracking with adapted metrics — rolling distance,
active minutes, and sessions — and includes an adapted exercise library, progress
charts with readable text summaries, achievement badges, and full accessibility
controls (dark mode, high-contrast mode, and text scaling).

The app runs entirely in the browser. There is no backend, no login, and no API
keys. Data is saved locally in the browser (localStorage), so a user's logged
activity persists across visits on the same device.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview   # preview the built app locally
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: Add New → Project → import the repository.
3. Vercel auto-detects Vite. Leave the build settings as they are and click Deploy.

No environment variables are required. The included `vercel.json` makes page
refreshes work correctly.

## Deploy to Netlify

1. Push this folder to GitHub.
2. In Netlify: Add new site → Import an existing project → pick the repo.
3. Build command: `npm run build` — Publish directory: `dist`.

## Tech

React 19, TypeScript, Vite, Tailwind CSS, Recharts (charts), Motion (animation),
canvas-confetti, and lucide-react (icons).
