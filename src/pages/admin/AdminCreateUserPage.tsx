import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { ShopPath } from '../../layout/nav/enums';
import CreateAccount from '../CreateAccount';
import PageContainer from '../pageContainer/PageContainer';

const AdminCreateUserPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <article className="page page-small">
      <PageContainer heading={language.createNewUser}>
        <CreateAccount navigateTo={ShopPath.Users} currentUser={currentUser} />
      </PageContainer>
    </article>
  );
};

export default AdminCreateUserPage;
