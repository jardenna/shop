import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import FormError from './FormError';

type FormLabelErrorProps = {
  id: string;
  labelText: string;
  className?: string;
  errorText?: string;
  iconName?: IconName;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

const FormLabel = ({
  labelText,
  id,
  required,
  inputHasNoLabel,
  errorText,
  className = '',
  iconName,
}: FormLabelErrorProps) => (
  <>
    <span className={inputHasNoLabel ? '' : 'form-label-container'}>
      {inputHasNoLabel ? (
        <VisuallyHidden htmlFor={id} as="label">
          {labelText}
        </VisuallyHidden>
      ) : (
        <label htmlFor={id} className={className}>
          {iconName && <Icon iconName={iconName} title={iconName} ariaHidden />}
          <span>
            {labelText}
            {required && <span aria-hidden="true">*</span>}
          </span>
        </label>
      )}
      {errorText && <FormError errorText={errorText} ariaErrorId={id} />}
    </span>
    {errorText && (
      <span className="error-icon" aria-hidden="true">
        i
      </span>
    )}
  </>
);

export default FormLabel;
