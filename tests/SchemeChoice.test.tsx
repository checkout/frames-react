import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import { SchemeChoice } from "../src/components/SchemeChoice";

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

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

it("renders SchemeChoice placeholder with injected class name", () => {
  if (root && container) {
    act(() => {
      root!.render(<SchemeChoice className="example" />);
    });

    const firstChild = container.firstChild as HTMLElement | null;
    if (firstChild) {
      expect(firstChild.className).toEqual(`scheme-choice-frame example`);
    } else {
      throw new Error("First child is null");
    }
  } else {
    throw new Error("root or container is null");
  }
});
