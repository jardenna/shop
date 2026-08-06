import { PaymentMethods } from './apiTypes/paymentApiTypes';

export const roleValues = ['Employee', 'User'] as const;

export const statusValues = ['Published', 'Inactive', 'Scheduled'] as const;
export const payValues = ['Visa', 'Mastercard', 'PayPal', 'MobilePay'];
export type PayValue = 'Visa' | 'Mastercard' | 'PayPal' | 'MobilePay';

export const paymentMethodsValues = {
  visa: 'visa',
  mastercard: 'mastercard',
  paypal: 'paypal',
  mobilepay: 'mobilepay',
} as const;

export const paymentMethodLabels: Record<PaymentMethods, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  paypal: 'PayPal',
  mobilepay: 'MobilePay',
};

export const mainCategoryValues = ['Men', 'Women', 'Kids'] as const;

export const subCategoryValues = ['Shoes', 'Accessories', 'Clothing'] as const;
