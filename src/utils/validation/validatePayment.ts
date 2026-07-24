import {
  PaymentMethods,
  paymentMethods,
} from '../../app/api/apiTypes/paymentApiTypes';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import {
  cardNumberRegex,
  emailRegex,
  expiryDateRegex,
  mobilePhoneNumberRegex,
  securityCodeRegex,
} from '../regex';

export interface PaymentFormValues {
  cardholderName: string;
  cardNumber: string;
  cvvCode: string;
  expiryDate: string;
  mobilePhoneNumber: string;
  paymentMethod: PaymentMethods;
  paypalEmail: string;
  paypalPassword: string;
}

type ValidatePayment = PaymentFormValues;

export function validatePayment(values: ValidatePayment) {
  const errors: ValidationErrors<ValidatePayment> = {};

  const {
    paymentMethod,
    cardNumber,
    expiryDate,
    cvvCode,
    cardholderName,
    paypalEmail,
    paypalPassword,
    mobilePhoneNumber,
  } = values;

  if (
    paymentMethod === paymentMethods.visa ||
    paymentMethod === paymentMethods.mastercard
  ) {
    const sanitizedCardNumber = cardNumber.replace(/\s/g, '');

    if (!sanitizedCardNumber || !cardNumberRegex.test(sanitizedCardNumber)) {
      errors.cardNumber =
        ValidationMessage.CardNumberMustContainExactly16Digits;
    }

    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      errors.expiryDate = ValidationMessage.InvalidExpiryDateFormat;
    } else {
      const [month, year] = expiryDate.split('/').map(Number);

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear() % 100;

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        errors.expiryDate = ValidationMessage.CardHasExpired;
      }
    }

    if (!cvvCode || !securityCodeRegex.test(cvvCode)) {
      errors.cvvCode = ValidationMessage.SecurityCodeMustContain3Or4Digits;
    }

    if (!cardholderName.trim()) {
      errors.cardholderName = ValidationMessage.PleaseEnterCardholderName;
    }
  }

  if (paymentMethod === paymentMethods.paypal) {
    if (!paypalEmail.trim()) {
      errors.paypalEmail = ValidationMessage.PleaseEnterEmail;
    } else if (!emailRegex.test(paypalEmail)) {
      errors.paypalEmail = ValidationMessage.PleaseEnterValidEmail;
    }

    if (!paypalPassword || paypalPassword.length < 6) {
      errors.paypalPassword =
        ValidationMessage.PayPalPasswordMustContainAtLeast6Characters;
    }
  }

  if (paymentMethod === paymentMethods.mobilepay) {
    const sanitizedPhoneNumber = mobilePhoneNumber.replace(/\s/g, '');

    if (
      !sanitizedPhoneNumber ||
      !mobilePhoneNumberRegex.test(sanitizedPhoneNumber)
    ) {
      errors.mobilePhoneNumber =
        ValidationMessage.PhoneNumberMustContainExactly8Digits;
    }
  }

  return errors;
}
