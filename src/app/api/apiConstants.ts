export const roleValues = ['Employee', 'User'] as const;
export const statusValues = ['Published', 'Inactive', 'Scheduled'] as const;
export const mainCategoryValues = ['Men', 'Women', 'Kids'] as const;
export const subCategoryValues = ['Shoes', 'Accessories', 'Clothing'] as const;

export const paymentMethodLabels = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  paypal: 'PayPal',
  mobilepay: 'MobilePay',
} as const;

export const paymentMethodFilterValues = [
  paymentMethodLabels.visa,
  paymentMethodLabels.mastercard,
  paymentMethodLabels.paypal,
  paymentMethodLabels.mobilepay,
] as const;

export const paymentMethodsValues = {
  visa: 'visa',
  mastercard: 'mastercard',
  paypal: 'paypal',
  mobilepay: 'mobilepay',
} as const;
