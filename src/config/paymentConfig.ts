import {
  PaymentMethod,
  PaymentMethodField,
} from '../app/api/apiTypes/paymentApiTypes';
import { IconName } from '../types/enums';

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
    icon: IconName.Visa,
    fields: cardFields,
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: IconName.Mastercard,
    fields: cardFields,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: IconName.PayPal,
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
    icon: IconName.MobilePay,
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
