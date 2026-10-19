import { format } from 'date-fns';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { PromoCode } from '../../../app/api/apiTypes/promoCodeApiTypes';
import FormCart from '../../../components/carts/FormCart';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { useToast } from '../../../components/toast/hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { AdminPath } from '../../../layout/nav/enums';
import { validatePromoCode } from '../../../utils/validation/validatePromoCode';
import { useLanguage } from '../../language/useLanguage';
import {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
} from '../promoCodeApiSlice';

interface PromoCodeFormProps {
  id: string | null;
  promoCode: PromoCode | null;
  onReset: () => void;
}

const PromoCodeForm = ({ promoCode, id, onReset }: PromoCodeFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const handleGoback = () => {
    navigate(-1);
  };

  const initialState = {
    code: promoCode?.code ?? '',
    active: promoCode?.active ?? false,
    label: promoCode?.label ?? '',
    percent: promoCode?.percent ?? 0,
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
      callback: handleSubmitPromoCode,
      validate: validatePromoCode,
    },
  );

  // Redux hooks
  const [createPromoCode, { isLoading: isCreateLoading }] =
    useCreatePromoCodeMutation();
  const [updatePromoCode, { isLoading }] = useUpdatePromoCodeMutation();

  // Submit handler
  async function handleSubmitPromoCode() {
    const result = id
      ? await updatePromoCode({ id, body: values })
      : await createPromoCode(values);

    if (result.data?.success !== true) {
      return;
    }

    onAddToast({
      message: id ? language.promoCodeUpdated : language.promoCodeCreated,
    });

    navigate(`/${AdminPath.Admin}`);
  }

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
        isLoading={isLoading || isCreateLoading}

        cancelBtnProps={{
          onCancel: handleGoback,
        }}
      >
        <section className="product-form-container">
          <FormCart legendText={language.promoCodeDetails}>
            <div className="product-form-2-columns">
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
            </div>

            <Input
              type="number"
              name="percent"
              id="percent"
              value={values.percent}
              onChange={onChange}
              errorText={language[errors.percent]}
              labelText={language.discount}
              required
              inputSuffix="%"
            />
          </FormCart>
          <FormCart legendText={language.promoCodeValidity}>
            <div className="product-form-2-columns">
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
            </div>
          </FormCart>
        </section>
      </Form>
    </ErrorBoundary>
  );
};

export default PromoCodeForm;
