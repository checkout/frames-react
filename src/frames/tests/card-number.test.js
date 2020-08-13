import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { CARD_NUMBER_FRAME } from '../config/config';

import { CardNumber } from '../index';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders the card number placeholder with injected class name', () => {
    act(() => {
        render(<CardNumber className="example" />, container);
    });
    expect(container.firstChild.className).toEqual(`${CARD_NUMBER_FRAME} example`);
});
