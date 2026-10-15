# Zack Portfolio Studio

A full-stack portfolio built with **Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Framer Motion**.

## What is included

- Dark black/red Zack identity using the supplied portrait.
- Original portrait hero, floating work cards and Edit / Design / Amplify positioning.
- Original category navigation and layout: videos first, Graphic Design & AI second, then Web Design.
- Motion/video section with the requested 3D scroll animation.
- AI ADS collection within Video Editing & Motion: 16 titled Drive videos with footage-derived thumbnails, measured runtimes and in-site playback at `/#ai-ads`.
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
- AYOUR, NAFAS Casablanca and Punch Morocco website demos in keyboard-operable floating previews, with a separate popup-window action.
- Scroll-reactive client-review section with sticky storytelling, card reveals and reduced-motion support; hidden until genuine client feedback is supplied in `lib/testimonials.ts`.
- Reduced-motion support, off-screen video pausing, dialog focus handling and small-screen layouts tested at 320–430px.
- Mobile video controls hide after two seconds of playback; tapping reveals them and restarts the timer. Paused, buffering and keyboard-operated controls stay visible.
- Fast-start H.264/AAC mobile versions for all 25 video cards, with byte-range seeking and no automatic mobile playback.
- Full-height mobile video modals with close and landscape/fullscreen controls available on tap.
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

Desktop uses Google Drive's `/preview` player inside iframes. Make sure the video files are shared so portfolio visitors can view them. Mobile uses optimized H.264/AAC copies in `public/media/mobile/` so the interface can hide two seconds after playback starts and wake on tap. Playback, seek, sound, fullscreen and close controls share the same timer; pausing or buffering reveals the interface. Files load only when their card is opened.

The UI does **not** expose a normal `Open in Drive` link. As with any browser-delivered media, this is a deterrent rather than DRM.

The featured self-hosted showreel uses `public/media/zack-showreel-mobile.mp4` on mobile. It retains the desktop master for larger screens, while the mobile encode is H.264/AAC at 854×480 with its MP4 metadata at the beginning for faster startup and seeking. It uses the same auto-hiding controls as the mobile video cards, and playback begins only after a visitor presses play.

## Right-click behavior

A global `contextmenu` handler replaces the browser menu with a Zack contact card and copy-email action. Remove `components/right-click-contact.tsx` from `app/layout.tsx` if you ever want to restore normal right-click behavior.

## Main files

- `app/page.tsx` — homepage
- `app/work/page.tsx` — full portfolio archive
- `app/work/[slug]/page.tsx` — shareable project case studies
- `app/api/contact/route.ts` — contact backend
- `lib/portfolio.ts` — project/category data
- `lib/motion.ts` — video/showreel data
- `components/hero.tsx` — original portrait hero and floating work cards
- `components/client-reviews.tsx` — client-review section before contact
- `lib/testimonials.ts` — genuine client-approved quotes and attribution
- `components/web-showcase.tsx` — website cards and floating browser viewer
- `components/portfolio-grid.tsx` — filterable project grid
- `components/project-modal.tsx` — full-screen case-study modal
- `components/ui/container-scroll-animation.tsx` — 3D scroll interaction

## Adding more work

1. Add an optimized image to `public/work/`.
2. Add or update a project in `lib/portfolio.ts`.
3. Assign one of the existing category IDs.
4. Add multiple images to its `gallery` array to create a richer case study.

## Web-design previews

The supplied AYOUR, NAFAS and Punch projects are packaged under `public/web-design/` so they do not depend on local development ports. AYOUR is a static export with routes mapped in `next.config.ts`; the other two retain their original HTML/CSS/JS and read-only catalog/program data. Card thumbnails are screenshots of the actual supplied sites.

These are explicitly labelled portfolio demos. Administrative pages are excluded, and `preview-mode.js` prevents backend submissions from creating real orders, bookings or messages. The original projects in the sibling `Web design/` folder remain untouched.

## Client reviews

Add client-approved feedback to `clientReviews` in `lib/testimonials.ts`, with `quote` and `client`, plus optional `context` (project or company) and `sourceUrl` (original public review). The matching black/red review cards appear between About and Contact and reveal progressively while scrolling. No testimonials, ratings or client identities are fabricated; the section remains hidden while the list is empty.

## Restoration point — 3 September 2026

The clean state before this refresh is preserved by the local Git tag `restore-before-web-design-refresh-20260903`, pointing to commit `f220c016ae77c4118e29a6cfbd1b90b9abb82c33`.
