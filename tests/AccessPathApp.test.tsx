import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { expect, test } from "vitest";
import { AccessPathApp } from "../src/AccessPathApp";

test("renders without automated axe violations", async () => {
  const { container } = render(<AccessPathApp />);
  const results = await axe(container);
  expect(results.violations).toEqual([]);
});

test("associates invalid request input with clear recovery guidance", async () => {
  const user = userEvent.setup();
  render(<AccessPathApp />);
  await user.click(screen.getByRole("button", { name: "Create request" }));
  const input = screen.getByLabelText("Request name");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("alert")).toHaveTextContent("at least 4 characters");
});

test("moves a selected request with an announced status update", async () => {
  const user = userEvent.setup();
  render(<AccessPathApp />);
  await user.click(screen.getByRole("button", { name: "Move to next status" }));
  expect(screen.getByRole("status")).toHaveTextContent("REQ-108 moved to Ready");
});
