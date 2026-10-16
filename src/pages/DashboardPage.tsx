import { useLanguage } from '../features/language/useLanguage';
import PromoCodeTable from '../features/promoCodes/PromoCodeTable';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard} variant="x-large">
      {language.dashboard}
      <PromoCodeTable />
    </AdminPageContainer>
  );
};

export default DashboardPage;
