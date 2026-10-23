import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard} variant="large">
      hello
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
