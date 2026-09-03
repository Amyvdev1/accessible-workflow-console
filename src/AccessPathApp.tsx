import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type RequestStatus = "New" | "In review" | "Ready";

type WorkRequest = {
  id: string;
  title: string;
  owner: string;
  status: RequestStatus;
  priority: "Standard" | "High";
};

const initialRequests: WorkRequest[] = [
  { id: "REQ-108", title: "Review service update", owner: "Amy V.", status: "In review", priority: "High" },
  { id: "REQ-109", title: "Confirm handoff details", owner: "M. Kim", status: "New", priority: "Standard" },
  { id: "REQ-110", title: "Publish approved notice", owner: "J. Torres", status: "Ready", priority: "Standard" },
];

const statuses: RequestStatus[] = ["New", "In review", "Ready"];

export function AccessPathApp() {
  const [requests, setRequests] = useState<WorkRequest[]>(initialRequests);
  const [selectedId, setSelectedId] = useState(initialRequests[0].id);
  const [requestTitle, setRequestTitle] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("3 requests available. Select a request to view details.");

  const selected = useMemo(
    () => requests.find((request) => request.id === selectedId) ?? requests[0],
    [requests, selectedId],
  );

  const moveSelected = () => {
    if (!selected) return;
    const currentIndex = statuses.indexOf(selected.status);
    const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];
    if (nextStatus === selected.status) {
      setMessage(`${selected.id} is already ready for handoff.`);
      return;
    }
    setRequests((current) => current.map((request) => request.id === selected.id ? { ...request, status: nextStatus } : request));
    setMessage(`${selected.id} moved to ${nextStatus}.`);
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = requestTitle.trim();
    if (title.length < 4) {
      setError("Enter a request name with at least 4 characters.");
      setMessage("The new request could not be added. Review the form error.");
      return;
    }
    const id = `REQ-${111 + requests.length}`;
    const newRequest: WorkRequest = { id, title, owner: "Amy V.", status: "New", priority: "Standard" };
    setRequests((current) => [...current, newRequest]);
    setSelectedId(id);
    setRequestTitle("");
    setError("");
    setMessage(`${id} created and selected. It is ready for review.`);
  };

  return (
    <div className="accesspath-shell">
      <a className="skip-link" href="#workspace">Skip to workspace</a>
      <header className="app-header">
        <a href="#top" className="wordmark" aria-label="AccessPath Console home">
          <span aria-hidden="true">AP</span>
          <strong>AccessPath</strong>
          <em>workflow console</em>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#workspace" aria-current="page">Workspace</a>
          <a href="#practice-notes">Practice notes</a>
          <a href="https://github.com/Amyvdev1/accessible-workflow-console" target="_blank" rel="noreferrer">Source</a>
        </nav>
      </header>

      <main id="workspace" tabIndex={-1}>
        <section className="hero" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">PERSONAL ACCESSIBILITY PRACTICE</p>
            <h1 id="page-title">A clear next step,<br /><em>for every user.</em></h1>
            <p className="hero-copy">A self-directed React and TypeScript workboard built to practice semantic structure, keyboard-operable controls, visible focus, labelled forms, status announcements, responsive layouts, and automated accessibility checks.</p>
          </div>
          <div className="hero-note" aria-label="Project boundaries">
            <span>ACCESSIBILITY NOTE</span>
            <p>This is a learning artifact. It documents practical implementation choices; it does not claim federal Section 508 certification or WCAG conformance.</p>
          </div>
        </section>

        <section className="workspace" aria-labelledby="workspace-title">
          <header className="workspace-heading">
            <div>
              <p className="eyebrow">REQUEST WORKSPACE</p>
              <h2 id="workspace-title">Make status visible.</h2>
            </div>
            <p>Use buttons, not drag-and-drop, to keep the central workflow usable with keyboard and assistive technology.</p>
          </header>

          <div className="workspace-grid">
            <section className="request-board" aria-label="Requests by status">
              {statuses.map((status) => {
                const requestsForStatus = requests.filter((request) => request.status === status);
                return (
                  <section className="request-column" key={status} aria-labelledby={`status-${status.replaceAll(" ", "-")}`}>
                    <header>
                      <h3 id={`status-${status.replaceAll(" ", "-")}`}>{status}</h3>
                      <span aria-label={`${requestsForStatus.length} requests`}>{requestsForStatus.length}</span>
                    </header>
                    <ul>
                      {requestsForStatus.map((request) => (
                        <li key={request.id}>
                          <button
                            type="button"
                            className={request.id === selectedId ? "request-card selected" : "request-card"}
                            onClick={() => {
                              setSelectedId(request.id);
                              setMessage(`${request.id} selected. ${request.status} status.`);
                            }}
                            aria-pressed={request.id === selectedId}
                          >
                            <span className={`priority ${request.priority === "High" ? "high" : ""}`}>{request.priority}</span>
                            <strong>{request.title}</strong>
                            <small>{request.id} · Owner: {request.owner}</small>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </section>

            <div className="request-detail" aria-labelledby="request-detail-title">
              {selected && <>
                <p className="eyebrow">SELECTED REQUEST</p>
                <h3 id="request-detail-title">{selected.title}</h3>
                <dl>
                  <div><dt>Request ID</dt><dd>{selected.id}</dd></div>
                  <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
                  <div><dt>Current status</dt><dd>{selected.status}</dd></div>
                  <div><dt>Priority</dt><dd>{selected.priority}</dd></div>
                </dl>
                <p className="detail-copy">The selected request keeps its identifier, owner, priority, and status in a predictable information order.</p>
                <button type="button" className="primary-action" onClick={moveSelected}>
                  Move to next status
                </button>
              </>}
            </div>
          </div>
          <p className="status-message" role="status" aria-live="polite">{message}</p>
        </section>

        <section className="request-form-section" aria-labelledby="new-request-title">
          <div>
            <p className="eyebrow">FORM PATTERN</p>
            <h2 id="new-request-title">Start with a named input.</h2>
            <p>A label stays visible, an error is programmatically associated with the input, and the submission result is announced without moving the user unexpectedly.</p>
          </div>
          <form noValidate onSubmit={submitRequest}>
            <label htmlFor="request-title">Request name</label>
            <input
              id="request-title"
              name="request-title"
              value={requestTitle}
              onChange={(event) => {
                setRequestTitle(event.target.value);
                if (error) setError("");
              }}
              aria-describedby={error ? "request-title-error request-title-help" : "request-title-help"}
              aria-invalid={Boolean(error)}
              placeholder="e.g., Review service update"
            />
            <p id="request-title-help" className="help-text">Use at least 4 characters. The request will begin in the New status.</p>
            {error && <p id="request-title-error" className="error-text" role="alert">{error}</p>}
            <button type="submit" className="primary-action">Create request</button>
          </form>
        </section>

        <section id="practice-notes" className="practice-notes" aria-labelledby="practice-title">
          <div>
            <p className="eyebrow">IMPLEMENTATION NOTES</p>
            <h2 id="practice-title">What this code sample practices.</h2>
          </div>
          <div className="practice-grid">
            <article><span>01</span><h3>Semantic landmarks</h3><p>Header, navigation, main content, labelled sections, lists, headings, and descriptions give the page a navigable structure.</p></article>
            <article><span>02</span><h3>Keyboard-first controls</h3><p>Requests and workflow changes use native buttons, so they operate with keyboard focus and expected browser behavior.</p></article>
            <article><span>03</span><h3>Visible focus</h3><p>Every link, input, and button has a strong focus treatment that remains visible against the interface background.</p></article>
            <article><span>04</span><h3>Form feedback</h3><p>Validation uses an associated error message, <code>aria-invalid</code>, and an alert role for clear recovery guidance.</p></article>
            <article><span>05</span><h3>Status updates</h3><p>A polite live region announces selection, state changes, and form completion without forcing focus away from the active control.</p></article>
            <article><span>06</span><h3>Automated checks</h3><p>The repository includes an axe-based automated test as a regression signal, not a substitute for manual accessibility review.</p></article>
          </div>
        </section>
      </main>

      <footer>
        <span>PERSONAL CODE SAMPLE · AMY VILLA</span>
        <span>REACT · TYPESCRIPT · ACCESSIBILITY PRACTICE</span>
      </footer>
    </div>
  );
}
