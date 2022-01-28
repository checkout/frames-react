"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@testing-library/react");
var index_1 = require("../index");
afterEach(react_2.cleanup);
it('trows error when the CDN is not included', function () {
    var container = react_2.render(react_1.default.createElement("div", null,
        react_1.default.createElement("script", { src: "https://cdn.checkout.com/js/framesv2.min.js" }),
        setTimeout(function () { return (react_1.default.createElement(index_1.Frames, { config: {
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
            }, ready: function () { }, frameActivated: function (e) { }, frameFocus: function (e) { }, frameBlur: function (e) { }, frameValidationChanged: function (e) { }, paymentMethodChanged: function (e) { }, cardValidationChanged: function (e) { }, cardSubmitted: function () { }, cardTokenized: function (e) {
                alert(e.token);
            }, cardTokenizationFailed: function (e) { }, cardBinChanged: function (e) { } },
            react_1.default.createElement(index_1.CardNumber, null),
            react_1.default.createElement("div", { className: "date-and-code" },
                react_1.default.createElement(index_1.ExpiryDate, null),
                react_1.default.createElement(index_1.Cvv, null)),
            "x")); }, 3000))).container;
});
//# sourceMappingURL=frames.test.js.map