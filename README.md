# Meghna Bose — portfolio

Next.js (App Router) + TypeScript. Live at https://meghna-portfolio-eta.vercel.app

## Project structure

```
app/                 routes, metadata, sitemap/robots, OG image, 404, /api/contact
  page.tsx           work page — composes the server-rendered sections
  personal/page.tsx  personal scrapbook page
components/
  Portfolio.tsx      interactive shell: top bar, theme, command palette, effects
  work/              Hero, About, Writing, Education, Interests, Reviews, Contact …
  personal/          PersonalPage (scrapbook + photo lightbox)
  effects/           ScrollProgress, CursorGlow
data/content.ts      all copy, links and lists in one place — edit content here
data/commands.ts     command-palette entries
hooks/               useTheme, scroll/reveal/animation-pause helpers
```

Section components are server-rendered; only the shell, the contact form, the
scrapbook and a few small buttons ship JavaScript. Fonts are self-hosted via
`@fontsource` and images go through `next/image`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form setup

The form posts to `/api/contact`. Without configuration it forwards to FormSubmit
(the address must be activated once via their confirmation email). For more reliable
delivery set these environment variables on Vercel:

- `RESEND_API_KEY` — enables sending through Resend
- `CONTACT_TO_EMAIL` — recipient (defaults to the address on the site)
- `CONTACT_FROM_EMAIL` — verified sender, e.g. `Portfolio <hello@yourdomain.com>`
- `NEXT_PUBLIC_SITE_URL` — canonical site URL (defaults to the Vercel domain)

## Shared poem likes

Poem totals are stored in Supabase so they persist across visitors and deployments.
Create a Supabase project, run [`supabase/poem-likes.sql`](supabase/poem-likes.sql)
in its SQL editor, then set these server environment variables in Vercel and in
`.env.local` for local development:

- `SUPABASE_URL` — the project URL (the app also accepts the Data API URL ending in `/rest/v1/`)
- `SUPABASE_ANON_KEY` — the project's publishable/anon key (never use a service role key)

The migration starts each poem at the existing displayed total of 14. A browser
remembers which poems it has liked in local storage; totals themselves come from
the shared database. Until Supabase is configured, the app shows zero and disables
the like buttons rather than saving a count that would be lost.
