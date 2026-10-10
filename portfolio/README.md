# Portfolio — Next.js + GSAP + Lenis

## Run
    npm install
    npm run dev      # http://localhost:3000

## Customize
Everything personal (name, email, bio, projects, colors of project cards) lives at the top of
`components/Portfolio.js`. Brand colors and spacing are CSS variables at the top of `app/globals.css`.

## What's animated
- Hero name: letter-by-letter rise (GSAP timeline), parallax drift on scroll
- About: words light up as you scroll (ScrollTrigger scrub)
- Work: pinned horizontal scroll on desktop, stacked on mobile
- Custom cursor and magnetic email link (gsap.quickTo)
- Smooth scrolling via Lenis, synced with ScrollTrigger
- Respects prefers-reduced-motion

## Deploy
Push to GitHub and import into Vercel.
