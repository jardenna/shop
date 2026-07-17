import { Discount } from '../../../app/api/apiTypes/sharedApiTypes';
import Form from '../../../components/form/Form';
import Input from '../../../components/formElements/Input';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validatePromoCode } from '../../../utils/validation/validatePromoCode';
import { useLanguage } from '../../language/useLanguage';

interface PromoCodeFormProps {
  isLoading: boolean;
  promoDiscount: Discount;
  onSubmitPromoCode: (promoCode: string) => void;
}

const PromoCodeForm = ({
  onSubmitPromoCode,
  isLoading,
  promoDiscount,
}: PromoCodeFormProps) => {
  const { language } = useLanguage();
  const initialState = {
    promoCode: promoDiscount.code,
  };

  const { values, onSubmit, onChange, errors } = useFormValidation({
    initialState,
    callback: handleSubmit,
    validate: validatePromoCode,
  });

  function handleSubmit() {
    onSubmitPromoCode(values.promoCode);
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={language.apply}
      isLoading={isLoading}
      hideSubmitBtnLabel={promoDiscount.code !== ''}
    >
      <Input
        labelText={`${language.discountCode} (SUMMER15)`}
        value={values.promoCode}
        name="promoCode"
        id="promoCode"
        onChange={onChange}
        readOnly={promoDiscount.code !== ''}
        errorText={language[errors.promoCode]}
      />
    </Form>
  );
};

export default PromoCodeForm;
