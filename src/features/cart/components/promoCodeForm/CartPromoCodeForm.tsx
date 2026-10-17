import { Discount } from '../../../../app/api/apiTypes/sharedApiTypes';
import Form from '../../../../components/Form';
import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { validatePromoCode } from '../../../../utils/validation/validatePromoCode';
import { useLanguage } from '../../../language/useLanguage';
import './_promo-code-form.scss';

interface CartPromoCodeFormProps {
  isLoading: boolean;
  promoDiscount: Discount;
  onSubmitPromoCode: (promoCode: string) => void;
}

const CartPromoCodeForm = ({
  onSubmitPromoCode,
  isLoading,
  promoDiscount,
}: CartPromoCodeFormProps) => {
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

  const promoCodeUsed = promoDiscount.code !== '';

  return (
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={promoCodeUsed ? language.used : language.apply}
      isLoading={isLoading}
      disabled={promoCodeUsed}
      className="promo-form"
    >
      <Input
        labelText={`${language.discountCode} (SUMMER15)`}
        value={values.promoCode}
        name="promoCode"
        id="promoCode"
        onChange={onChange}
        readOnly={promoCodeUsed}
        errorText={language[errors.promoCode]}
      />
    </Form>
  );
};

export default CartPromoCodeForm;
