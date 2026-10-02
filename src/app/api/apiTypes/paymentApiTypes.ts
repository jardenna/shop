import { HTMLInputTypeAttribute } from 'react';
import { CurrencyCode } from '../../../features/currency/currencyConverterUtil';
import { KeyValuePair } from '../../../hooks/useFormValidation';
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

export interface Payment {
  currency: CurrencyCode;
  method: PaymentMethods;
  paidAt: Date;
  status: PaymentStatus;
}

export interface PayOrderRequest {
  cardholderName: string;
  cardNumber: string;
  currency: CurrencyCode;
  cvvCode: string;
  expiryDate: string;
  method: PaymentMethods;
  mobilePhoneNumber: string;
  orderId: string;
  paypalEmail: string;
  paypalPassword: string;
}

export type ValidatePayment = PaymentFormValues;

export type PaymentStatus = 'completed' | 'pending' | 'failed';
