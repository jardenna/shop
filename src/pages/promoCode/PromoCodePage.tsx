import { useLanguage } from '../../features/language/useLanguage';
import PromoCodeTable from '../../features/promoCodes/components/PromoCodeTable';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const PromoCodePage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard} variant="large">
      <PromoCodeTable />
    </AdminPageContainer>
  );
};

export default PromoCodePage;
