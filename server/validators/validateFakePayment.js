import {
  ALLOWED_PAYMENT_METHODS,
  VALIDATING_PAYMENT_METHODS,
} from '../config/constants.js';

const validateFakePayment = ({
  paymentMethod,
  cardNumber,
  expiryDate,
  cvvCode,
  cardholderName,
  paypalEmail,
  paypalPassword,
  phoneNumber,
}) => {
  if (!paymentMethod) {
    return 'Payment method is required';
  }

  if (!ALLOWED_PAYMENT_METHODS.includes(paymentMethod)) {
    return 'Invalid payment method';
  }

  if (paymentMethod === VALIDATING_PAYMENT_METHODS.CREDIT_CARD) {
    const sanitizedCardNumber = cardNumber?.replace(/\s/g, '');

    if (!sanitizedCardNumber || !/^\d{16}$/.test(sanitizedCardNumber)) {
      return 'Invalid card number';
    }

    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return 'Invalid expiry date';
    }

    if (!cvvCode || !/^\d{3,4}$/.test(cvvCode)) {
      return 'Invalid CVV';
    }

    if (!cardholderName?.trim()) {
      return 'Cardholder name is required';
    }
  }

  if (paymentMethod === VALIDATING_PAYMENT_METHODS.PAYPAL) {
    if (!paypalEmail?.trim()) {
      return 'PayPal email is required';
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(paypalEmail)) {
      return 'Invalid PayPal email';
    }

    if (!paypalPassword || paypalPassword.length < 6) {
      return 'Invalid PayPal password';
    }
  }

  if (paymentMethod === VALIDATING_PAYMENT_METHODS.MOBILEPAY) {
    const sanitizedPhoneNumber = phoneNumber?.replace(/\s/g, '');

    if (!sanitizedPhoneNumber || !/^\d{8}$/.test(sanitizedPhoneNumber)) {
      return 'Invalid phone number';
    }
  }

  return null;
};

export { validateFakePayment };
