"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var config_1 = require("./config/config");
/**
 * Checkout.Frames wrapper
 *
 * @export
 * @class Frames
 * @extends {Component<FramesProps>}
 */
var Frames = /** @class */ (function (_super) {
    __extends(Frames, _super);
    function Frames() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initializeFrames = function () {
            var config = {
                publicKey: _this.props.config.publicKey,
                debug: _this.props.config.debug || false,
                style: _this.props.config.style,
                cardholder: _this.props.config.cardholder,
                localization: _this.props.config.localization,
                ready: _this.props.ready,
                frameActivated: _this.props.frameActivated,
                frameFocus: _this.props.frameFocus,
                frameBlur: _this.props.frameBlur,
                frameValidationChanged: _this.props.frameValidationChanged,
                paymentMethodChanged: _this.props.paymentMethodChanged,
                cardValidationChanged: _this.props.cardValidationChanged,
                cardSubmitted: _this.props.cardSubmitted,
                cardTokenized: _this.props.cardTokenized,
                cardTokenizationFailed: _this.props.cardTokenizationFailed,
                cardBinChanged: _this.props.cardBinChanged,
            };
            // Frames throws an error if the cardholder object is mentioned but not defined
            // To avoid this we remove the property completely if not set as a prop.
            if (!_this.props.config.cardholder) {
                delete config.cardholder;
            }
            // Frames throws an error if the localization object is mentioned but not defined
            // To avoid this we remove the property completely if not set as a prop.
            if (!_this.props.config.localization) {
                delete config.localization;
            }
            try {
                if (window.Frames) {
                    window.Frames.init(config);
                }
                else {
                    console.error("Frames was used before the script (from the CDN) was loaded completely");
                }
            }
            catch (e) {
                throw e;
            }
        };
        return _this;
    }
    Frames.prototype.componentDidMount = function () {
        var existingScript = document.querySelector("script[src$=\"" + config_1.CDN + "\"]");
        if (!existingScript) {
            console.error("Checkout.com CDN not present. Perhaps you forgot to add <script src=\"" + config_1.CDN + "\"></script> to your index.html file.");
        }
        else {
            this.initializeFrames();
        }
    };
    Frames.prototype.shouldComponentUpdate = function (nextProps) {
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
    };
    Frames.prototype.componentWillUnmount = function () {
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
    };
    Frames.prototype.render = function () {
        var children = this.props.children;
        return children;
    };
    /**
     * Initialize or reinitialize Frames.
     *
     * @param [config] Checkout.From config
     * @static
     * @memberof Frames
     */
    Frames.init = function (config) {
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
     * Returns the state of the card form validation.
     *
     * @static
     * @memberof Frames
     * @return {boolean} Card validity
     */
    Frames.isCardValid = function () {
        return window.Frames.isCardValid();
    };
    /**
     * Submits the card form if all form values are valid.
     *
     * @static
     * @memberof Frames
     * @return {Promise<FrameCardTokenizedEvent>}
     */
    Frames.submitCard = function () {
        return window.Frames.submitCard();
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
    Frames.addEventHandler = function (event, handler) {
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
    Frames.removeEventHandler = function (event, handler) {
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
    Frames.removeAllEventHandlers = function (event) {
        window.Frames.removeAllEventHandlers(event);
    };
    /**
     * Retains the entered card details and allows you to resubmit the payment form.
     *
     * @static
     * @memberof Frames
     * @return {void}
     */
    Frames.enableSubmitForm = function () {
        window.Frames.enableSubmitForm();
    };
    return Frames;
}(react_1.Component));
exports.Frames = Frames;
//# sourceMappingURL=Frames.js.map