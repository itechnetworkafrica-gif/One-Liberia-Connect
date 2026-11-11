# One Liberia Connect

Community-first public website for One Liberia Connect, a division of One Liberia Enterprise Corporation.

## Run locally

From the workspace root, install dependencies and start the website:

```sh
pnpm install
pnpm --filter @workspace/one-liberia-connect run dev
```

The website uses Next.js App Router. `pnpm --filter @workspace/one-liberia-connect run build`, `lint`, and `typecheck` are available.

## Inquiry form integration

The community request, partnership, and contact forms POST validated JSON to `/forms/inquiries`, which Next rewrites to the `app/api/inquiries` route. The public form path avoids a `/api` prefix reserved by the workspace's shared API service. The handler checks required fields, uses a honeypot, and applies a basic rate limit.

Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` to deliver inquiries through Resend. If those values are missing, the preview returns a clearly labeled preview success without storing or sending the request. Do not rely on that fallback for live submissions.

## Editing copy and navigation

- Page copy, shared service/step data, and editable contact placeholders: `content/site.ts`
- FAQ content: `content/faq.ts`
- Header navigation and keyboard/mobile dropdown labels: `content/nav.ts`
- Page-specific metadata is defined with each route in `app/`.

Contact details are intentionally marked as placeholders until the organization supplies them.

## Email environment variables

Copy `.env.example` as a reference. Keep the Resend API key in your environment's secret manager; do not commit it. Add the three email variables in Replit Secrets for preview or in the Vercel project's environment settings for production. Set `NEXT_PUBLIC_SITE_URL` if the canonical domain differs from `https://1liberia.org`.

## Image slots

All photography and logo are local files in `public/images`. Replace a file at the same path to update imagery without external image services.

| Slot | File | Recommended source dimensions |
| --- | --- | --- |
| Header/footer logo | `logo.png` | 1000 × 280, transparent or white background |
| Community mission | `mission.jpg` | 1200 × 1450 |
| About / connectivity infrastructure | `about-technician.jpg` | 1400 × 900 |
| Vision / learning | `vision.jpg` | 1200 × 1000 |
| Community approach meeting | `approach-meeting.jpg` | 1400 × 1000 |
| Partner connectivity context | `partners-tower.jpg` | 1400 × 1000 |
| School technology hub | `tech-hub.jpg` | 1400 × 1000 |
| Cause / Monrovia | `cause-monrovia.jpg` | 1600 × 900 |
| Community request hero | `connect-hero.jpg` | 1200 × 1000 |

Images use `next/image`, descriptive alternate text, and intrinsic/fill sizing to avoid layout shift. Hero images are prioritized; other images are loaded lazily by Next.js.

## Deployment

Deploy as a standard Next.js App Router application (including on Vercel). In a Vercel monorepo project, set the root directory to `artifacts/one-liberia-connect`; Next.js will be detected and the `build` script will run. Add the email variables above and set `NEXT_PUBLIC_SITE_URL` to the canonical public origin if it differs from `https://1liberia.org`; this value is used for metadata, sitemap, and robots.

The privacy and terms pages are clearly marked drafts and must be reviewed by qualified counsel before production publication.
