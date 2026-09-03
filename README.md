# AccessPath Console

> **A React + TypeScript accessibility-practice workboard built around semantic structure, keyboard-operable controls, useful error recovery, and live status feedback.**

[Portfolio walkthrough](https://amy-villa-signal-gallery.vercel.app/projects/accesspath-console) · [Amy Villa on GitHub](https://github.com/Amyvdev1) · [Contact Amy](mailto:amyv.dev@gmail.com)

AccessPath is a self-directed front-end code sample that uses a small request workflow to practice implementation-level accessibility. A person can select a request, move it from **New → In review → Ready**, and create a request through a labelled form with visible recovery guidance.

## What Amy built

| Practice area | Implementation evidence |
|---|---|
| **Semantic navigation** | Skip link, `header`, labelled `nav`, `main`, labelled sections, heading order, lists, definition lists, and footer. |
| **Keyboard-first controls** | Native buttons for request selection and one-step workflow transitions; no drag-and-drop interaction is required. |
| **Visible focus** | A deliberate `:focus-visible` treatment and a focus-revealed skip link work against both light and dark surfaces. |
| **Form recovery** | Persistent label and help text, title trimming, minimum-length validation, `aria-invalid`, conditional `aria-describedby`, and `role="alert"` errors. |
| **Live feedback** | A polite status region announces selection, state transitions, successful creation, and validation failure without unnecessary focus movement. |
| **Responsive layout** | Grid-based workspace and board layouts reflow through documented responsive breakpoints. |
| **Automated checks** | Vitest, Testing Library, jest-axe, and development-only `@axe-core/react` provide focused automated regression signals. |

## Code map

| File / area | What it does |
|---|---|
| [`src/AccessPathApp.tsx`](src/AccessPathApp.tsx) | Holds the typed request model, local state, status progression, selection behavior, validation, semantic UI, and live feedback. |
| [`src/styles.css`](src/styles.css) | Defines focus visibility, skip-link reveal, surfaces, grids, typography, responsive behavior, and reduced-motion handling. |
| [`tests/AccessPathApp.test.tsx`](tests/AccessPathApp.test.tsx) | Checks an axe scan, invalid form feedback, and an announced status transition. |
| [`src/main.tsx`](src/main.tsx) | Mounts the React app under StrictMode and enables development-mode axe checks. |
| [`vite.config.ts`](vite.config.ts) | Declares the Vite React setup plus jsdom/Vitest test configuration. |
| [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) | Runs accessibility and interaction regression tests plus a production build before a main-branch GitHub Pages deployment. |

Read the [technical code tour](docs/CODE_TOUR.md) for source-level behavior and testing boundaries.

## Run locally

```bash
pnpm install
pnpm dev
```

## Run the checks

```bash
pnpm test:run
pnpm build
```

The inspected local toolchain passed **three tests**, TypeScript compilation, and a Vite production build. The [GitHub Actions workflow](https://github.com/Amyvdev1/accessible-workflow-console/actions) runs the same automated verification before a main-branch GitHub Pages deployment. These checks are targeted regression signals; they are not a substitute for a full manual accessibility evaluation.

## Intentional boundaries

This is a **personal accessibility-practice code sample**. It is not client work, production software, a federal application, or a claim of WCAG or Section 508 conformance. The data is local React state and resets on refresh. The project has no backend, database, authentication, API client, persistence layer, or external service integration. A real product would still need manual keyboard, screen-reader, zoom, browser/device, content, and design review.

## Reference material

The [W3C WCAG overview](https://www.w3.org/WAI/standards-guidelines/wcag/) frames accessible web content around perceivable, operable, understandable, and robust requirements. AccessPath practices a limited set of implementation patterns within that broader discipline.

---

Created by **Amy Villa** as a focused front-end accessibility practice project.
