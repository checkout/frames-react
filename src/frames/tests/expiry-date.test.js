import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { EXPIRY_DATE_FRAME } from '../config/config';

import { ExpiryDate } from '../index';

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

it('renders expiry date placeholder with injected class name', () => {
    act(() => {
        render(<ExpiryDate className="example" />, container);
    });
    expect(container.firstChild.className).toEqual(`${EXPIRY_DATE_FRAME} example`);
});
