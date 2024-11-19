import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "@testing-library/react";
import { CARD_NUMBER_FRAME } from "../src/config/config";

import { CardNumber } from "../src/components/CardNumber";

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

it("renders the card number placeholder with injected class name", () => {
  act(() => {
    root?.render(<CardNumber className="example" />);
  });
  expect((container?.firstChild as HTMLElement).className).toEqual(
    `${CARD_NUMBER_FRAME} example`
  );
});
