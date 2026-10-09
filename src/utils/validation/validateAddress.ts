import { AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import { isNumber } from '../regex';

export function validateAddress(values: AddressInput) {
  const errors: ValidationErrors<AddressInput> = {};
  const { street, city, zipCode } = values;

  if (!street) {
    errors.street = ValidationMessage.PleaseEnterStreet;
  }
  if (!city) {
    errors.city = ValidationMessage.PleaseEnterCity;
  }
  if (!zipCode) {
    errors.zipCode = ValidationMessage.PleaseEnterZipcode;
  } else if (!isNumber.test(zipCode)) {
    errors.zipCode = ValidationMessage.PleaseEnterValidZipcode;
  }

  return errors;
}
