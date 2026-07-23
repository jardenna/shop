import { PAYMENT_METHODS_LIST } from '../config/paymentConstants.js';

const validateFakePayment = ({
  method: paymentMethod,
  // cardNumber,
  // expiryDate,
  // cvvCode,
  // cardholderName,
  // paypalEmail,
  // paypalPassword,
  // phoneNumber,
}) => {
  if (!paymentMethod) {
    return 'Payment method is required';
  }

  if (!PAYMENT_METHODS_LIST.includes(paymentMethod)) {
    return 'Invalid payment method';
  }

  // if (
  //   paymentMethod === PAYMENT_METHODS.VISA ||
  //   paymentMethod === PAYMENT_METHODS.MASTERCARD
  // ) {
  //   const sanitizedCardNumber = cardNumber?.replace(/\s/g, '');

  //   if (!sanitizedCardNumber || !/^\d{16}$/.test(sanitizedCardNumber)) {
  //     return 'Invalid card number';
  //   }

  //   if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
  //     return 'Invalid expiry date';
  //   }

  //   if (!cvvCode || !/^\d{3,4}$/.test(cvvCode)) {
  //     return 'Invalid CVV';
  //   }

  //   if (!cardholderName?.trim()) {
  //     return 'Cardholder name is required';
  //   }
  // }

  // if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
  //   if (!paypalEmail?.trim()) {
  //     return 'PayPal email is required';
  //   }

  //   const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!validEmail.test(paypalEmail)) {
  //     return 'Invalid PayPal email';
  //   }

  //   if (!paypalPassword || paypalPassword.length < 6) {
  //     return 'Invalid PayPal password';
  //   }
  // }

  // if (paymentMethod === PAYMENT_METHODS.MOBILEPAY) {
  //   const sanitizedPhoneNumber = phoneNumber?.replace(/\s/g, '');

  //   if (!sanitizedPhoneNumber || !/^\d{8}$/.test(sanitizedPhoneNumber)) {
  //     return 'Invalid phone number';
  //   }
  // }

  return null;
};

export { validateFakePayment };
