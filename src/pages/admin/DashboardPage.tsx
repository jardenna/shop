import { useLanguage } from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard}>
      {language.dashboard}
    </AdminPageContainer>
  );
};

export default DashboardPage;
