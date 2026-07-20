export const PAYMENT_METHOD_TYPES = {
  CARD: 'card',
  WALLET: 'wallet',
  MOBILE: 'mobile',
};

export const PAYMENT_METHODS = [
  {
    id: 'visa',
    label: 'Visa',
    icon: 'visa',
    type: PAYMENT_METHOD_TYPES.CARD,
    fields: [
      {
        name: 'cardNumber',
        label: 'Card number',
        type: 'text',
      },
      {
        name: 'expiryDate',
        label: 'Expiry date',
        type: 'text',
      },
      {
        name: 'cvvCode',
        label: 'Security code',
        type: 'password',
      },
      {
        name: 'cardholderName',
        label: 'Cardholder name',
        type: 'text',
      },
    ],
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: 'mastercard',
    type: PAYMENT_METHOD_TYPES.CARD,
    fields: [
      {
        name: 'cardNumber',
        label: 'Card number',
        type: 'text',
      },
      {
        name: 'expiryDate',
        label: 'Expiry date',
        type: 'text',
      },
      {
        name: 'cvvCode',
        label: 'Security code',
        type: 'password',
      },
      {
        name: 'cardholderName',
        label: 'Cardholder name',
        type: 'text',
      },
    ],
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: 'paypal',
    type: PAYMENT_METHOD_TYPES.WALLET,
    fields: [
      {
        name: 'paypalEmail',
        label: 'Email',
        type: 'email',
      },
      {
        name: 'paypalPassword',
        label: 'Password',
        type: 'password',
      },
    ],
  },
  {
    id: 'mobilepay',
    label: 'MobilePay',
    icon: 'mobilepay',
    type: PAYMENT_METHOD_TYPES.MOBILE,
    fields: [
      {
        name: 'phoneNumber',
        label: 'Phone number',
        type: 'tel',
      },
    ],
  },
];

export const ALLOWED_PAYMENT_METHODS = [
  'visa',
  'payPal',
  'mobilePay',
  'mastercard',
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
