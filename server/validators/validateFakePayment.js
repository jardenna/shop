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
import { t } from '../utils/translator.js';

const validateFakePayment = ({
  method: paymentMethod,
  [PAYMENT_FIELDS.CARD_NUMBER]: cardNumber,
  [PAYMENT_FIELDS.EXPIRY_DATE]: expiryDate,
  [PAYMENT_FIELDS.CVV_CODE]: cvvCode,
  [PAYMENT_FIELDS.CARDHOLDER_NAME]: cardholderName,
  [PAYMENT_FIELDS.PAYPAL_EMAIL]: paypalEmail,
  [PAYMENT_FIELDS.PAYPAL_PASSWORD]: paypalPassword,
  [PAYMENT_FIELDS.MOBILE_PHONE_NUMBER]: mobilePhoneNumber,
  lang,
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
      return t('cardNumberMustContainExactly16Digits', lang);
    }

    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      return t('invalidExpiryDateFormat', lang);
    }

    const [month, year] = expiryDate.split('/').map(Number);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear() % 100;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return t('cardHasExpired', lang);
    }

    if (!cvvCode || !securityCodeRegex.test(cvvCode)) {
      return t('securityCodeMustContain3Or4Digits', lang);
    }

    if (!cardholderName?.trim()) {
      // return t('invalidExpiryDateFormat', lang);
      return 'Cardholder name is required';
    }
  }

  if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
    if (!paypalEmail?.trim()) {
      return t('pleaseEnterEmail', lang);
    }

    if (!emailRegex.test(paypalEmail)) {
      return t('pleaseEnterValidEmail', lang);
    }

    if (!paypalPassword || paypalPassword.length < 6) {
      return t('payPalPasswordMustContainAtLeast6Characters', lang);
    }
  }

  if (paymentMethod === PAYMENT_METHODS.MOBILEPAY) {
    const sanitizedPhoneNumber = mobilePhoneNumber?.replace(/\s/g, '');

    if (
      !sanitizedPhoneNumber ||
      !mobilePhoneNumberRegex.test(sanitizedPhoneNumber)
    ) {
      return t('phoneNumberMustContainExactly8Digits', lang);
    }
  }

  return null;
};

export { validateFakePayment };
