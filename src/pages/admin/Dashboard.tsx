import useLanguage from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const Dashboard = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.dashboard} ariaLabelledby="dashboard">
      {language.dashboard}
    </AdminPageContainer>
  );
};

export default Dashboard;
