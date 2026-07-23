export const PAYMENT_METHOD_TYPES = {
  CARD: 'card',
  WALLET: 'wallet',
  MOBILE: 'mobile',
};

const CARD_FIELDS = [
  {
    name: 'card',
    label: 'cardTestNumber',
    type: 'text',
    inputMode: null,
  },
  {
    name: 'expiryDate',
    label: 'expiryDate',
    type: 'text',
    inputMode: null,
  },
  {
    name: 'cvvCode',
    label: 'securityCode',
    type: 'password',
    inputMode: 'numeric',
  },
  {
    name: 'cardholderName',
    label: 'cardholderName',
    type: 'text',
    inputMode: null,
  },
];

export const PAYMENT_METHODS = [
  {
    id: 'visa',
    label: 'Visa',
    icon: 'visa',
    type: PAYMENT_METHOD_TYPES.CARD,
    fields: CARD_FIELDS,
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: 'mastercard',
    type: PAYMENT_METHOD_TYPES.CARD,
    fields: CARD_FIELDS,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: 'payPal',
    type: PAYMENT_METHOD_TYPES.WALLET,
    fields: [
      {
        name: 'paypalEmail',
        label: 'email',
        type: 'email',
        inputMode: 'email',
      },
      {
        name: 'paypalPassword',
        label: 'password',
        type: 'password',
        inputMode: null,
      },
    ],
  },
  {
    id: 'mobilepay',
    label: 'MobilePay',
    icon: 'mobilePay',
    type: PAYMENT_METHOD_TYPES.MOBILE,
    fields: [
      {
        name: 'mobilePhoneNumber',
        label: 'mobilePhoneNumber',
        type: 'tel',
        inputMode: 'numeric',
      },
    ],
  },
];

export const ALLOWED_PAYMENT_METHODS = [
  'Visa',
  'PayPal',
  'MobilePay',
  'Mastercard',
];

export const VALIDATING_PAYMENT_METHODS = Object.freeze(
  Object.fromEntries(
    PAYMENT_METHODS.map(({ id, label }) => [id.toUpperCase(), label]),
  ),
);

export const PAYMENT_STATUS_ENUM = ['PENDING', 'FAILED', 'PAID'];

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  PAID: 'PAID',
};

export const DELIVERY_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
};

export const DELIVERY_STATUS_ENUM = Object.values(DELIVERY_STATUS);
