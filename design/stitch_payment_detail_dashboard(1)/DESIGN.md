---
name: Precision Ledger
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#43474e'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#476083'
  primary: '#000613'
  on-primary: '#ffffff'
  primary-container: '#001f3f'
  on-primary-container: '#6f88ad'
  inverse-primary: '#afc8f0'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#000511'
  on-tertiary: '#ffffff'
  tertiary-container: '#0e1f33'
  on-tertiary-container: '#77879f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#afc8f0'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#2f486a'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar_width: 50px
  container_max_width: 1440px
  gutter: 24px
  margin_mobile: 16px
  margin_desktop: 32px
  stack_xs: 4px
  stack_sm: 8px
  stack_md: 16px
  stack_lg: 24px
---

## Brand & Style

This design system is engineered for high-density financial environments where trust, clarity, and rapid data synthesis are paramount. The aesthetic follows a **Corporate / Modern** direction with a focus on systematic organization and high functional density. 

The personality is authoritative and stoic, achieved through a structured layout, a sober color palette, and clear visual hierarchies. The target audience includes financial analysts, treasurers, and operations managers who require an "at-a-glance" understanding of complex data sets. The emotional response is one of controlled efficiency—users should feel that the system is powerful, predictable, and precise.

## Colors

The palette is anchored by a **Deep Navy (#001F3F)** used exclusively for the global navigation sidebar to provide a strong structural frame. The primary workspace utilizes a "Paper and Ink" philosophy: **Clean White (#FFFFFF)** for surfaces and **Soft Grays (#F1F5F9, #F8FAFC)** for background contrast and subtle borders.

- **Primary (Deep Navy):** Power, stability, and navigation hierarchy.
- **Surface & Background:** Off-white backgrounds reduce eye strain during long sessions while keeping the UI feeling fresh and modern.
- **Functional Colors:** Success, Warning, Error, and Info colors are calibrated for high legibility against white backgrounds, ensuring that status pills and indicators are immediately scannable.

## Typography

This design system utilizes **Inter** for all UI elements to ensure maximum legibility and a neutral, professional tone. A strict hierarchy is enforced to manage data-heavy views.

- **Headlines:** Use tighter letter-spacing and heavier weights to anchor sections.
- **Mono-spaced (JetBrains Mono):** Specifically reserved for Transaction IDs, Account Numbers, and currency values. This ensures characters like "1" and "I" are distinct and that numerical columns align perfectly in tables.
- **Labels:** Use `label-caps` for table headers and metadata categories to create a clear visual distinction from interactive content.

## Layout & Spacing

The layout is built on a **Fluid Grid** model with fixed-width structural elements. 

- **Sidebar:** A narrow 50px vertical sidebar persists on the left, containing icon-only navigation to maximize horizontal space for data tables and charts.
- **Dashboard Canvas:** Content is housed in a flexible container that expands to a max-width of 1440px. 
- **Rhythm:** An 8px base unit governs all spacing. Vertical stacks typically use 16px (`stack_md`) for related elements and 24px (`stack_lg`) for distinct sections.
- **Responsive Behavior:** On mobile, the sidebar transitions to a bottom bar or a hidden drawer, and margins reduce to 16px. Cards reflow from multi-column grids to a single-column stack.

## Elevation & Depth

This design system uses **Tonal Layers** supplemented by **Low-contrast outlines**. This approach minimizes visual noise while maintaining clear object separation.

- **Level 0 (Background):** #F8FAFC. The foundation layer.
- **Level 1 (Cards/Surfaces):** White (#FFFFFF) with a 1px border (#E2E8F0).
- **Shadows:** Use a single, highly diffused shadow for active or floating elements: `0px 4px 12px rgba(0, 0, 0, 0.05)`. 
- **Interactive Depth:** On hover, cards do not lift significantly; instead, the border color shifts to a slightly darker gray or the primary navy to indicate focus.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, "exact" feel that is less clinical than sharp corners but more serious than highly rounded "consumer" styles.

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Cards:** 8px (0.5rem) corner radius to create a nested visual hierarchy.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from interactive buttons or input fields.

## Components

- **Vertical Sidebar:** 50px wide, #001F3F background. Icons are centered with a 24px active state indicator (a vertical line on the left edge).
- **Cards:** White background, 1px border (#E2E8F0), 8px border-radius. Headers inside cards should have a subtle bottom border.
- **Status Pills:** Small, bold text with 10% opacity background of the status color and 100% opacity text (e.g., Success: Green text on light green tint).
- **Breadcrumbs:** Simple chevron-separated `body-sm` text. The current page is bold navy, previous pages are medium gray.
- **Vertical Timeline:** A 2px gray line with 8px circular nodes. Active/Completed nodes use the Success Green; pending nodes use a hollow gray circle.
- **Input Fields:** 1px border, 4px radius. On focus, the border changes to Primary Navy with a 2px soft blue outer glow.
- **Data Tables:** Zebra-striping is avoided in favor of thin horizontal dividers. Headers use `label-caps` for clarity.