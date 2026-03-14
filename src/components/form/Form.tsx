import type { ReactNode } from 'react';
import { useLanguage } from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnType, BtnVariant } from '../../types/enums';
import type { RefFormType } from '../../types/types';
import Button from '../Button';
import './_form.scss';

type FormProps = {
  children: ReactNode;
  submitBtnLabel: string;
  ariaLabel?: string;
  cancelBtnProps?: any;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  ref?: RefFormType;
  onCancel?: () => void;
  onSubmit: () => void;
};

const Form = ({
  children,
  onSubmit,
  submitBtnLabel,
  className,
  isLoading,
  ariaLabel,
  onCancel,
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
      <LayoutElement as="footer" className="footer" ariaLabel={language.form}>
        {onCancel && (
          <Button
            onClick={onCancel}
            ariaLabel={ariaLabel}
            variant={BtnVariant.Secondary}
          >
            {cancelBtnProps ? cancelBtnProps.btnLabel : language.cancel}
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
      </LayoutElement>
    </form>
  );
};

export default Form;
