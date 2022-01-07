import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Frames, CardNumber, ExpiryDate, Cvv } from '../index';

afterEach(cleanup);

it('trows error when the CDN is not included', () => {
    const { container } = render(
        <div>
            <script src="https://cdn.checkout.com/js/framesv2.min.js"></script>
            {setTimeout(
                () => (
                    <Frames
                        config={{
                            debug: true,
                            publicKey: 'pk_test_6e40a700-d563-43cd-89d0-f9bb17d35e73',
                            localization: {
                                cardNumberPlaceholder: 'Card number',
                                expiryMonthPlaceholder: 'MM',
                                expiryYearPlaceholder: 'YY',
                                cvvPlaceholder: 'CVV',
                            },
                            style: {
                                base: {
                                    fontSize: '17px',
                                },
                            },
                        }}
                        ready={() => {}}
                        frameActivated={(e) => {}}
                        frameFocus={(e) => {}}
                        frameBlur={(e) => {}}
                        frameValidationChanged={(e) => {}}
                        paymentMethodChanged={(e) => {}}
                        cardValidationChanged={(e) => {}}
                        cardSubmitted={() => {}}
                        cardTokenized={(e) => {
                            alert(e.token);
                        }}
                        cardTokenizationFailed={(e) => {}}
                        cardBinChanged={(e) => {}}
                    >
                        <CardNumber />
                        <div className="date-and-code">
                            <ExpiryDate />
                            <Cvv />
                        </div>
                        x
                    </Frames>
                ),
                3000
            )}
        </div>
    );
});
