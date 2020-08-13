import React, { Component } from 'react';

import { FramesProps, FramesAppendedProps, FramesEvents, FramesInitProps } from './types/types';
import { CDN } from './config/config';

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
export class Frames extends Component<FramesProps> {
    componentDidMount(): void {
        const existingScript = document.querySelector(`script[src$="${CDN}"]`);
        if (!existingScript) {
            console.error(
                `Checkout.com CDN not present. Perhaps you forgot to add <script src="${CDN}"></script> to your index.html file.`
            );
        } else {
            this.initializeFrames();
        }
    }

    shouldComponentUpdate(nextProps: FramesProps) {
        if (nextProps.config.cardholder && nextProps.config.cardholder.name) {
            window.Frames.cardholder.name = nextProps.config.cardholder.name;
        }
        if (nextProps.config.cardholder && nextProps.config.cardholder.billingAddress) {
            window.Frames.cardholder.billingAddress = nextProps.config.cardholder.billingAddress;
        }
        if (nextProps.config.cardholder && nextProps.config.cardholder.phone) {
            window.Frames.cardholder.phone = nextProps.config.cardholder.phone;
        }
        return true;
    }

    initializeFrames = () => {
        let config = {
            publicKey: this.props.config.publicKey,
            debug: this.props.config.debug || false,
            style: this.props.config.style,
            cardholder: this.props.config.cardholder,
            localization: this.props.config.localization,
            ready: this.props.ready,
            frameActivated: this.props.frameActivated,
            frameFocus: this.props.frameFocus,
            frameBlur: this.props.frameBlur,
            frameValidationChanged: this.props.frameValidationChanged,
            paymentMethodChanged: this.props.paymentMethodChanged,
            cardValidationChanged: this.props.cardValidationChanged,
            cardSubmitted: this.props.cardSubmitted,
            cardTokenized: this.props.cardTokenized,
            cardTokenizationFailed: this.props.cardTokenizationFailed,
        };

        // Frames throws an error if the cardholder object is mentioned but not defined
        // To avoid this we remove the property completely if not set as a prop.
        if (!this.props.config.cardholder) {
            delete config.cardholder;
        }

        // Frames throws an error if the localization object is mentioned but not defined
        // To avoid this we remove the property completely if not set as a prop.
        if (!this.props.config.localization) {
            delete config.localization;
        }

        try {
            if (window.Frames) {
                window.Frames.init(config);
            } else {
                console.error(
                    `Frames was used before the script (from the CDN) was loaded completely`
                );
            }
        } catch (e) {
            throw e;
        }
    };

    /**
     * Initialize or reinitialize Frames.
     *
     * @param [config] Checkout.From config
     * @static
     * @memberof Frames
     */
    static init = (config?: FramesInitProps) => {
        // remove event handlers to avoid event duplication
        window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_SUBMITTED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZATION_FAILED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_VALIDATION_CHANGED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_ACTIVATED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_BLUR);
        window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_FOCUS);
        window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_VALIDATION_CHANGED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.PAYMENT_METHOD_CHANGED);
        window.Frames.removeAllEventHandlers(window.Frames.Events.READY);
        config ? window.Frames.init(config) : window.Frames.init();
    };

    /**
     * Submits the card form if all form values are valid.
     *
     * @static
     * @memberof Frames
     * @return {void}
     */
    static isCardValid = () => {
        return window.Frames.isCardValid();
    };

    /**
     * Returns the state of the card form validation.
     *
     * @static
     * @memberof Frames
     * @return {boolean} Card validity
     */
    static submitCard = () => {
        window.Frames.submitCard();
    };

    /**
     * Adds a handler that is called when the specified event is triggered.
     *
     * @param {event} string Frames Event
     * @param {handler} function Callback
     * @static
     * @memberof Frames
     * @return {void}
     */
    static addEventHandler = (event: FramesEvents[keyof FramesEvents], handler: () => any) => {
        window.Frames.addEventHandler(event, handler);
    };

    /**
     * Removes a previously added handler from an event by providing the event name and handler as arguments in the method.
     *
     * @param {event} string Frames Event
     * @static
     * @memberof Frames
     * @return {void}
     */
    static removeEventHandler = (event: FramesEvents[keyof FramesEvents], handler: () => any) => {
        window.Frames.removeEventHandler(event, handler);
    };

    /**
     * Removes all handlers added to the event specified.
     *
     * @param {event} string Frames Event
     * @static
     * @memberof Frames
     * @return {void}
     */
    static removeAllEventHandlers = (event: FramesEvents[keyof FramesEvents]) => {
        window.Frames.removeAllEventHandlers(event);
    };

    /**
     * Retains the entered card details and allows you to resubmit the payment form.
     *
     * @static
     * @memberof Frames
     * @return {void}
     */
    static enableSubmitForm = () => {
        window.Frames.enableSubmitForm();
    };

    componentWillUnmount(): void {
        // remove event handlers to avoid event duplication
        if (window.Frames) {
            window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_SUBMITTED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZATION_FAILED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_VALIDATION_CHANGED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_ACTIVATED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_BLUR);
            window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_FOCUS);
            window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_VALIDATION_CHANGED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.PAYMENT_METHOD_CHANGED);
            window.Frames.removeAllEventHandlers(window.Frames.Events.READY);
        }
    }

    render(): React.ReactNode {
        const { children } = this.props;

        return children;
    }
}
