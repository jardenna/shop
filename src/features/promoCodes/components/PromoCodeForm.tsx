import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import type { PromoCode } from '../../../app/api/apiTypes/promoCodeApiTypes';
import FormCard from '../../../components/carts/FormCard';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import ToggleSwitch from '../../../components/formElements/toggleSwitch/ToggleSwitch';
import { useToast } from '../../../components/toast/hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { AdminPath } from '../../../layout/nav/navConstants';
import { dateFormat, newDate } from '../../../utils/dates';
import { validatePromoCode } from '../../../utils/validation/validatePromoCode';
import { useLanguage } from '../../language/useLanguage';
import {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
} from '../promoCodeApiSlice';

interface PromoCodeFormProps {
  id: string | null;
  promoCode: PromoCode | null;
}

const PromoCodeForm = ({ promoCode, id }: PromoCodeFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const minDateTime = format(newDate, dateFormat.dateTimeLocal);

  const handleGoback = () => {
    navigate(-1);
  };

  const initialState = {
    code: promoCode?.code ?? '',
    active: promoCode?.active ?? false,
    label: promoCode?.label ?? '',
    percent: promoCode?.percent ?? 0,
    startsAt: promoCode?.startsAt
      ? format(new Date(promoCode.startsAt), dateFormat.dateTimeLocal)
      : minDateTime,
    expiresAt: promoCode?.expiresAt
      ? format(new Date(promoCode.expiresAt), dateFormat.dateTimeLocal)
      : '',
  };

  const {
    onChange,
    onChangeToggleSwitch,
    values,
    errors,
    onSubmit,
    isFormDirty,
  } = useFormValidation({
    initialState,
    callback: handleSubmitPromoCode,
    validate: validatePromoCode,
  });

  // Redux hooks
  const [createPromoCode, { isLoading: isCreateLoading }] =
    useCreatePromoCodeMutation();
  const [updatePromoCode, { isLoading }] = useUpdatePromoCodeMutation();

  // Submit handler
  async function handleSubmitPromoCode() {
    const result = await (
      id ? updatePromoCode({ id, body: values }) : createPromoCode(values)
    ).unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });

      navigate(AdminPath.AdminDiscountCodes);
    }
  }

  return (
    <Form
      disabled={!!id && !isFormDirty}
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
      isLoading={isLoading || isCreateLoading}
      cancelBtnProps={{
        onCancel: handleGoback,
      }}
    >
      <FormCard legendText={language.promoCodeDetails}>
        <ToggleSwitch
          id="active"
          name="active"
          checked={values.active}
          onChange={onChangeToggleSwitch}
          labelText={language.active}
        />
      </FormCard>
      <section className="promo-code-form-container">
        <FormCard legendText={language.promoCodeDetails}>
          <div className="promo-code-2-columns">
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
        </FormCard>
        <FormCard legendText={language.promoCodeValidity}>
          <Input
            type="datetime-local"
            name="startsAt"
            id="startsAt"
            min={minDateTime}
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
        </FormCard>
      </section>
    </Form>
  );
};

export default PromoCodeForm;
