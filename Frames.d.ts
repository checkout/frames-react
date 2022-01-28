import React, { Component } from 'react';
import { FramesProps, FramesAppendedProps, FramesInitProps } from './types/types';
declare global {
    interface Window {
        Frames: FramesAppendedProps;
    }
}
/**
 * Checkout.Frames wrapper
 *
 * @export
 * @class Frames
 * @extends {Component<FramesProps>}
 */
export declare class Frames extends Component<FramesProps> {
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: FramesProps): boolean;
    initializeFrames: () => void;
    /**
     * Initialize or reinitialize Frames.
     *
     * @param [config] Checkout.From config
     * @static
     * @memberof Frames
     */
    static init: (config?: FramesInitProps | undefined) => void;
    /**
     * Returns the state of the card form validation.
     *
     * @static
     * @memberof Frames
     * @return {boolean} Card validity
     */
    static isCardValid: () => boolean;
    /**
     * Submits the card form if all form values are valid.
     *
     * @static
     * @memberof Frames
     * @return {Promise<FrameCardTokenizedEvent>}
     */
    static submitCard: () => Promise<import("./types/types").FrameCardTokenizedEvent>;
    /**
     * Adds a handler that is called when the specified event is triggered.
     *
     * @param {event} string Frames Event
     * @param {handler} function Callback
     * @static
     * @memberof Frames
     * @return {void}
     */
    static addEventHandler: (event: "ready" | "frameActivated" | "frameFocus" | "frameBlur" | "frameValidationChanged" | "paymentMethodChanged" | "cardValidationChanged" | "cardSubmitted" | "cardTokenized" | "cardTokenizationFailed", handler: () => any) => void;
    /**
     * Removes a previously added handler from an event by providing the event name and handler as arguments in the method.
     *
     * @param {event} string Frames Event
     * @static
     * @memberof Frames
     * @return {void}
     */
    static removeEventHandler: (event: "ready" | "frameActivated" | "frameFocus" | "frameBlur" | "frameValidationChanged" | "paymentMethodChanged" | "cardValidationChanged" | "cardSubmitted" | "cardTokenized" | "cardTokenizationFailed", handler: () => any) => void;
    /**
     * Removes all handlers added to the event specified.
     *
     * @param {event} string Frames Event
     * @static
     * @memberof Frames
     * @return {void}
     */
    static removeAllEventHandlers: (event: "ready" | "frameActivated" | "frameFocus" | "frameBlur" | "frameValidationChanged" | "paymentMethodChanged" | "cardValidationChanged" | "cardSubmitted" | "cardTokenized" | "cardTokenizationFailed") => void;
    /**
     * Retains the entered card details and allows you to resubmit the payment form.
     *
     * @static
     * @memberof Frames
     * @return {void}
     */
    static enableSubmitForm: () => void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
