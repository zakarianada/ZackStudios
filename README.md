# Zack Portfolio Studio

A full-stack portfolio built with **Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Framer Motion**.

## What is included

- Dark black/red Zack identity using the supplied portrait.
- Interactive hero with cursor parallax, orbit lines, floating work cards and magnetic CTA buttons.
- Motion/video section with the requested 3D scroll animation.
- Current Google Drive showreels are embedded in-site; there are no outbound Drive buttons.
- Graphic Design + AI merged into one filterable archive with these categories:
  1. Social-media campaign
  2. Packaging
  3. Editorial spread
  4. Fashion campaign
  5. Product visualization
  6. Poster
  7. Photo manipulation
  8. Food advertisement
  9. Sports campaign
  10. Web / key visual
  11. AI avatars & imagery
- Diverse generated showcase artwork in multiple art directions rather than one repeated red/black style.
- Behance-style full-screen project modals.
- Dedicated shareable case-study routes at `/work/[slug]`.
- Custom right-click contact menu showing `zfiverrpro@gmail.com`.
- Full-stack contact API route with server-side Resend support and mailto fallback.
- Responsive desktop, tablet and mobile layouts.
- Port **3004** for both development and production start.

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3004
```

## Contact form

The contact form works in two modes.

### Zero-config local mode

Without environment variables, the form validates through `/api/contact` and then opens the visitor's mail app with the inquiry pre-filled.

### Server-side email delivery with Resend

1. Copy `.env.example` to `.env.local`.
2. Add a Resend API key.
3. Set a verified sender domain in `CONTACT_FROM_EMAIL`.
4. Restart the Next.js server.

Example:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=zfiverrpro@gmail.com
CONTACT_FROM_EMAIL=Zack Portfolio <portfolio@yourdomain.com>
```

## Google Drive videos

The site uses Google Drive's `/preview` player inside sandboxed iframes. Make sure the video files are shared so portfolio visitors can view them.

The UI does **not** expose a normal `Open in Drive` link. As with any browser-delivered media, this is a deterrent rather than DRM.

## Right-click behavior

A global `contextmenu` handler replaces the browser menu with a Zack contact card and copy-email action. Remove `components/right-click-contact.tsx` from `app/layout.tsx` if you ever want to restore normal right-click behavior.

## Main files

- `app/page.tsx` — homepage
- `app/work/page.tsx` — full portfolio archive
- `app/work/[slug]/page.tsx` — shareable project case studies
- `app/api/contact/route.ts` — contact backend
- `lib/portfolio.ts` — project/category data
- `lib/motion.ts` — video/showreel data
- `components/hero.tsx` — interactive portrait hero
- `components/portfolio-grid.tsx` — filterable project grid
- `components/project-modal.tsx` — full-screen case-study modal
- `components/ui/container-scroll-animation.tsx` — 3D scroll interaction

## Adding more work

1. Add an optimized image to `public/work/`.
2. Add or update a project in `lib/portfolio.ts`.
3. Assign one of the existing category IDs.
4. Add multiple images to its `gallery` array to create a richer case study.
