import type { ReactNode } from 'react';
import { useLanguage } from '../../features/language/useLanguage';
import { BtnType, BtnVariant } from '../../types/enums';
import type { RefFormType } from '../../types/types';
import Button from '../Button';
import './_form.scss';

type CancelButtonProps = {
  btnLabel?: string;
  isDisabled?: boolean;
  onCancel: () => void;
};

type FormProps = {
  children: ReactNode;
  submitBtnLabel: string;
  ariaLabel?: string;
  cancelBtnProps?: CancelButtonProps;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  ref?: RefFormType;
  onSubmit: () => void;
};

const Form = ({
  children,
  onSubmit,
  submitBtnLabel,
  className,
  isLoading,
  ariaLabel,
  cancelBtnProps,
  ref,
  disabled,
}: FormProps) => {
  const { language } = useLanguage();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      noValidate
      className={className}
      ref={ref}
    >
      {children}
      <footer className="footer">
        {cancelBtnProps && (
          <Button
            onClick={cancelBtnProps.onCancel}
            ariaLabel={ariaLabel}
            variant={BtnVariant.Secondary}
            disabled={cancelBtnProps.isDisabled}
          >
            {cancelBtnProps.btnLabel || language.cancel}
          </Button>
        )}
        <Button
          type={BtnType.Submit}
          showBtnLoader={isLoading}
          ariaLabel={ariaLabel}
          disabled={disabled}
        >
          {submitBtnLabel}
        </Button>
      </footer>
    </form>
  );
};

export default Form;
