import { HTMLInputTypeAttribute } from 'react';
import { IconName } from '../../../types/enums';
import { InputMode } from '../../../types/types';

export type PaymentMethods = 'visa' | 'paypal' | 'mobilepay' | 'mastercard';
export type PaymentStatus = 'pending' | 'failed' | 'paid';

export type PaymentFieldName =
  | 'cardNumber'
  | 'expiryDate'
  | 'cvvCode'
  | 'cardholderName'
  | 'paypalEmail'
  | 'paypalPassword'
  | 'mobilePhoneNumber';

export interface PaymentMethodField {
  label: string;
  name: PaymentFieldName;
  type: HTMLInputTypeAttribute;
  inputMode?: InputMode;
}

export interface PaymentMethod {
  fields: PaymentMethodField[];
  icon: IconName;
  id: PaymentMethods;
  label: string;
}
