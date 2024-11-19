import React, { Component } from "react";
import {
  FramesProps,
  FramesAppendedProps,
  FramesEvents,
  FramesInitProps,
} from "../types/types";
import { CDN } from "../config/config";

// Ensure global definition
declare global {
  interface Window {
    Frames: FramesAppendedProps | undefined;
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
      (async () => {
        try {
          await this.loadScript();
          this.initializeFrames();
        } catch (error: any) {
          throw new Error(error);
        }
      })();
    } else {
      this.initializeFrames();
    }
  }

  shouldComponentUpdate(nextProps: FramesProps) {
    if (typeof window !== "undefined" && window.Frames) {
      const frames = window.Frames; // Type guard
      if (nextProps.config.cardholder && nextProps.config.cardholder.name) {
        frames.cardholder.name = nextProps.config.cardholder.name;
      }
      if (
        nextProps.config.cardholder &&
        nextProps.config.cardholder.billingAddress
      ) {
        frames.cardholder.billingAddress =
          nextProps.config.cardholder.billingAddress;
      }
      if (nextProps.config.cardholder && nextProps.config.cardholder.phone) {
        frames.cardholder.phone = nextProps.config.cardholder.phone;
      }
    }
    return true;
  }

  loadScript = () => {
    if (typeof window === "undefined") return;
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement("script");
      scriptTag.src = CDN;
      scriptTag.onload = (ev) => resolve(ev);
      scriptTag.onerror = (err) => reject(err);
      document.body.appendChild(scriptTag);
    });
  };

  initializeFrames = () => {
    let config = {
      publicKey: this.props.config.publicKey,
      debug: this.props.config.debug || false,
      style: this.props.config.style,
      acceptedPaymentMethods: this.props.config.acceptedPaymentMethods,
      cardholder: this.props.config.cardholder,
      localization: this.props.config.localization,
      modes: this.props.config.modes,
      schemeChoice: this.props.config.schemeChoice,
      cardNumber: this.props.config.cardNumber,
      expiryDate: this.props.config.expiryDate,
      cvv: this.props.config.cvv,
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
      cardBinChanged: this.props.cardBinChanged,
    };

    // Frames throws an error if the cardholder object is mentioned but not defined
    // To avoid this we remove the property completely if not set as a prop.
    if (!this.props.config.cardholder) {
      delete config.cardholder;
    }

    // Frames throws an error if the schemeChoice object is mentioned but not defined
    // To avoid this we remove the property completely if not set as a prop.
    if (!this.props.config.schemeChoice) {
      delete config.schemeChoice;
    }

    // Frames throws an error if the cardNumber object is mentioned but not defined
    // To avoid this we remove the property completely if not set as a prop.
    if (!this.props.config.cardNumber) {
      delete config.cardNumber;
    }

    // Frames throws an error if the expiryDate object is mentioned but not defined
    // To avoid this we remove the property completely if not set as a prop.
    if (!this.props.config.expiryDate) {
      delete config.expiryDate;
    }

    // Frames throws an error if the cvv object is mentioned but not defined
    // To avoid this we remove the property completely if not set as a prop.
    if (!this.props.config.cvv) {
      delete config.cvv;
    }

    // Frames throws an error if the modes object is mentioned but not defined
    // To avoid this we remove the property completely if not set as a prop.
    if (!this.props.config.modes) {
      delete config.modes;
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
    if (window.Frames) {
      // Check if Frames is defined
      // remove event handlers to avoid event duplication
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_SUBMITTED);
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.CARD_TOKENIZATION_FAILED
      );
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZED);
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.CARD_VALIDATION_CHANGED
      );
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.FRAME_ACTIVATED
      );
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_BLUR);
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_FOCUS);
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.FRAME_VALIDATION_CHANGED
      );
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.PAYMENT_METHOD_CHANGED
      );
      window.Frames.removeAllEventHandlers(window.Frames.Events.READY);
      config ? window.Frames.init(config) : window.Frames.init();
    }
  };

  /**
   * Returns the state of the card form validation.
   *
   * @static
   * @memberof Frames
   * @return {boolean} Card validity
   */
  static isCardValid = () => {
    return window.Frames ? window.Frames.isCardValid() : false;
  };

  /**
   * Submits the card form if all form values are valid.
   *
   * @static
   * @memberof Frames
   * @return {Promise<FrameCardTokenizedEvent>}
   */
  static submitCard = () => {
    return window.Frames
      ? window.Frames.submitCard()
      : Promise.reject("Frames is not defined");
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
  static addEventHandler = (
    event: FramesEvents[keyof FramesEvents],
    handler: () => any
  ) => {
    if (window.Frames) {
      window.Frames.addEventHandler(event, handler);
    }
  };

  /**
   * Removes a previously added handler from an event by providing the event name and handler as arguments in the method.
   *
   * @param {event} string Frames Event
   * @static
   * @memberof Frames
   * @return {void}
   */
  static removeEventHandler = (
    event: FramesEvents[keyof FramesEvents],
    handler: () => any
  ) => {
    if (window.Frames) {
      window.Frames.removeEventHandler(event, handler);
    }
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
    if (window.Frames) {
      window.Frames.removeAllEventHandlers(event);
    }
  };

  /**
   * Retains the entered card details and allows you to resubmit the payment form.
   *
   * @static
   * @memberof Frames
   * @return {void}
   */
  static enableSubmitForm = () => {
    if (window.Frames) {
      window.Frames.enableSubmitForm();
    }
  };

  componentWillUnmount(): void {
    if (window.Frames) {
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_SUBMITTED);
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.CARD_TOKENIZATION_FAILED
      );
      window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZED);
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.CARD_VALIDATION_CHANGED
      );
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.FRAME_ACTIVATED
      );
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_BLUR);
      window.Frames.removeAllEventHandlers(window.Frames.Events.FRAME_FOCUS);
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.FRAME_VALIDATION_CHANGED
      );
      window.Frames.removeAllEventHandlers(
        window.Frames.Events.PAYMENT_METHOD_CHANGED
      );
      window.Frames.removeAllEventHandlers(window.Frames.Events.READY);
    }
  }

  render(): React.ReactNode {
    const { children } = this.props;

    return children;
  }
}
