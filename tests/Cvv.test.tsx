import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "@testing-library/react";
import { CVV_FRAME } from "../src/config/config";
import { Cvv } from "../src/components/Cvv";

let container: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
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

it("renders CVV placeholder with injected class name", async () => {
  const root = createRoot(container!);

  await act(async () => {
    root.render(<Cvv className="example" />);
  });

  const firstChild = container?.firstChild as HTMLElement | null;
  if (firstChild) {
    expect(firstChild.className).toEqual(`${CVV_FRAME} example`);
  } else {
    throw new Error("First child is null");
  }
});
