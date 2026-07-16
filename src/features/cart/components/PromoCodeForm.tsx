import Form from '../../../components/form/Form';
import Input from '../../../components/formElements/Input';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useLanguage } from '../../language/useLanguage';

interface PromoCodeFormProps {
  isLoading: boolean;
  onSubmitPromoCode: (promoCode: string) => void;
}

const PromoCodeForm = ({
  onSubmitPromoCode,
  isLoading,
}: PromoCodeFormProps) => {
  const { language } = useLanguage();
  const initialState = {
    promoCode: '',
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
      />
    </Form>
  );
};

export default PromoCodeForm;
