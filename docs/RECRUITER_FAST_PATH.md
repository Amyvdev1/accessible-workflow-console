# Recruiter Fast Path — AccessPath Console

AccessPath is a self-directed **React and TypeScript accessibility-practice code sample**. It makes accessibility-related design and implementation decisions easy to inspect without claiming formal accessibility conformance.

## What to inspect first

1. [`src/AccessPathApp.tsx`](../src/AccessPathApp.tsx) for typed local state, labelled form validation, native buttons, request progression, semantic landmarks, and live status feedback.
2. [`src/styles.css`](../src/styles.css) for `:focus-visible`, skip-link behavior, responsive layout, and reduced-motion rules.
3. [`tests/AccessPathApp.test.tsx`](../tests/AccessPathApp.test.tsx) for a focused axe scan, invalid-form feedback, and an announced state-transition check.
4. [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) for the workflow that runs checks and a production build before a main-branch Pages deployment.

## Run and verify

```bash
pnpm install
pnpm test:run
pnpm build
pnpm dev
```

A useful manual screen is keyboard-only: tab to the skip link, select a request, advance status, submit an invalid title, recover, and confirm the status message.

## Good interview questions

- Why are native buttons used instead of custom div controls?
- What information does axe help identify, and what must still be evaluated manually?
- How does the form preserve recovery information without moving focus unexpectedly?
- What would change for persisted user workflows, authentication, screen-reader testing, device/browser coverage, and formal conformance work?

## Explicit boundary

This project demonstrates selected semantic, keyboard, feedback, responsive, and automated-regression patterns. It does **not** claim client work, a backend, persistence, authentication, integration, formal WCAG/Section 508 conformance, or a full manual accessibility audit.
