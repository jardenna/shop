import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnType, BtnVariant } from '../../types/enums';
import type { FormEventType, refFormType } from '../../types/types';
import Button from '../Button';
import './_form.scss';

type FormProps = {
  children: ReactNode;
  submitBtnLabel: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  ref?: refFormType;
  onCancel?: () => void;
  onSubmit: (event: FormEventType) => void;
};

const Form = ({
  children,
  onSubmit,
  submitBtnLabel,
  className,
  isLoading,
  ariaLabel,
  onCancel,
  ref,
  disabled,
}: FormProps) => {
  const { language } = useLanguage();

  return (
    <form onSubmit={onSubmit} noValidate className={className} ref={ref}>
      {children}
      <LayoutElement as="footer" className="footer" ariaLabel={language.form}>
        {onCancel && (
          <Button
            onClick={onCancel}
            ariaLabel={ariaLabel}
            variant={BtnVariant.Secondary}
          >
            {language.cancel}
          </Button>
        )}
        <Button
          type={BtnType.Submit}
          isLoading={isLoading}
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
