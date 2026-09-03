import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AccessPathApp } from "./AccessPathApp";
import "./styles.css";

if (import.meta.env.DEV) {
  void import("@axe-core/react").then(({ default: axe }) => {
    axe(React, createRoot, 1000);
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccessPathApp />
  </StrictMode>,
);
