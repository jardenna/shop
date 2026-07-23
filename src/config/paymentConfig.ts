import { HTMLInputTypeAttribute } from 'react';
import { PaymentMethods1 } from '../app/api/apiTypes/cartApiTypes';
import { IconName } from '../types/enums';

export interface PaymentMethodField {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  inputMode?: string | null;
}

interface PaymentMethodConfig {
  fields: PaymentMethodField[];
  icon: IconName;
  id: PaymentMethods1;
  label: string;
}

const cardFields = [
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

export const paymentMethodsList: PaymentMethodConfig[] = [
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
