# AccessPath Console — Code Tour

AccessPath uses a small in-memory request board to make accessibility-related code paths easy to inspect. It is deliberately a front-end-only project.

## 1. Typed domain state

`src/AccessPathApp.tsx` defines `RequestStatus` and `WorkRequest` types, plus three sample requests. Component state keeps the request list, selected request, input text, validation error, and user-facing announcement separate. That separation keeps render logic simple while making status changes predictable.

## 2. Selection and state progression

A `useMemo` derives the selected request from the current list. `moveSelected` maps a request from `New` to `In review` to `Ready` without progressing beyond the final state. The function also creates a status message stating whether the request moved or is already ready for handoff.

## 3. Form validation and recovery

The creation form trims input, rejects a title under four characters, and retains a visible way to correct the input. When the input is invalid, the control receives `aria-invalid`, points to the relevant help/error content through `aria-describedby`, and renders a `role="alert"` recovery message. On success, the code creates a local request, selects it, clears the input, and announces the result.

## 4. Semantic interface structure

The page includes a skip link, header, labelled navigation, main content, labelled sections, ordered headings, lists, a definition list in the detail panel, and a footer. Requests are native buttons with `aria-pressed` to reflect selection state. This structure favors predictable keyboard behavior instead of recreating native interaction semantics with divs.

## 5. Live status feedback

A polite `role="status"` region receives messages from selection, state movement, successful form submission, and validation failure. This gives assistive-technology users feedback without moving focus away from the task they were completing.

## 6. Visual and responsive layer

`src/styles.css` uses custom properties for surfaces and text, includes `:focus-visible` outlines, reveals the skip link when it receives focus, and reflows the workspace and workboard for narrower screens. Reduced-motion rules limit nonessential animation when users request it.

## 7. Automated checks

`tests/AccessPathApp.test.tsx` contains a focused axe scan, a form-error scenario, and a state-transition announcement scenario. `src/main.tsx` mounts the app in StrictMode and runs `@axe-core/react` in development. Together these provide a small regression layer; they do not establish formal conformance or replace manual testing.

## Deliberate scope

The source proves implementation of these semantic, keyboard, feedback, and automated-check patterns. It does not include a backend, database, persisted user state, authentication, real workflow integration, a complete screen-reader test matrix, or a certification claim.
