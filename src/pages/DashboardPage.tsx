import KpiCart from '../features/dashboard/components/KpiCart';
import { useLanguage } from '../features/language/useLanguage';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();

  //   new customers revenue orders

  // total customers total revenue total orders

  return (
    <AdminPageContainer
      heading={language.dashboard}
      variant="x-large"
      hideBreadCrumbs
    >
      <KpiCart title="New customers" />
    </AdminPageContainer>
  );
};

export default DashboardPage;
