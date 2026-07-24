import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  PAYMENT_METHODS_LIST,
} from '../config/paymentConstants.js';

const validateFakePayment = ({
  method: paymentMethod,
  [PAYMENT_FIELDS.CARD_NUMBER]: cardNumber,
  [PAYMENT_FIELDS.EXPIRY_DATE]: expiryDate,
  [PAYMENT_FIELDS.CVV_CODE]: cvvCode,
  [PAYMENT_FIELDS.CARDHOLDER_NAME]: cardholderName,
  [PAYMENT_FIELDS.PAYPAL_EMAIL]: paypalEmail,
  [PAYMENT_FIELDS.PAYPAL_PASSWORD]: paypalPassword,
  [PAYMENT_FIELDS.MOBILE_PHONE_NUMBER]: mobilePhoneNumber,
}) => {
  if (!paymentMethod) {
    return 'Payment method is required';
  }

  if (!PAYMENT_METHODS_LIST.includes(paymentMethod)) {
    return 'Invalid payment method';
  }

  if (
    paymentMethod === PAYMENT_METHODS.VISA ||
    paymentMethod === PAYMENT_METHODS.MASTERCARD
  ) {
    const sanitizedCardNumber = cardNumber?.replace(/\s/g, '');

    if (!sanitizedCardNumber || !/^\d{16}$/.test(sanitizedCardNumber)) {
      return 'Card number must contain exactly 16 digits';
    }

    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return 'Expiry date must be in MM/YY format (for example, 09/28)';
    }

    const [month, year] = expiryDate.split('/').map(Number);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }

    if (!cvvCode || !/^\d{3,4}$/.test(cvvCode)) {
      return 'Security code must contain 3 or 4 digits';
    }

    if (!cardholderName?.trim()) {
      return 'Cardholder name is required';
    }
  }

  if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
    if (!paypalEmail?.trim()) {
      return 'PayPal email is required';
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(paypalEmail)) {
      return 'Please enter a valid email address';
    }

    if (!paypalPassword || paypalPassword.length < 6) {
      return 'PayPal password must contain at least 6 characters';
    }
  }

  if (paymentMethod === PAYMENT_METHODS.MOBILEPAY) {
    const sanitizedPhoneNumber = mobilePhoneNumber?.replace(/\s/g, '');

    if (!sanitizedPhoneNumber || !/^\d{8}$/.test(sanitizedPhoneNumber)) {
      return 'Phone number must contain exactly 8 digits';
    }
  }

  return null;
};

export { validateFakePayment };
