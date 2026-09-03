# AccessPath Console

**Personal React and TypeScript accessibility-practice code sample by Amy Villa.**

AccessPath Console is a small workflow workboard built to demonstrate practical front-end accessibility implementation. It is not client work, production software, a federal application, or a claim of Section 508 certification or formal WCAG conformance.

## What it practices

- Semantic landmarks, heading order, labelled regions, lists, and descriptions.
- A keyboard-visible **Skip to workspace** link.
- Native buttons for request selection and state changes.
- Strong focus styles designed to remain visible against dark and light surfaces.
- Responsive layout without an interaction that requires drag-and-drop.
- Form labels, input instructions, associated validation errors, `aria-invalid`, and an alert role for error feedback.
- A polite live region that announces selection, workflow-state, and form-submission updates.
- Automated `axe` regression checks in Vitest.
- Development-mode `@axe-core/react` checks to surface common browser issues during local work.

## Intentional boundaries

Accessibility requires more than an automated scan. This code sample demonstrates implementation patterns and an automated regression signal. It does **not** certify compliance with Section 508, WCAG, or a federal contract requirement. Manual testing with keyboard navigation, screen readers, zoom, browser/device combinations, and content review would still be needed for a real product.

## Run locally

```bash
pnpm install
pnpm dev
```

## Test

```bash
pnpm test:run
```

The test suite uses `jest-axe` to detect common automated accessibility violations, verifies the invalid form state, and confirms that a workflow state change is announced.

## Technology

- React
- TypeScript
- Vite
- Vitest
- Testing Library
- jest-axe / axe-core

## Why this exists

This project was created as a focused evidence artifact for front-end roles that mention React, TypeScript, HTML5, CSS3, responsive design, REST/API-adjacent interfaces, and accessibility practice. It should be described exactly as a **self-directed accessibility-practice code sample**.

## Reference material

The Web Content Accessibility Guidelines (WCAG) organize testable accessibility success criteria under four principles: perceivable, operable, understandable, and robust. [W3C WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
