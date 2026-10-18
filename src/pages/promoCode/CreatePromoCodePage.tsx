import { useLanguage } from '../../features/language/useLanguage';
import PromoCodeForm from '../../features/promoCodes/components/PromoCodeForm';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const CreatePromoCodePage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer
      heading={language.createNewDiscountCode}
      variant="medium"
    >
      <PromoCodeForm
        id={null}
        onReset={() => {
          console.log(123);
        }}
      />
    </AdminPageContainer>
  );
};

export default CreatePromoCodePage;
