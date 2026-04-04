# FOSSEE Workshop Booking — UI/UX Redesign

A modern, mobile-first React redesign of the [FOSSEE Workshop Booking](https://github.com/FOSSEE/workshop_booking) portal developed by IIT Bombay.

---

## Before vs After

### Login Page
| Before | After |
|--------|-------|
| Plain white form, no branding, tiny button | Gradient background, FOSSEE branding, full-width inputs, show/hide password |

### Register Page
| Before | After |
|--------|-------|
| Single long two-column form, breaks on mobile | 3-step form with progress indicator, fully responsive single column |

### Statistics Page
| Before | After |
|--------|-------|
| Raw table with popup charts, no empty state | Sidebar filters, inline bar charts, mobile card layout, empty state |

### Home Page
| Before | After |
|--------|-------|
| No landing page existed | Full hero section, stats bar, workshop cards, CTA banner, footer |

> Screenshots are in the `/screenshots` folder

---

## Design Principles

### 1. Mobile-First
The target audience is college students, most of whom access the portal on mobile devices.
Every component was designed for small screens first, then enhanced for larger screens using
Tailwind's responsive breakpoints (`sm:`, `md:`, `lg:`).

### 2. Visual Hierarchy
Clear typographic scale (headings → subheadings → body → captions), consistent spacing,
and color contrast guide users through the content naturally without confusion.

### 3. Accessibility (WCAG 2.1)
- All inputs have associated `<label>` elements with `htmlFor`
- Buttons have descriptive `aria-label` attributes
- Interactive elements have visible `focus:ring` styles for keyboard navigation
- `aria-required`, `aria-live`, `aria-current`, `aria-expanded` used throughout
- Semantic HTML elements: `<nav>`, `<main>`, `<section>`, `<aside>`, `<article>`, `<footer>`

### 4. Consistency
A unified design system across all pages — same color palette (indigo/blue),
same border radius (`rounded-xl`, `rounded-2xl`), same shadow style, same navbar and footer.

### 5. Performance
- Vite build tool for fast HMR and optimized production builds
- Tailwind CSS purges unused styles — minimal CSS bundle
- No heavy external UI libraries; all components are hand-built
- SVG-free icon approach using text initials to avoid extra network requests

---

## How Responsiveness Was Ensured

- **Tailwind breakpoints**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for workshop cards
- **Flexible layouts**: Flexbox with `flex-col sm:flex-row` for CTA buttons in hero section
- **Dual rendering**: Statistics page shows a full table on desktop (`hidden md:block`)
  and card-based layout on mobile (`md:hidden`) for optimal readability
- **Sticky navbar**: `sticky top-0 z-50` keeps navigation accessible while scrolling
- **Touch-friendly targets**: All buttons and inputs have a minimum height of 44px

---

## Trade-offs: Design vs Performance

| Decision | Design Benefit | Performance Trade-off |
|----------|---------------|----------------------|
| Gradient backgrounds | Modern, premium feel | Minimal — CSS gradients are GPU-accelerated |
| Tailwind CSS | Rapid development, consistent spacing | Slightly larger HTML class attributes |
| Mock data in Statistics | Demonstrates full UI without backend | Not connected to live Django API |
| Inline bar charts | No external chart library needed | Limited chart types vs Chart.js |
| No images/illustrations | Fast load, no network requests | Less visual richness |

Overall, performance was prioritized — Lighthouse score is expected to be 90+ on all metrics.

---

## Most Challenging Part

**Redesigning the Statistics page** was the most complex part of this task.

The original page had three major UX problems:
1. Charts opened as jarring popup overlays
2. The data table had no empty state — it just showed nothing
3. The entire layout broke on mobile screens

My approach:
- Replaced popup charts with **togglable inline bar charts** that appear above the table
- Built a **dual-render system** — table for desktop, cards for mobile — using Tailwind's
  responsive `hidden`/`block` utilities
- Added an **empty state component** with a clear message when filters return no results
- Made filters a **sticky sidebar** on desktop that collapses to full-width on mobile

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI component library |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router v6 | Client-side routing |

---

## Pages Built

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, stats, workshop cards |
| `/login` | Login | Sign in form with show/hide password |
| `/register` | Register | 3-step registration form |
| `/statistics` | Statistics | Filterable workshop table with charts |

---

## Setup Instructions

### Prerequisites
- Node.js v20.19+ or v22+
- npm v10+

### Installation
```bash
# Clone this repository
git clone https://github.com/Explorer1905/workshop-booking-ui.git
# Navigate into the project
cd workshop-booking-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## Original Repository

This project is a frontend redesign of:
[https://github.com/FOSSEE/workshop_booking](https://github.com/FOSSEE/workshop_booking)

The original backend is built with Django. This React frontend is designed to
replace the existing Django templates while keeping all core functionality intact.

---

## Developed By

Shravani Chavan
Vidyalankar Institute of Technology, Mumbai
Submitted for FOSSEE Summer Fellowship 2026 — Python UI/UX Enhancement Task