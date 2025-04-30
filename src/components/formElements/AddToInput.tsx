import { ReactNode } from 'react';
import { BtnVariant, IconName } from '../../types/enums';
import IconBtn from '../IconBtn';
import FormError from './FormError';
import FormLabel from './FormLabel';

type AddToInputProps = {
  ariaLabel: string;
  children: ReactNode;
  id: string;
  labelText: string;
  errorText?: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

const AddToInput = ({
  children,
  ariaLabel,
  inputHasNoLabel,
  id,
  errorText,
  required,
  labelText,
}: AddToInputProps) => (
  <div className="add-to-input">
    <span className={inputHasNoLabel ? '' : 'form-label-container'}>
      <FormLabel
        required={required}
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
      {errorText && <FormError errorText={errorText} ariaErrorId={id} />}
    </span>
    <div className="flex">
      {errorText && (
        <span className="error-icon" aria-hidden="true">
          i
        </span>
      )}
      {children}

      <IconBtn
        size="12"
        variant={BtnVariant.Primary}
        iconName={IconName.Add}
        title="add"
        ariaLabel={ariaLabel}
      />
    </div>
  </div>
);

export default AddToInput;
