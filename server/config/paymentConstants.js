export const PAYMENT_METHODS = Object.freeze({
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  PAYPAL: 'paypal',
  MOBILEPAY: 'mobilepay',
});

export const PAYMENT_METHODS_LIST = Object.values(PAYMENT_METHODS);

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

export const PAYMENT_STATUS_ENUM = Object.values(PAYMENT_STATUS);

export const PAYMENT_FIELDS = Object.freeze({
  CARD_NUMBER: 'cardNumber',
  EXPIRY_DATE: 'expiryDate',
  CVV_CODE: 'cvvCode',
  CARDHOLDER_NAME: 'cardholderName',
  PAYPAL_EMAIL: 'paypalEmail',
  PAYPAL_PASSWORD: 'paypalPassword',
  MOBILE_PHONE_NUMBER: 'mobilePhoneNumber',
});

export const DELIVERY_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
};

export const DELIVERY_STATUS_ENUM = Object.values(DELIVERY_STATUS);
