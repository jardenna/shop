import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../pageContainer/PageContainer';

const Dashboard = () => {
  const { language } = useLanguage();

  return (
    <article className="admin-page">
      <PageContainer heading={language.dashboard}>
        {language.dashboard}
      </PageContainer>
    </article>
  );
};

export default Dashboard;
