import type { AddressInput } from '../../app/api/apiTypes/shopApiTypes';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

function validateAddress(values: AddressInput) {
  const errors: ValidationErrors = {};
  const { street, city, zipCode } = values;

  if (!street) {
    errors.street = ValidationMessage.PleaseEnterStreet;
  }
  if (!city) {
    errors.city = ValidationMessage.PleaseEnterCity;
  }
  if (!zipCode) {
    errors.zipCode = ValidationMessage.PleaseEnterZipcode;
  }

  return errors;
}

export default validateAddress;
