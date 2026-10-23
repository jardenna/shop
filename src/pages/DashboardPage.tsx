import { useLanguage } from '../features/language/useLanguage';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard} variant="x-large">
      Dashboard
    </AdminPageContainer>
  );
};

export default DashboardPage;
