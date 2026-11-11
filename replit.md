# One Liberia Connect Website

Multi-page marketing site for One Liberia Connect, a division of One Liberia Enterprise Corporation, with community, school, diaspora, investor, and contact inquiry forms.

## Run & Operate

- `pnpm --filter @workspace/one-liberia-connect run dev` — run the website
- `pnpm --filter @workspace/one-liberia-connect run build` — create the production build
- `pnpm --filter @workspace/one-liberia-connect run typecheck` — check TypeScript
- `pnpm --filter @workspace/one-liberia-connect run lint` — run ESLint
- Optional email delivery: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- Optional canonical URL: `NEXT_PUBLIC_SITE_URL` (defaults to `https://1liberia.org`)

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- Framer Motion, lucide-react, react-hook-form, and Zod
- Resend REST API for optional email delivery; no Replit-only application dependency

## Where things live

- `artifacts/one-liberia-connect/app/` — routes, page metadata, form endpoint, and global layout
- `artifacts/one-liberia-connect/components/` — shared UI and site navigation
- `artifacts/one-liberia-connect/content/` — typed navigation and site copy
- `artifacts/one-liberia-connect/public/images/` — supplied logo and photography

## Architecture decisions

- The public pages use Next.js App Router for server-rendered content and page-specific metadata.
- Inquiry forms share one Zod-validated route handler, with a honeypot and basic in-memory rate limiting.
- If Resend settings are absent, the form returns a preview success response and logs only that email delivery is unconfigured; it does not persist or deliver the inquiry.
- Email delivery uses the Resend HTTP API directly so the same settings work on Replit and Vercel.

## Product

- Visitors can learn about the early-stage connectivity initiative, nominate a community, propose school or delivery partnerships, or send a general inquiry.
- Use forward-looking language for planned services and hubs. The only approved figures are the 250,000-person ambition and the December 2026 feasibility-review commitment.

## User preferences

- Keep site copy in typed content files and avoid claims not supported by the project brief.
- The legal pages are draft language and must be reviewed before publication.

## Gotchas

- Configure all three Resend variables before relying on live form delivery. Preview fallback requests are not saved.
- The user supplied the official logo and Liberia photos; prefer them over generic stock imagery.
- Forms use `/forms/inquiries` as a proxy-safe public path and rewrite to the Next.js route handler under `/api`, because the workspace API service owns the `/api` prefix.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
