export const paymentMethods = {
  creditCard: 'Credit Card',
  paypal: 'PayPal',
  mobilePay: 'MobilePay',
} as const;

export type PaymentMethod =
  (typeof paymentMethods)[keyof typeof paymentMethods];

export const allowedPaymentMethods = Object.values(paymentMethods);
