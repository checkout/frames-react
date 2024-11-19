import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Frames, CardNumber, ExpiryDate, Cvv } from "../src/index";

afterEach(cleanup);

it("renders Frames component", () => {
  const { container } = render(
    <Frames
      config={{
        debug: true,
        publicKey: "pk_test_6e40a700-d563-43cd-89d0-f9bb17d35e73",
        localization: {
          cardNumberPlaceholder: "Card number",
          expiryMonthPlaceholder: "MM",
          expiryYearPlaceholder: "YY",
          cvvPlaceholder: "CVV",
        },
        style: {
          base: {
            fontSize: "17px",
          },
        },
      }}
      ready={() => {}}
      frameActivated={(e: any) => {}}
      frameFocus={(e: any) => {}}
      frameBlur={(e: any) => {}}
      frameValidationChanged={(e: any) => {}}
      paymentMethodChanged={(e: any) => {}}
      cardValidationChanged={(e: any) => {}}
      cardSubmitted={() => {}}
      cardTokenized={(e: any) => {
        alert(e.token);
      }}
      cardTokenizationFailed={(e: any) => {}}
      cardBinChanged={(e: any) => {}}
    >
      <CardNumber />
      <div className="date-and-code">
        <ExpiryDate />
        <Cvv />
      </div>
    </Frames>
  );

  expect(container).not.toBeNull();
});
