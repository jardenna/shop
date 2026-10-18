import { format } from 'date-fns';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { PromoCode } from '../../../app/api/apiTypes/promoCodeApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validatePromoCode } from '../../../utils/validation/validatePromoCode';
import { useLanguage } from '../../language/useLanguage';

interface PromoCodeFormProps {
  id: string | null;
  promoCode?: PromoCode;
  onReset: () => void;
}

const PromoCodeForm = ({ promoCode, id, onReset }: PromoCodeFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleGoback = () => {
    navigate(-1);
  };

  const initialState = {
    code: promoCode?.code ?? '',
    label: promoCode?.label ?? '',
    percent: promoCode?.percent ?? null,
    startsAt: promoCode?.startsAt
      ? format(new Date(promoCode.startsAt), "yyyy-MM-dd'T'HH:mm")
      : '',
    expiresAt: promoCode?.expiresAt
      ? format(new Date(promoCode.expiresAt), "yyyy-MM-dd'T'HH:mm")
      : '',
  };

  const { onChange, values, errors, onSubmit, isFormDirty } = useFormValidation(
    {
      initialState,
      validate: validatePromoCode,
    },
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        onReset();
      }}
    >
      <Form
        disabled={!!id && !isFormDirty}
        onSubmit={onSubmit}
        submitBtnLabel={id ? language.save : language.create}
        cancelBtnProps={{
          onCancel: handleGoback,
        }}
      >
        <FieldSet legendText={language.promoCodeDetails}>
          <Input
            onChange={onChange}
            value={values.code}
            id="code"
            name="code"
            labelText={language.discountCode}
            errorText={language[errors.code]}
            required
          />
          <Input
            onChange={onChange}
            value={values.label}
            id="label"
            name="label"
            labelText={language.description}
            errorText={language[errors.label]}
            required
          />
        </FieldSet>
        <FieldSet legendText={language.promoCodeValidity}>
          <Input
            type="datetime-local"
            name="startsAt"
            id="startsAt"
            value={values.startsAt}
            onChange={onChange}
            labelText={language.startsAt}
            errorText={language[errors.startsAt]}

            required
          />
          <Input
            type="datetime-local"
            name="expiresAt"
            id="expiresAt"
            value={values.expiresAt}
            onChange={onChange}
            errorText={language[errors.expiresAt]}

            labelText={language.expiresAt}
            required
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default PromoCodeForm;
