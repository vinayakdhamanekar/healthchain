# Health Chain Website — Project Context

## Project Overview
# Health Chain Website — Project Context

## Project Overview
Building a brand new Health Chain website in Next.js.
DO NOT reference or copy the live WordPress site at healthchain.com.

## Design Reference Files (ALWAYS use these)
Primary design source — use in this priority order:

1. FIGMA DESIGN IMAGE:
   File: design-reference/figma-design.png
   This is the main visual reference.
   Match colors, layout, spacing, typography 
   and section order EXACTLY as shown in this image.

2. HTML REFERENCE FILE:
   File: design-reference/healthchain-design.html
   Use this to extract:
   - Exact copy/text content
   - Exact color hex values
   - Exact class names and structure hints
   - Any SVG icons or assets embedded in the HTML

3. NEVER use healthchain.com (WordPress site) as reference.
   The new design is different from the old site.

## How to Use Design References
- Before building any component, look at figma-design.png
  and find that section in the image
- Extract exact text content from healthchain-design.html
- Match the visual appearance to figma-design.png as closely
  as possible using Tailwind CSS
- If figma-design.png and healthchain-design.html conflict,
  always follow figma-design.png for visuals
  and healthchain-design.html for text content

## Tech Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- No external UI libraries unless asked
- No inline styles ever

## Design Tokens
- Background: #FAF9F6 (cream/off-white)
- Primary accent: #E8352A (red — buttons, highlights)
- Dark background: #1A1A1A (dark sections)
- Olive background: #4A5240 (testimonial section)
- Text dark: #1A1A1A
- Text muted: #6B6B6B
- Border color: #E5E7EB (gray-200)
- Font: Inter (Google Fonts)

## Project Structure
healthchain-website/
├── app/
│   ├── page.tsx          ← homepage (imports all components)
│   ├── layout.tsx        ← root layout
│   └── globals.css       ← global styles
├── components/
│   ├── Navbar.tsx        ← DONE
│   ├── Hero.tsx          ← DONE
│   ├── StatsBadges.tsx   ← DONE
│   ├── IngestSection.tsx ← DONE
│   ├── PlatformSteps.tsx ← DONE
│   ├── StatsBanner.tsx   ← DONE
│   ├── Solutions.tsx     ← DONE
│   ├── Testimonial.tsx   ← DONE
│   ├── BlogCards.tsx     ← DONE
│   └── Footer.tsx        ← DONE
├── public/               ← images go here
├── CLAUDE.md             ← this file
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts

## Homepage Section Order (app/page.tsx)
1.  Navbar          → sticky top, white bg
2.  Hero            → cream bg, two col layout
3.  StatsBadges     → white bg, badge pills row
4.  IngestSection   → cream bg, three col layout
5.  PlatformSteps   → cream bg, three cards
6.  StatsBanner     → dark bg #1A1A1A, stats row
7.  Solutions       → cream bg, numbered rows
8.  Testimonial     → olive bg #4A5240, centered quote
9.  BlogCards       → cream bg, three cards grid
10. Footer          → dark bg #1A1A1A, five columns

## TypeScript Rules (ALWAYS follow these)
- Always define interfaces for all props and data
- Use JSX.Element as return type for all components
- Never use `any` type
- Keep types/interfaces in the same file unless shared
- File extensions: pages → .tsx, components → .tsx, 
  utilities → .ts

## Component Rules (ALWAYS follow these)
- Build ONE component at a time
- Never delete or modify already working components
- Always use Tailwind classes only, never inline styles
- Always make components responsive (mobile first)
- Import and add to app/page.tsx after building
- Never remove existing imports in app/page.tsx

## Tailwind Responsive Breakpoints
- Mobile first (default styles = mobile)
- md: → tablet (768px+)
- lg: → desktop (1024px+)
- xl: → large desktop (1280px+)

## Color Classes Quick Reference
- Red accent: text-red-600 bg-red-600 border-red-600
- Dark bg sections: bg-gray-900 or bg-[#1A1A1A]
- Cream bg: bg-[#FAF9F6]
- Olive bg: bg-[#4A5240]
- Muted text: text-gray-500
- Light border: border-gray-200

## Completed Components Summary

### Navbar.tsx ✅
- Logo left: "⊕ Health Chain" red color
- Nav links center: Features, Solutions, Resources, Company
- Buttons right: "Explore Platform" (outline) + 
  "Request a Demo" (red bg)
- Sticky top, white bg, bottom border
- Hamburger menu on mobile

### Hero.tsx ✅
- Left: PLATFORM tag, big headline, subtext, two buttons
- Right: gray placeholder image box
- Cream bg #FAF9F6, two col desktop, single col mobile

### StatsBadges.tsx ✅
- Horizontal pill badges row
- 6 badges: CMS Compliant, NCQA Certified, FHIR R4 Ready,
  HL7 Member, ONC Certified, HITRUST Certified
- White bg, colored icons, full width

### IngestSection.tsx ✅
- Three col: left sources, center headline, right sources
- Headline: "Ingest from 50+ sources into one normalized model"
- Left: Claims Data, Flat Files, SDOH Sources
- Right: Pharmacy Data, Lab Results, EMR/EHR
- Dashed connecting lines, cream bg

### PlatformSteps.tsx ✅
- Section label: PLATFORM
- Headline: "Three steps to data you can use (and trust)."
- Three white cards: Capture(01), Curate(02), Consume(03)
- Each card: number, icon, title, description, chip tags
- Red arrows between cards on desktop

### StatsBanner.tsx ✅
- Dark bg #1A1A1A
- Left: "What used to take months now takes days."
- Right: Regional Blue Plan case study text
- Three stats: 95%↓ (red ↓), 50+ (red +), FHIR
- Stats in huge white text

### Solutions.tsx ✅
- Section label: SOLUTIONS
- Headline: "One partner. Every payer initiative. Solved."
- Three numbered rows with dividers:
  01 → Interoperability & Compliance
  02 → Longitudinal Data Enablement
  03 → Benefit Design & Intelligence
- Each row: number, category, title, description,
  colored chips, Explore link
- Hover effects on each row

### Testimonial.tsx ✅
- Dark olive bg #4A5240
- Centered white quote text
- Large red opening quote mark
- Attribution: Sarah L., VP Data & Analytics, 
  Regional Blue Plan
- 5 gold stars, 3 dot decoration

### BlogCards.tsx ✅
- Header: "Latest thinking." + "View All Resources →"
- Three cards grid:
  Card 1: Solution Brief (red) — CMS-0057-F article
  Card 2: Case Study (green) — Regional Blue Plan story
  Card 3: Whitepaper (blue) — CTO guide
- Each card: image placeholder, category, title,
  description, Read More link

### Footer.tsx ✅
- Dark bg #1A1A1A
- Five columns:
  Col 1: Logo + tagline + social icons (LinkedIn, X, GitHub)
  Col 2: Solutions links
  Col 3: Platform links
  Col 4: Resources links
  Col 5: Company links
- Bottom: copyright left, legal links right

## Current Status
✅ All 10 components built and added to app/page.tsx
✅ Homepage is complete

## Next Steps (if any fixes needed)
- Run: npm run dev
- Check mobile view: F12 → toggle device toolbar
- Fix any spacing or layout issues component by component
- Add real images to public/ folder when available
- Connect to real API or CMS when ready

## Token Saving Rules for Claude Code Sessions
- Always read this CLAUDE.md file first
- Build only ONE component per session
- Use /compact if session gets long
- Use /cost to monitor token usage
- Use /exit when done with each component
- Never re-explain what is already in this file


## Pages
- / → app/page.tsx (Home page) ✅ DONE
- /hch-platform → app/hch-platform/page.tsx (Platform page) ⬜ IN PROGRESS

## HCH-Platform Page Notes
- Design reference: design-reference/HCH-Platform.png
- No HTML reference for this page (image only)
- Reuse existing Header (Navbar.tsx) and Footer.tsx — do not modify them
- Reuse existing design tokens, button styles, card styles from Home page
- New components go in components/platform/ subfolder to keep organized

- /solutions → app/solutions/page.tsx ⬜ IN PROGRESS

## Solutions Page Notes
- Design reference: design-reference/solution.png
- No HTML reference for this page (image only)
- Reuse existing Navbar.tsx and Footer.tsx without modification
- Reuse existing design tokens, button styles, card styles
- New components go in components/solutions/ subfolder

- /longitudinal-data-enablement → 
  app/longitudinal-data-enablement/page.tsx ⬜ IN PROGRESS

## Longitudinal Data Enablement Page Notes
- Design reference: design-reference/LongitudinalDataEnablement.png
- No HTML reference for this page (image only)
- Reuse existing Navbar.tsx and Footer.tsx without modification
- Reuse existing design tokens, button styles, card styles
- New components go in components/longitudinal/ subfolder

- /about → app/about/page.tsx ⬜ IN PROGRESS

## About Page Notes
- Design reference: design-reference/about.png
- No HTML reference for this page (image only)
- Reuse existing Navbar.tsx and Footer.tsx without modification
- Reuse existing design tokens, button styles, card styles
- New components go in components/about/ subfolder

## About Page Special Notes
- Leadership section: horizontal scrollable cards
- Cards scroll by click and drag OR progression bar below
- LinkedIn icon on each card links to individual profile
- Pink/placeholder text in design = needs real content
- Placeholder images = gray avatar circles until real photos added


## Careers Page Special Notes
- Most content is Lorem Ipsum placeholder — build structure,
  mark all placeholder text with TODO comments in code
- Hero: two col layout, left large photo, right text
- Culture/Benefits: 4 cards in a row with colored icons
- Job Openings: dark gradient bg section with CTA button
- Real content to be filled in later by client


- /contact → app/contact/page.tsx ⬜ IN PROGRESS

## Contact Page Notes
- Design reference: design-reference/contact.png
- No HTML reference for this page (image only)
- Reuse existing Navbar.tsx and Footer.tsx without modification
- Reuse existing design tokens, button styles, card styles
- New components go in components/contact/ subfolder

## Contact Page Special Notes
- Single page layout — just one main section + Navbar + Footer
- Left col: text content (cream background)
- Right col: booking form with colorful gradient background
- Form fields: Name, Email, Phone, Company, 
  Areas of Interest (dropdown), Message (textarea)
- Submit button: red bg with arrow icon
- Form has white card overlay on gradient background