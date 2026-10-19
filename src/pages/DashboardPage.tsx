import { useLanguage } from '../features/language/useLanguage';
import PromoCodeTable from '../features/promoCodes/components/PromoCodeTable';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard} variant="x-large">
      <PromoCodeTable />
    </AdminPageContainer>
  );
};

export default DashboardPage;
