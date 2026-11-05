import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const AdminReviewPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.reviews} hideBreadCrumbs>
      page
    </AdminPageContainer>
  );
};

export default AdminReviewPage;
