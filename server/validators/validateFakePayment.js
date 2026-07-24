import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  PAYMENT_METHODS_LIST,
} from '../config/paymentConstants.js';

import {
  cardNumberRegex,
  emailRegex,
  expiryDateRegex,
  mobilePhoneNumberRegex,
  securityCodeRegex,
} from '../utils/regex.js';

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

    if (!sanitizedCardNumber || !cardNumberRegex.test(sanitizedCardNumber)) {
      return 'Card number must contain exactly 16 digits';
    }

    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      return 'Expiry date must be in MM/YY format (for example, 09/28)';
    }

    const [month, year] = expiryDate.split('/').map(Number);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear() % 100;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }

    if (!cvvCode || !securityCodeRegex.test(cvvCode)) {
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

    if (!emailRegex.test(paypalEmail)) {
      return 'Please enter a valid email address';
    }

    if (!paypalPassword || paypalPassword.length < 6) {
      return 'PayPal password must contain at least 6 characters';
    }
  }

  if (paymentMethod === PAYMENT_METHODS.MOBILEPAY) {
    const sanitizedPhoneNumber = mobilePhoneNumber?.replace(/\s/g, '');

    if (
      !sanitizedPhoneNumber ||
      !mobilePhoneNumberRegex.test(sanitizedPhoneNumber)
    ) {
      return 'Phone number must contain exactly 8 digits';
    }
  }

  return null;
};

export { validateFakePayment };
