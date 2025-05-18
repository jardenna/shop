import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import { FormEventType, refFormType } from '../../types/types';
import Button from '../Button';
import './_form.scss';

type FormProps = {
  children: ReactNode;
  submitBtnLabel: string;
  ariaLabel?: string;
  className?: string;
  isLoading?: boolean;
  ref?: refFormType;
  onCancel?: () => void;
  onSubmit: (event: FormEventType) => void;
};

const Form = ({
  children,
  onSubmit,
  submitBtnLabel,
  className = '',
  isLoading,
  ariaLabel,
  onCancel,
  ref,
}: FormProps) => {
  const { language } = useLanguage();

  return (
    <form onSubmit={onSubmit} noValidate className={className} ref={ref}>
      {children}
      <LayoutElement className="form-footer" ariaLabel={language.form}>
        {onCancel && (
          <Button
            onClick={onCancel}
            isLoading={isLoading}
            ariaLabel={ariaLabel}
            variant={BtnVariant.Secondary}
          >
            {language.cancel}
          </Button>
        )}
        <Button type="submit" isLoading={isLoading} ariaLabel={ariaLabel}>
          {submitBtnLabel}
        </Button>
      </LayoutElement>
    </form>
  );
};

export default Form;
