import type {
  PaymentMethodField,
  PaymentMethods,
} from '../app/api/apiTypes/paymentApiTypes';
import type { IconNameValue } from '../types/types';

interface PaymentMethod {
  fields: PaymentMethodField[];
  icon: IconNameValue;
  id: PaymentMethods;
  label: string;
}

const cardFields: PaymentMethodField[] = [
  {
    name: 'cardNumber',
    label: 'cardTestNumber',
    type: 'text',
  },
  {
    name: 'expiryDate',
    label: 'expiryDate',
    type: 'text',
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
  },
];

export const paymentMethodsList: PaymentMethod[] = [
  {
    id: 'visa',
    label: 'Visa',
    icon: 'visa',
    fields: cardFields,
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: 'mastercard',
    fields: cardFields,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: 'payPal',
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
      },
    ],
  },
  {
    id: 'mobilepay',
    label: 'MobilePay',
    icon: 'mobilePay',
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
