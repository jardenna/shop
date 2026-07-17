import { Discount } from '../../../app/api/apiTypes/sharedApiTypes';
import Form from '../../../components/form/Form';
import Input from '../../../components/formElements/Input';
import { useFormValidation } from '../../../hooks/useFormValidation';
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

  const { values, onSubmit, onChange } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    onSubmitPromoCode(values.promoCode);
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={language.apply}
      isLoading={isLoading}
    >
      <Input
        labelText={`${language.discountCode} (SUMMER15)`}
        value={values.promoCode}
        name="promoCode"
        id="promoCode"
        onChange={onChange}
        readOnly={values.promoCode !== ''}
      />
    </Form>
  );
};

export default PromoCodeForm;
