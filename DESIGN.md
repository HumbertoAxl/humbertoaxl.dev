---
name: Humberto Axl Portfolio
description: A credible developer portfolio shaped as a quietly confident orbital workshop.
colors:
  orbital-blue: "#5b8de8"
  midnight-navy: "#0d1526"
  module-navy: "#1a2540"
  starlight: "#e8edf7"
  signal-slate: "#8fa3c0"
  daylight-plum: "#6b5278"
  daylight-ink: "#27232a"
  daylight-paper: "#f3f0e9"
  daylight-module: "#ebe7e3"
  daylight-muted: "#514e55"
  mission-blue: "#3d6ad6"
  nebula-violet: "#7c4fc8"
  telemetry-mint: "#00c9a7"
  deep-space-core: "#060212"
  deep-space-halo: "#100826"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(3.2rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.05
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "4px"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.orbital-blue}"
    textColor: "{colors.daylight-paper}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.orbital-blue}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
  panel-dark:
    backgroundColor: "{colors.module-navy}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.lg}"
    padding: "24px"
  chip-outline:
    backgroundColor: "transparent"
    textColor: "{colors.signal-slate}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
---

# Design System: Humberto Axl Portfolio

## Overview

**Creative North Star: "The Orbital Workshop"**

The portfolio feels like a working observatory rather than a sci-fi spectacle: technically precise, quietly confident, exploratory, and human. A deep-space canvas provides atmosphere while clear type, direct language, and conventional interaction patterns keep the hiring evidence easy to evaluate.

The visual system earns identity through a small number of committed signals: orbital blue, a procedural Milky Way panorama, circular geometry around the portrait, and restrained module-like surfaces. The dark-mode background is a document-sized WebGL scene generated at the page's actual dimensions, so visitors naturally scroll through one continuous composition with no bitmap dependency, parallax, fixed viewport, or scroll-driven animation. A diagonal blue-white galaxy and dark dust lane carry the dominant visual weight; sparse purple nebula filaments sit within large areas of calm midnight space. The scene redraws only when the viewport or document height changes, preserving its composition as content grows and across narrow, standard, and ultrawide aspect ratios.

**Key Characteristics:**
- Deep navy environment with cool blue navigational emphasis
- Oversized, tightly set display type paired with highly legible body copy
- Sparse circular and orbital motifs concentrated around identity moments
- Soft tonal layering, fine borders, and restrained ambient lift
- A responsive light mode with selective plum signals, neutral surfaces, and a subtle technical grid

## Colors

The primary palette combines dark astronomical neutrals with one clear blue signal; job-specific accents distinguish timeline entries without competing with the portfolio identity.

### Primary
- **Orbital Blue:** The main signal for Humberto's name, calls to action, active navigation, section labels, and focus moments.
- **Daylight Plum:** Replaces Orbital Blue as the global signal in light mode, preserving the cosmic identity without tinting every surface purple.

### Secondary
- **Mission Blue:** Marks the current public-sector role and its associated timeline details.
- **Nebula Violet:** Distinguishes the Calytrix role.
- **Telemetry Mint:** Distinguishes the Ferimport role.

### Neutral
- **Midnight Navy:** Default dark canvas behind the page.
- **Module Navy:** Raised panels, cards, and grouped content in dark mode.
- **Starlight:** Primary text on dark surfaces.
- **Signal Slate:** Secondary copy and subdued navigation on dark surfaces.
- **Daylight Paper / Daylight Module / Daylight Ink / Daylight Muted:** A warm moon-dust canvas, neutral stone panels, primary text, and higher-contrast supporting copy that reduce glare without looking washed out.
- **Deep Space Core / Deep Space Halo:** The radial atmosphere behind the generated star field; these remain background-only colors.

**The Single Signal Rule.** Orbital Blue owns global actions in dark mode and Daylight Plum owns them in light mode. Timeline accents may identify individual roles, but they do not replace the active theme's global signal.

**The Content Above Cosmos Rule.** Stellar colors belong to the atmospheric layer. Text and controls must always resolve to the core semantic palette for dependable contrast.

## Typography

**Display Font:** Inter (sans-serif fallback)
**Body Font:** Inter (sans-serif fallback)

**Character:** One variable sans-serif family keeps the system contemporary and technically direct. Identity comes from decisive scale, weight, tracking, and rhythm rather than a decorative font pairing.

### Hierarchy
- **Display:** Extra-bold, responsive, and tightly led. Reserved for the two-line hero introduction and other rare identity-defining statements.
- **Headline:** Bold, uppercase, and widely tracked. Used for role labels and section headings as navigational coordinates.
- **Title:** Bold and compact. Used for employers and skill categories.
- **Body:** Regular with generous leading. Keep descriptive copy comfortably scannable and constrain long prose to roughly 65–75 characters per line.
- **Label:** Small and bold. Used for dates, statuses, chips, and compact supporting metadata.

**The Scale Carries Identity Rule.** Keep Inter straightforward; create hierarchy through real changes in scale and weight, not gratuitous italics, serif cameos, or decorative effects.

## Layout

The page uses a maximum-width application shell with full-width atmospheric backgrounds. The hero is a two-column composition on desktop—roughly seven parts narrative to five parts portrait—and stacks into one column on small screens. Major sections use 48px vertical space on small screens and 64px on desktop, with 24px small-screen and 48px desktop horizontal gutters.

Content sections center within bounded measures: experience uses a narrow timeline, skills use a responsive four-column grid, and the biography sits inside a broad panel with a narrower reading column. Mobile layouts remove timeline chrome that depends on horizontal space, move dates into each card, collapse navigation into a drawer, and retain the theme toggle.

**The Clear Flight Path Rule.** The visual journey remains hero, evidence, capabilities, and personal context. Atmospheric elements may guide the eye but never interrupt that hiring sequence.

## Elevation & Depth

Depth is softly layered rather than dramatically raised. Panels sit on tonal contrast with a fine divider; resting shadows are faint and become wider ambient glows on hover. The navigation adds translucent blur and a low shadow only after scrolling. The portrait receives the strongest ambient glow because it is the primary human identity asset.

### Shadow Vocabulary
- **Panel Rest:** `0 2px 8px rgba(0,0,0,0.05)` for grouped cards and the biography panel.
- **Panel Hover:** `0 8px 24px rgba(0,0,0,0.1)` for interactive lift without a floating-card effect.
- **Navigation Scrolled:** `0 2px 16px rgba(0,0,0,0.08)` paired with background blur.
- **Portrait Orbit:** A broad, low-opacity Orbital Blue glow paired with a small neutral shadow.

**The Ambient, Not Floating Rule.** Shadows suggest light cast through the environment; borders and tonal shifts still define the structure.

## Shapes

Panels and action controls use gently rounded corners built from the 8px theme unit, most often 16px on prominent surfaces. Compact icon modules use 10–12px corners. Chips are pill-shaped. Circles are reserved for the portrait, orbit ring, stars, timeline markers, and section waypoints, giving the identity a coherent orbital geometry.

**The Orbits Are Rare Rule.** Full circles mark identity, position, or status. Do not turn every container or icon into a floating bubble.

## Components

### Buttons
- **Shape:** Generously padded with 16px corners.
- **Primary:** Solid Orbital Blue with white text; used for the highest-value next action.
- **Secondary:** Transparent with an Orbital Blue outline and label; used for a quieter parallel action.
- **Hover / Focus:** State changes stay quick and controlled. Preserve an obvious keyboard focus indicator and avoid elastic or bouncing motion.

### Chips
- **Style:** Compact outlined pills for skills, with low visual weight and secondary text color.
- **State:** Filled translucent role accents are reserved for real status, such as “Present.”

### Cards / Containers
- **Corner Style:** Gently rounded, usually 16px.
- **Background:** Module Navy in dark mode and Daylight Module in light mode.
- **Shadow Strategy:** Almost flat at rest; ambient lift on hover where the card is interactive or timeline-focused.
- **Border:** One-pixel semantic divider to keep structure legible over the atmospheric background.
- **Internal Padding:** 16px on compact mobile layouts and 24–48px on larger grouped surfaces.

### Navigation
- **Style:** A 64px app bar with the name as a stable identity anchor, uppercase section controls, an animated blue active underline, and a light/dark toggle.
- **Scrolled State:** A highly translucent canvas color, soft backdrop blur, low ambient shadow, and a barely visible divider that never reads as a solid rule.
- **Mobile:** Hamburger drawer, centered name, and persistent theme toggle.

### Experience Timeline

The timeline is the principal evidence component. Desktop uses a date rail, colored marker, connector, and content panel; mobile moves the date into the panel and removes the rail. Each employer owns one restrained accent color, while shared typography and surfaces keep the entries within the same system.

### Section Coordinate

Section headings are centered, uppercase, widely tracked, and followed by a small Orbital Blue dot. This repeats the language of a plotted coordinate without adding literal space-themed labels.

## Do's and Don'ts

### Do:
- **Do** keep professional evidence and calls to action visually clearer than the star field.
- **Do** concentrate cosmic expression in the canvas, portrait orbit, section waypoints, and restrained ambient light.
- **Do** use the responsive dark and light semantic palettes rather than hard-coding text colors inside components.
- **Do** preserve generous body leading and bounded reading widths for fast recruiter scanning.
- **Do** use job accent colors only within the experience timeline.

### Don't:
- **Don't** turn the interface into a literal spaceship dashboard or cover content with decorative telemetry.
- **Don't** introduce generic developer-site tropes such as glowing code windows, floating technology logos, glass cards everywhere, or gratuitous gradients.
- **Don't** use thick one-sided card borders as a default accent treatment.
- **Don't** use bounce or elastic easing for navigational motion.
- **Don't** let every surface become rounded, elevated, and independently framed; preserve hierarchy through grouping and negative space.
