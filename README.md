# AccessPath Console

> **Product engineering + accessibility with keyboard-first interaction, recovery, semantic structure, and visible state feedback.**

[Source](https://github.com/Amyvdev1/accessible-workflow-console) · [Amy Villa on GitHub](https://github.com/Amyvdev1) · [Contact](mailto:amyv.dev@gmail.com)

## What it solves

AccessPath demonstrates how a small workflow interface can remain understandable and operable when users navigate by keyboard, encounter validation errors, change state, or need status feedback without hidden interaction requirements.

## Why it exists

Accessibility is easiest to discuss when it is attached to real product behavior. AccessPath uses a request workboard to make implementation choices visible: native controls, semantic regions, focus treatment, form recovery, live announcements, responsive layout, and targeted automated checks.

## Live demo

**Production deployment: pending.** The interface runs locally without accounts, API keys, backend services, or external data. Automated tests and a production Vite build protect the documented behavior until a stable public deployment is attached.

## Architecture

```text
Browser
  │
  ▼
React + TypeScript application
  ├── semantic navigation + regions
  ├── request selection
  ├── explicit local workflow state
  ├── labelled create-request form
  ├── validation + recovery guidance
  └── live status feedback
  │
  ▼
Local React state
  └── resets on refresh
```

### Stack

**React · TypeScript · Semantic HTML · CSS · Vite · Vitest · Testing Library · jest-axe · @axe-core/react · GitHub Actions**

## Key engineering decisions

| Decision | Why it is here |
|---|---|
| **Native buttons instead of drag-and-drop** | Keeps request selection and state progression keyboard-operable without an alternate interaction mode. |
| **Semantic landmarks and heading structure** | Gives the workboard an understandable document and navigation structure. |
| **Persistent labels/help text** | Error recovery does not depend on placeholder text or visual memory. |
| **`aria-invalid` + conditional `aria-describedby`** | Connects invalid state to the relevant recovery guidance. |
| **Polite live status region** | Announces selection, state changes, successful creation, and validation failure without unnecessary focus movement. |
| **Deliberate `:focus-visible` treatment** | Makes keyboard position visible across light and dark surfaces. |
| **Targeted automated accessibility checks** | Catches a useful subset of regressions while explicitly avoiding a false claim of full conformance. |

## Failure & recovery behavior

The interface treats failure as part of the product flow:

- too-short request title → persistent validation message and `aria-invalid`,
- recovery guidance is associated with the field instead of shown as detached copy,
- failed validation is announced through the status/error surface,
- state changes remain one-step native-button actions,
- selected request and workflow status remain visible after interaction.

No interaction requires drag-and-drop, hover-only controls, or hidden keyboard shortcuts.

## Testing & CI

```bash
pnpm install
pnpm test:run
pnpm build
```

The focused suite checks an axe scan, invalid form feedback, and an announced status transition. TypeScript compilation and the Vite production build are included in the repository verification path. GitHub Actions repeats the automated checks on pushes and pull requests.

These checks are **regression signals**, not a substitute for manual keyboard, screen-reader, zoom, browser/device, content, or design review.

## Security / evidence boundaries

AccessPath is an **independent accessibility-practice engineering sample**. It is not client work, production software, a federal application, or a claim of WCAG/Section 508 conformance.

The data lives only in local React state and resets on refresh. The project has no backend, database, authentication, API client, persistence layer, external service integration, or production user data.

## 5-minute code review path

1. [`src/AccessPathApp.tsx`](src/AccessPathApp.tsx) — typed request model, local state, workflow transitions, form validation, semantic UI, and live feedback.
2. [`tests/AccessPathApp.test.tsx`](tests/AccessPathApp.test.tsx) — axe signal, invalid-form recovery, and announced state transition.
3. [`src/styles.css`](src/styles.css) — focus visibility, skip-link reveal, responsive layout, and reduced-motion behavior.
4. [`src/main.tsx`](src/main.tsx) — React StrictMode mount and development-only axe checks.
5. [`docs/CODE_TOUR.md`](docs/CODE_TOUR.md) — source-level behavior and testing boundaries.
6. [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — automated verification and build path.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the Vite development URL shown in the terminal and use the interface entirely by keyboard to inspect the core interaction path.

## Reference boundary

The [W3C WCAG overview](https://www.w3.org/WAI/standards-guidelines/wcag/) frames accessible web content around perceivable, operable, understandable, and robust requirements. AccessPath practices a limited set of implementation patterns within that broader discipline.

---

Built by **Amy Villa** as an inspectable Product Engineering & Accessibility sample.
