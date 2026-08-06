import { HTMLInputTypeAttribute } from 'react';
import { KeyValuePair } from '../../../hooks/useFormValidation';
import { IconName } from '../../../types/enums';
import { InputMode } from '../../../types/types';
import { paymentMethodsValues } from '../apiConstants';

export type PaymentMethods =
  (typeof paymentMethodsValues)[keyof typeof paymentMethodsValues];

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

export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface Payment {
  method: PaymentMethods;
  paidAt: Date;
  status: PaymentStatus;
}
