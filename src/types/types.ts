import React from "react";
import { ReactNode } from "react";

export interface FramesEvents {
  READY: "ready";
  FRAME_ACTIVATED: "frameActivated";
  FRAME_FOCUS: "frameFocus";
  FRAME_BLUR: "frameBlur";
  FRAME_VALIDATION_CHANGED: "frameValidationChanged";
  PAYMENT_METHOD_CHANGED: "paymentMethodChanged";
  CARD_VALIDATION_CHANGED: "cardValidationChanged";
  CARD_SUBMITTED: "cardSubmitted";
  CARD_TOKENIZED: "cardTokenized";
  CARD_TOKENIZATION_FAILED: "cardTokenizationFailed";
}

export interface FramesLocalization {
  cardNumberPlaceholder: string;
  expiryMonthPlaceholder: string;
  expiryYearPlaceholder: string;
  cvvPlaceholder: string;
  cardSchemeLink?: string;
  cardSchemeHeader?: string;
}

export type FramesLanguages =
  | "AR"
  | "ZH-CH"
  | "ZH-HK"
  | "ZH-TW"
  | "DA-DK"
  | "NL-NL"
  | "EN-GB"
  | "FIL-PH"
  | "FI-FI"
  | "FR-FR"
  | "DE-DE"
  | "HI-IN"
  | "ID-ID"
  | "IT-IT"
  | "JA-JP"
  | "KO-KR"
  | "MS-MY"
  | "NB-NO"
  | "ES-ES"
  | "SV-SE"
  | "TH-TH"
  | "VI-VN";

export type FrameElementIdentifer = "card-number" | "expiry-date" | "cvv";

export type PaymentMethod =
  | "Visa"
  | "Mastercard"
  | "American Express"
  | "Diners Club"
  | "Maestro"
  | "Discover";

export type Scheme =
  | "Visa"
  | "Mastercard"
  | "AMERICAN EXPRESS"
  | "Diners Club International"
  | "Maestro"
  | "Discover";

export type CardType = "Credit" | "Debit" | "Prepaid" | "Charge";
export type PreferredScheme = "mastercard" | "visa" | "cartes_bancaires";
export type CardCategory = "Consumer" | "Commercial";

export interface FramesStyle {
  base?: React.CSSProperties;
  valid?: React.CSSProperties;
  invalid?: React.CSSProperties;
  focus?: React.CSSProperties;
  placeholder?: {
    base?: React.CSSProperties;
    valid?: React.CSSProperties;
    invalid?: React.CSSProperties;
    focus?: React.CSSProperties;
  };
}

export interface FramesBillingAddress {
  addressLine1?: string;
  addressLine2?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface GatewayBillingAddress {
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface GatewayPhone {
  number?: string;
}

export interface FramesCardholder {
  name?: string | null;
  billingAddress?: FramesBillingAddress | null;
  phone?: string | null;
}

export interface SelectorChoiceType {
  frameSelector: string;
}

export interface FramesInitProps {
  debug?: boolean;
  publicKey: string;
  namespace?: string;
  frameSelector?: null;
  style?: FramesStyle;
  name?: string;
  acceptedPaymentMethods?: Array<string>;
  cardholder?: FramesCardholder;
  localization?: FramesLanguages | FramesLocalization;
  modes?: Array<String>;
  schemeChoice?: SelectorChoiceType | boolean;
  cardNumber?: SelectorChoiceType;
  expiryDate?: SelectorChoiceType;
  cvv?: SelectorChoiceType;
}

export interface FrameElement {
  element: FrameElementIdentifer;
}

export interface FramesElementsValidity {
  cardNumber: boolean;
  expiryDate: boolean;
  cvv: boolean;
}

export interface FrameCardValidationChangedEvent {
  isValid: boolean;
  isElementValid: FramesElementsValidity;
}

export interface FrameValidationChangedEvent {
  element: FrameElementIdentifer;
  isValid: boolean;
  isEmpty: boolean;
}

export interface FramePaymentMethodChangedEvent {
  isValid: boolean;
  paymentMethod: PaymentMethod;
  isPaymentMethodAccepted?: boolean;
}

export interface FrameCardTokenizedEvent {
  type: string;
  token: string;
  expires_on: string;
  expiry_month: string;
  expiry_year: string;
  scheme?: Scheme;
  scheme_local: string;
  last4: string;
  preferred_scheme?: PreferredScheme;
  bin: string;
  card_type?: CardType;
  card_category?: CardCategory;
  issuer?: string;
  issuer_country?: string;
  product_id?: string;
  product_type?: string;
  billing_address?: GatewayBillingAddress;
  phone?: GatewayPhone;
  name?: GatewayBillingAddress;
}

export interface FrameCardTokenizationFailedEvent {
  errorCode: string;
  message: string;
}

export interface FrameCardBinChangedEvent {
  bin: string;
  scheme: string;
}

export interface FramesProps {
  children?: ReactNode;
  config: FramesInitProps;
  /**
   * Triggered when Frames is registered on the global namespace and safe to use.
   *
   * @memberof FramesProps
   */
  ready?: () => void;

  /**
   * Triggered when the form is rendered.
   *
   * @memberof FramesProps
   */
  frameActivated?: (e: FrameElement) => void;

  /**
   * Triggered when an input field receives focus. Use it to check the validation status and apply the wanted UI changes.
   *
   * @memberof FramesProps
   */
  frameFocus?: (e: FrameElement) => void;

  /**
   * Triggered after an input field loses focus. Use it to check the validation status and apply the wanted UI changes.
   *
   * @memberof FramesProps
   */
  frameBlur?: (e: FrameElement) => void;

  /**
   * Triggered when a field's validation status has changed. Use it to show error messages or update the UI.
   *
   * @memberof FramesProps
   */
  frameValidationChanged?: (e: FrameValidationChangedEvent) => void;

  /**
   * Triggered when a valid payment method is detected based on the card number being entered. Use this event to change the card icon.
   *
   * @memberof FramesProps
   */
  paymentMethodChanged?: (e: FramePaymentMethodChangedEvent) => void;

  /**
   * Triggered when the state of the card validation changes.
   *
   * @memberof FramesProps
   */
  cardValidationChanged?: (e: FrameCardValidationChangedEvent) => void;

  /**
   * Triggered when the card form has been submitted.
   *
   * @memberof FramesProps
   */
  cardSubmitted?: () => void;

  /**
   * Triggered after a card is tokenized.
   *
   * @memberof FramesProps
   */
  cardTokenized?: (e: FrameCardTokenizedEvent) => void;

  /**
   * Triggered if the card tokenization fails.
   *
   * @memberof FramesProps
   */
  cardTokenizationFailed?: (e: FrameCardTokenizationFailedEvent) => void;

  /**
   * Triggered when the user inputs or changes the first 8 digits of a card.
   *
   * @memberof FramesProps
   */
  cardBinChanged?: (e: FrameCardBinChangedEvent) => void;
}

export interface FramesAppendedProps extends FramesProps {
  Events: FramesEvents;
  cardholder: FramesCardholder;
  init: (props?: FramesInitProps) => void;
  isCardValid: (props?: FramesProps) => boolean;
  submitCard: (props?: FramesProps) => Promise<FrameCardTokenizedEvent>;
  addEventHandler: (
    event: FramesEvents[keyof FramesEvents],
    eventHandler: (event: any) => void
  ) => void;
  removeEventHandler: (
    event: FramesEvents[keyof FramesEvents],
    eventHandler: (event: any) => void
  ) => boolean;
  removeAllEventHandlers: (event: FramesEvents[keyof FramesEvents]) => boolean;
  enableSubmitForm: (props?: FramesProps) => void;
}
