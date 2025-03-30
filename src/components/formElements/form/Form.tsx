import { FC, ReactNode } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import LayoutElement from '../../../layout/LayoutElement';
import { BtnVariant } from '../../../types/enums';
import { FormEventType } from '../../../types/types';
import Button from '../../Button';
import './_form.scss';

interface FormProps {
  children: ReactNode;
  submitBtnLabel: string;
  ariaLabel?: string;
  className?: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit: (event: FormEventType) => void;
}

const Form: FC<FormProps> = ({
  children,
  onSubmit,
  submitBtnLabel,
  className = '',
  isLoading,
  ariaLabel,
  onCancel,
}) => {
  const { language } = useLanguage();

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
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
