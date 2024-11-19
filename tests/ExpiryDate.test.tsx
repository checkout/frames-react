import React from "react";
import { act } from "@testing-library/react";
import { createRoot, Root } from "react-dom/client"; // Correct import
import { ExpiryDate } from "../src/components/ExpiryDate";
import { EXPIRY_DATE_FRAME } from "../src/config/config";

let container: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (root && container) {
    act(() => {
      root!.unmount();
    });
    container.remove();
    container = null;
    root = null;
  }
});

it("renders expiry date placeholder with injected class name", async () => {
  await act(async () => {
    if (root) {
      root.render(<ExpiryDate className="example" />);
    } else {
      throw new Error("Root is null");
    }
  });

  const firstChild = container?.firstChild as HTMLElement | null;
  if (firstChild) {
    expect(firstChild.className).toEqual(`${EXPIRY_DATE_FRAME} example`);
  } else {
    throw new Error("First child is null");
  }
});
