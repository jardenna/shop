import { HTMLInputTypeAttribute } from 'react';
import { KeyValuePair } from '../../../hooks/useFormValidation';
import { IconName } from '../../../types/enums';
import { InputMode } from '../../../types/types';

export const paymentMethods = {
  visa: 'visa',
  mastercard: 'mastercard',
  paypal: 'paypal',
  mobilepay: 'mobilepay',
} as const;

export type PaymentMethods =
  (typeof paymentMethods)[keyof typeof paymentMethods];

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

export interface PaymentFormValues extends KeyValuePair<string> {
  cardholderName: string;
  cardNumber: string;
  cvvCode: string;
  expiryDate: string;
  mobilePhoneNumber: string;
  paymentMethod: PaymentMethods;
  paypalEmail: string;
  paypalPassword: string;
}

export type ValidatePayment = PaymentFormValues;
