import { ErrorBoundary } from 'react-error-boundary';
import { Discount } from '../../../../app/api/apiTypes/sharedApiTypes';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import Form from '../../../../components/Form';
import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { validateCartPromoCode } from '../../../../utils/validation/validateCartPromoCode';
import { useLanguage } from '../../../language/useLanguage';
import './_promo-code-form.scss';

interface CartPromoCodeFormProps {
  currentPromoCode: string;
  isLoading: boolean;
  promoDiscount: Discount;
  onReset: () => void;
  onSubmitPromoCode: (promoCode: string) => void;
}

const CartPromoCodeForm = ({
  onSubmitPromoCode,
  isLoading,
  currentPromoCode,
  onReset,
  promoDiscount,
}: CartPromoCodeFormProps) => {
  const { language } = useLanguage();
  const initialState = {
    promoCode: promoDiscount.code,
  };

  const { values, onSubmit, onChange, errors } = useFormValidation({
    initialState,
    callback: handleSubmit,
    validate: validateCartPromoCode,
  });

  function handleSubmit() {
    onSubmitPromoCode(values.promoCode);
  }

  const promoCodeUsed = false;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => onReset}
    >
      <Form
        onSubmit={onSubmit}
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        submitBtnLabel={promoCodeUsed ? language.used : language.apply}
        isLoading={isLoading}
        disabled={promoCodeUsed}
        className="promo-form"
      >
        <Input
          labelText={`${language.discountCode} (${currentPromoCode})`}
          value={values.promoCode}
          name="promoCode"
          id="promoCode"
          onChange={onChange}
          readOnly={promoCodeUsed}
          errorText={language[errors.promoCode]}
        />
      </Form>
    </ErrorBoundary>
  );
};

export default CartPromoCodeForm;
