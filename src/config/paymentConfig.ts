import { HTMLInputTypeAttribute } from 'react';
import { PaymentMethods1 } from '../app/api/apiTypes/cartApiTypes';
import { IconName } from '../types/enums';
import { InputMode } from '../types/types';

export interface PaymentMethodField1 {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  inputMode?: InputMode;
}

interface PaymentMethodConfig {
  fields: PaymentMethodField1[];
  icon: IconName;
  id: PaymentMethods1;
  label: string;
}

const cardFields: PaymentMethodField1[] = [
  {
    name: 'card',
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
