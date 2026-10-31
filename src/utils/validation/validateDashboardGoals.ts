/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

export function validateDashboardGoals(
  values: Record<string, string | number>,
) {
  const errors: ValidationErrors<typeof values> = {};

  Object.entries(values).forEach(([name, value]) => {
    if (value === '' || value === undefined || value === null) {
      errors[name] = ValidationMessage.PleaseEnterValue;
    } else if (!Number.isFinite(Number(value)) || Number(value) < 0) {
      errors[name] = ValidationMessage.PleaseEnterValidNumber;
    } else if (!Number.isInteger(Number(value))) {
      errors[name] = ValidationMessage.PleaseEnterWholeNumber;
    }
  });

  return errors;
}
