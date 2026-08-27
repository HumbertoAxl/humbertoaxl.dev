---
name: Humberto Axl Portfolio
description: A credible developer portfolio expressed as an orbital studio after dark and a daylight observatory in light mode.
colors:
  orbital-blue: "#5b8de8"
  midnight-navy: "#0d1526"
  hero-midnight: "#071022"
  module-navy: "#1a2540"
  starlight: "#e8edf7"
  signal-slate: "#ccd3dd"
  daylight-plum: "#6b5278"
  daylight-ink: "#27232a"
  daylight-paper: "#f3f0e9"
  daylight-module: "#e4ded9"
  daylight-muted: "#514e55"
  mission-blue: "#3d6ad6"
  nebula-violet: "#7c4fc8"
  telemetry-mint: "#00a88e"
typography:
  identity:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(3.25rem, 6.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
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
  button-dark-primary:
    backgroundColor: "{colors.orbital-blue}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "14px 36px"
    height: "52px"
  button-light-primary:
    backgroundColor: "{colors.daylight-plum}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "14px 36px"
    height: "52px"
  button-dark-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.orbital-blue}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "14px 36px"
    height: "52px"
  button-light-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.daylight-plum}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "14px 36px"
    height: "52px"
  panel-dark:
    backgroundColor: "{colors.module-navy}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.lg}"
    padding: "24px"
  panel-light:
    backgroundColor: "{colors.daylight-module}"
    textColor: "{colors.daylight-ink}"
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

**Creative North Star: "The Two-State Observatory"**

The portfolio has one professional identity with two deliberate atmospheric states. Dark mode is an orbital studio: deep navy, crisp blue signals, evidence-led composition, and a restrained field of stars behind the hero. Light mode is a daylight observatory: warm paper and quiet plum, expressed through the same typography and hierarchy so the switch feels like a change of atmosphere rather than a different website.

Space is a framing device, not the page's permanent wallpaper. Its strongest expression is confined to the hero, where an optional user-supplied star photograph can replace the built-in CSS fallback. Below the first viewport, calm semantic surfaces, readable Inter, and conventional interactions keep experience, skills, biography, and contact easy for hiring visitors to scan.

**Key Characteristics:**
- One information architecture with distinctly authored dark and light expressions
- An evidence-led, full-viewport hero with prominent identity, portrait, and calls to action
- Cosmic atmosphere concentrated in the hero rather than spread across the document
- Rounded, softly layered professional modules with fine semantic borders
- A direct, inline contact form that keeps the visitor's draft visible throughout submission

## Colors

Dark mode combines astronomical neutrals with one cool blue signal; light mode translates the same hierarchy into warm paper and restrained plum. Timeline colors remain local evidence markers.

### Primary
- **Orbital Blue:** Global action, active navigation, focus, and identity signal in dark mode.
- **Daylight Plum:** Global action, active navigation, focus, and identity signal in light mode.

### Secondary
- **Mission Blue:** The public-sector role and its associated timeline details.
- **Nebula Violet:** The Calytrix role and its associated timeline details.
- **Telemetry Mint:** The Ferimport role and its associated timeline details.

### Neutral
- **Midnight Navy / Hero Midnight:** The dark document canvas and the slightly deeper hero ground.
- **Module Navy:** Grouped evidence and form surfaces in dark mode.
- **Starlight / Signal Slate:** Primary and supporting content on dark surfaces.
- **Daylight Paper / Daylight Module:** The warm light-mode canvas and its grouped surfaces.
- **Daylight Ink / Daylight Muted:** Primary and supporting content on light surfaces.

**The Theme Owns the Signal Rule.** Orbital Blue owns global actions in dark mode and Daylight Plum owns them in light mode. The toggle thumb must use the active theme's primary color; timeline accents never replace it.

**The Content Above Cosmos Rule.** Star photography and stellar glows belong behind the dark hero. Text and controls always resolve to semantic theme colors and dependable contrast.

## Typography

**Identity Font:** Inter (sans-serif fallback)

**Body Font:** Inter (sans-serif fallback)

**Character:** Compact, technical, and decisive in both themes. Color, atmosphere, and light change between modes while typography stays fixed for a seamless transition.

### Hierarchy
- **Identity:** Extra-bold, responsive, tightly tracked, and tightly led. Reserved for the hero name and role in both themes.
- **Headline:** Bold, uppercase, and widely tracked. Used for section coordinates.
- **Title:** Bold and compact. Used for employers, skill groups, and contact hierarchy.
- **Body:** Regular with generous leading. Keep professional narrative near 65–75 characters per line where practical.
- **Label:** Small and bold. Used for dates, statuses, chips, evidence metadata, and photo-placeholder notes.

**The Stable Identity Rule.** Theme changes never swap font family, weight, line height, tracking, or layout; only color and atmosphere transition.

**The Scale Carries Evidence Rule.** Use meaningful changes in scale and weight to establish scan order; do not decorate evidence copy to compete with the hero.

## Layout

The page uses a full-width atmosphere around a bounded content shell. On desktop, the hero is a seven-to-five composition with narrative first and the portrait second; on small screens, the portrait moves above centered copy. The hero fills at least the first viewport below navigation at every breakpoint, expanding naturally when mobile content needs more room.

Major sections use bounded reading widths and one shared vertical rhythm. The first content section begins one full interval after the hero; neighboring sections split that same interval evenly between the preceding bottom edge and following top edge. The resulting content-to-next-header interval matches the header-to-content interval: 32px on mobile and 48px on desktop. The title dot and spacing separate major sections without full-width divider lines. Skills alone uses fine internal rules between adjacent categories, never after the final category. Experience remains a focused timeline, skills use a responsive grid, and the biography uses a conventional single reading column: two professional paragraphs followed by two personal paragraphs with equal visual weight. Contact closes the page with one centered form and a quiet trailing interval.

Navigation remains 64px high. Desktop presents the name, section links, and theme toggle; compact layouts use a menu, centered name, and persistent toggle. Background atmosphere outside the hero is deliberately quiet so the sequence remains hero, experience, skills, about, then contact.

**The Clear Flight Path Rule.** Professional evidence comes first, a concise biography adds context, and contact closes the page with an immediate next action.

## Elevation & Depth

Depth comes from tonal layering, fine borders, restrained gradients, and ambient light. Resting surfaces stay nearly flat. The scrolled navigation adds translucent blur and a low shadow; the portrait receives the strongest ambient shadow because the real photograph is the primary human asset. Form fields use the semantic paper surface and Material UI's filled treatment rather than detached cards.

### Shadow Vocabulary
- **Panel Rest** (`0 2px 8px rgba(0,0,0,0.05)`): Quiet separation for grouped evidence.
- **Panel Hover** (`0 8px 24px rgba(0,0,0,0.1)`): Restrained response for interactive surfaces.
- **Navigation Dark** (`0 5px 18px rgba(2,3,12,0.13)`): Low ambient separation after scrolling in dark mode.
- **Navigation Light** (`0 4px 14px rgba(39,35,42,0.07)`): Warm, shallow separation after scrolling in light mode.
- **Portrait Dark** (`0 18px 60px rgba(91,141,232,0.20)`): The strongest dark-mode identity glow.
- **Portrait Light** (`0 18px 52px rgba(39,35,42,0.13)`): A soft editorial portrait lift without a glow effect.

**The Ambient, Not Floating Rule.** Shadows suggest environmental light; borders and tonal shifts still define the structure.

## Shapes

Prominent actions and panels use 16px corners from the 8px theme unit. Chips and the theme control are pills. The portrait stays circular in both themes and uses one slowly rotating dashed circular frame. Circles remain purposeful markers for the portrait, section coordinates, timeline positions, and the toggle thumb.

**The Orbits Are Rare Rule.** Full circles mark identity, position, or state. Do not turn every container or icon into a floating bubble.

## Components

### Buttons
- **Shape:** Generously padded, 52px high, with 16px corners.
- **Primary:** Solid active-theme primary with white text. The hero uses it for “View Experience.”
- **Secondary:** Transparent, semantically tinted, and outlined. The hero uses it for “Contact me.”
- **Hover / Focus:** Use restrained tonal shifts and a clearly visible 3px focus ring; avoid bouncing or elastic movement.

### Theme Toggle
- **Style:** A 76×44px outlined pill with a 28px circular thumb and paired sun/moon icons.
- **State:** The thumb slides between modes over 260ms and always matches the active theme's primary color.
- **Accessibility:** Keep a 44px minimum target, state-aware label, pressed state, and keyboard focus indicator.

### Chips
- **Style:** Compact outlined pills for technical metadata, with low visual weight and secondary text color.
- **State:** Filled translucent role accents remain reserved for real statuses such as “Present.”

### Cards / Containers
- **Corner Style:** Gently rounded, usually 16px.
- **Background:** Module Navy in dark mode and Daylight Module in light mode.
- **Shadow Strategy:** Almost flat at rest; ambient lift only where interaction or focus warrants it.
- **Border:** One-pixel semantic divider for legibility across both themes.
- **Internal Padding:** 16px on compact mobile layouts and 24–48px on grouped desktop surfaces.

### Navigation
- **Style:** A 64px app bar with the name as a stable identity anchor, uppercase section controls, a theme-colored active underline, and the light/dark toggle. At the top of the home page it is completely transparent over the full-bleed hero.
- **Scrolled State:** A translucent canvas color, 16px backdrop blur, low ambient shadow, and faint divider.
- **Mobile:** Hamburger drawer, centered name, persistent theme toggle, and the same Home → Experience → Skills → About → Contact order.

### Hero

The hero is the signature identity component. It pairs a large name and role with honest production-focused copy, two clear actions, and a circular portrait inside one slowly rotating dashed frame. The background is full-bleed while all hero content remains inside the bounded application shell. Dark mode may use the optional path configured in `src/visualAssets.ts`; if no image is supplied, lightweight CSS stars and restrained orbital light preserve the composition. Light mode uses a warm, quiet field of plotted dots without diagonal guide lines. Every section below the hero sits on a plain semantic background.

### Experience Timeline

Desktop uses a date rail, colored marker, connector, and content panel; mobile moves the date into the panel and removes the rail. WAIRC and DPIRD share one Western Australian Government entry, preserving employment continuity while the bullet sequence explains the move between departments. Other employers retain their own local accents while shared typography and surfaces preserve system unity.

### Contact Form

Contact is an always-visible form inside the page rather than a modal or disclosure. It asks only for the visitor's name, email, and message; the delivery subject is generated server-side. Name and email form one compact identity group above the full-width message field. Input remains intact after network errors and after successful submission, validation is inline, and status changes are announced accessibly. Field captions stay hidden until there is an actionable validation error, keeping the resting form compact. The public fallback routes are `contact@humbertoaxl.dev` and LinkedIn; personal email and phone details never appear on the site.

### Section Coordinate

Section headings are centered, uppercase, widely tracked, and followed by a small theme-colored dot. This creates a subtle plotted-coordinate rhythm without literal dashboard labels.

## Do's and Don'ts

### Do:
- **Do** keep professional evidence and calls to action clearer than the star layer.
- **Do** confine star photography and the strongest space atmosphere to the dark hero.
- **Do** use the optional hero image slot and preserve its CSS fallback until Humberto supplies the final asset.
- **Do** keep Inter and the same typographic metrics across both hero states.
- **Do** keep the contact draft visible through validation, loading, success, and failure states.
- **Do** keep ZeptoMail credentials server-side in Netlify environment variables.
- **Do** use responsive semantic theme colors rather than hard-coded control states.

### Don't:
- **Don't** turn the interface into a spaceship dashboard or introduce a “Mission Log” section.
- **Don't** spread stars, nebulae, or space imagery behind the whole document.
- **Don't** expose Humberto's personal email address or telephone number in the public interface.
- **Don't** introduce glowing code windows, floating technology logos, glass cards everywhere, or gratuitous gradients.
- **Don't** use bounce or elastic easing for navigation or theme changes.
- **Don't** let every surface become rounded, elevated, and independently framed; preserve hierarchy through grouping and negative space.
