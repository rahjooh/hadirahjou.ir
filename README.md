# hadirahjou.ir

Modern personal site for Hadi Rahjou built with Next.js App Router. The site combines a
feature-rich profile/CV, a project portfolio synced with GitHub repositories, and a long-form
blog covering data engineering and analytics strategy.

## Features

- **Minimal Geeks-inspired aesthetic** with theme switching, softened glass surfaces, and responsive
  layout.
- **Profile & CV hub** highlighting experience, education, certifications, operating principles, and
  personal interests for quick scanning.
- **Projects showcase** with technology stacks, value-focused highlights, delivery timelines, and
  live GitHub metrics (stars, forks, watchers) pulled straight from the repositories.
- **Editorial blog** with metadata-aware article pages, static generation, and an interactive
  explorer for tag filtering and search across articles.
- **Global navigation and metadata** to ensure consistent branding, structured data, and shareable
  previews.

## Getting started

```bash
npm install
npm run dev
```

The site runs on [Next.js](https://nextjs.org/) and uses the App Router. Update the structured data in
`/data` to refresh the content across profile, projects, and blog pages. The design system lives in
`app/globals.css`, and shared UI primitives (headers, sections, tag lists, toggles) live in
`/components`.

### HTTPS support

Local development and self-hosted deployments can be secured with HTTPS by providing certificate
paths through environment variables. Set `HTTPS=true` alongside the key and certificate locations
before starting the server:

```bash
HTTPS=true \
SSL_KEY_PATH=./certs/localhost-key.pem \
SSL_CERT_PATH=./certs/localhost-cert.pem \
npm run dev
```

Optionally, include `SSL_CA_PATH` to supply a certificate authority bundle. Omitting `HTTPS=true`
continues to serve the site over HTTP.

## Commands

- `npm run dev` – Start the local development server.
- `npm run build` – Create a production build.
- `npm run start` – Launch the production server (HTTPS support available with the same environment
  variables).
- `npm run lint` – Run ESLint using `eslint-config-next` rules.

## Deployment

Deploy to any platform that supports Next.js (Vercel, Netlify, Fly.io). Environment configuration is
handled entirely via static data files, so no secrets are required to get started.

