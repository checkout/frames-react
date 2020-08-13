import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { CVV_FRAME } from '../config/config';

import { Cvv } from '../index';

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

it('renders cvv placeholder with injected class name', () => {
    act(() => {
        render(<Cvv className="example" />, container);
    });
    expect(container.firstChild.className).toEqual(`${CVV_FRAME} example`);
});
