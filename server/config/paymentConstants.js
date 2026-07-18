export const PAYMENT_METHODS = [
  {
    id: 'visa',
    label: 'Visa',
    icon: 'visa',
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
    fields: [
      {
        name: 'phoneNumber',
        label: 'Phone number',
        type: 'tel',
      },
    ],
  },
];

export const ALLOWED_PAYMENT_METHODS = PAYMENT_METHODS.map(({ id }) => id);

export const VALIDATING_PAYMENT_METHODS = {
  Visa: 'Visa',
  PAYPAL: 'PayPal',
  MOBILEPAY: 'MobilePay',
  Mastercard: 'Mastercard',
};

export const PAYMENT_STATUS_ENUM = ['PENDING', 'FAILED', 'PAID'];

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  PAID: 'PAID',
};
