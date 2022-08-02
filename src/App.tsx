import React from 'react';
import { Frames, CardNumber, ExpiryDate, Cvv, CardFrame } from './frames';

import './App.css';

function App() {
    return (
        <div className="App">
            <Frames
                config={{
                    debug: true,
                    publicKey: 'pk_test_6e40a700-d563-43cd-89d0-f9bb17d35e73',
                    modes: ['cvv_optional'],
                    acceptedPaymentMethods: [
                        'Visa',
                        'Maestro',
                        'Mastercard',
                        'American Express',
                        'Diners Club',
                        'Discover',
                        'JCB',
                        'Mada',
                    ],
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
                paymentMethodChanged={(e) => {
                    console.log('EEEE', e);
                }}
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

                {/* Or if you want to   use single frames: */}
                {/* <CardFrame /> */}

                <button
                    id="pay-button"
                    onClick={() => {
                        Frames.submitCard();
                    }}
                >
                    PAY GBP 25.00
                </button>
            </Frames>
        </div>
    );
}

export default App;
