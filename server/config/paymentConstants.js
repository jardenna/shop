export const PAYMENT_METHODS = Object.freeze({
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  PAYPAL: 'paypal',
  MOBILEPAY: 'mobilepay',
});

export const ALLOWED_PAYMENT_METHODS = Object.values(PAYMENT_METHODS);
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

export const PAYMENT_STATUS_ENUM = Object.values(PAYMENT_STATUS);
export const DELIVERY_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
};

export const DELIVERY_STATUS_ENUM = Object.values(DELIVERY_STATUS);

export const PAYMENT_METHODS1 = ['visa', 'paypal', 'mobilepay', 'mastercard'];
