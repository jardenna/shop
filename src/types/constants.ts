import type { ButtonHTMLAttributes } from 'react';
import type { IconName } from '../components/icons/iconConstants';

export const ValidationMessage = {
  BrandRequired: 'brandRequired',
  CardHasExpired: 'cardHasExpired',
  CardNumberMustContainExactly16Digits: 'cardNumberMustContainExactly16Digits',
  CategoryRequired: 'categoryRequired',
  ColorRequired: 'colorRequired',
  discountRange: 'discountRange',
  EndDateCannotBeBeforeStartDate: 'endDateCannotBeBeforeStartDate',
  ImageRequired: 'imageRequired',
  InvalidDiscountPercentage: 'invalidDiscountPercentage',
  InvalidExpiryDateFormat: 'invalidExpiryDateFormat',
  MaterialRequired: 'materialRequired',
  MobilePay8Characters: 'mobilePay8Characters',
  nothingWasUpdated: 'nothingWasUpdated',
  PasswordDoNotMatch: 'passwordDoNotMatch',
  PasswordLowercase: 'passwordLowercase',
  PasswordMinLength: 'passwordMinLength',
  PasswordNumber: 'passwordNumber',
  PasswordSymbol: 'passwordSymbol',
  PasswordUppercase: 'passwordUppercase',
  PayPalPasswordMustContainAtLeast6Characters:
    'payPalPasswordMustContainAtLeast6Characters',
  PhoneNumberMustContainExactly8Digits: 'phoneNumberMustContainExactly8Digits',
  PleaseEnterCardholderName: 'pleaseEnterCardholderName',
  PleaseEnterCategoryName: 'pleaseEnterCategoryName',
  PleaseEnterCity: 'pleaseEnterCity',
  PleaseEnterDescription: 'pleaseEnterDescription',
  PleaseEnterDiscountCode: 'pleaseEnterDiscountCode',
  PleaseEnterEmail: 'noEmail',
  PleaseEnterEndDate: 'pleaseEnterEndDate',
  PleaseEnterName: 'pleaseEnterName',
  PleaseEnterPassword: 'pleaseEnterPassword',
  PleaseEnterStartDate: 'pleaseEnterStartDate',
  PleaseEnterStreet: 'pleaseEnterStreet',
  PleaseEnterSubCategoryName: 'pleaseEnterSubCategoryName',
  PleaseEnterTranslationKey: 'pleaseEnterTranslationKey',
  PleaseEnterValidEmail: 'pleaseEnterValidEmail',
  PleaseEnterValidNumber: 'pleaseEnterValidNumber',
  PleaseEnterValidPhone: 'pleaseEnterValidPhone',
  PleaseEnterValidZipcode: 'pleaseEnterValidZipcode',
  PleaseEnterValue: 'pleaseEnterValue',
  PleaseEnterWholeNumber: 'pleaseEnterWholeNumber',
  PleaseEnterZipcode: 'pleaseEnterZipcode',
  PleaseSelectParentCategory: 'pleaseSelectParentCategory',
  PriceRequired: 'priceRequired',
  ProductDescriptionRequired: 'productDescriptionRequired',
  ProductNameRequired: 'productNameRequired',
  SecurityCodeMustContain3Or4Digits: 'securityCodeMustContain3Or4Digits',
  SizeRequired: 'sizeRequired',
  StartDateCannotBeInThePast: 'startDateCannotBeInThePast',
  UnknownError: 'unknownError',
} as const;

export const PopupRole = {
  Alert: 'alert',
  Status: 'status',
} as const;

export const KeyCode = {
  Alt: 'Alt',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  End: 'End',
  Enter: 'Enter',
  Esc: 'Escape',
  Home: 'Home',
  Shift: 'Shift',
  Space: ' ',
  Tab: 'Tab',
} as const;

export const BtnVariant = {
  Danger: 'danger',
  Default: 'default',
  Ghost: 'ghost',
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export type IconNameValue = (typeof IconName)[keyof typeof IconName];

export type BtnType = ButtonHTMLAttributes<HTMLButtonElement>['type'];

export type ValidationMessageValue =
  (typeof ValidationMessage)[keyof typeof ValidationMessage];
export type PopupRoleValue = (typeof PopupRole)[keyof typeof PopupRole];
