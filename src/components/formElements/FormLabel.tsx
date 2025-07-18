import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import IconContent from '../IconContent';
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
}: FormLabelErrorProps) => {
  const { language } = useLanguage();

  return (
    <>
      <span className={inputHasNoLabel ? '' : 'form-label-container'}>
        {inputHasNoLabel ? (
          <VisuallyHidden htmlFor={id} as="label">
            {labelText}
          </VisuallyHidden>
        ) : (
          <label htmlFor={id} className={className}>
            {iconName ? (
              <IconContent
                iconName={iconName}
                fill={id}
                size="70"
                title={getlowerCaseFirstLetter(iconName, language)}
                ariaLabel={getlowerCaseFirstLetter(id, language)}
              />
            ) : (
              labelText
            )}

            {required && <span aria-hidden="true">*</span>}
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
};

export default FormLabel;
