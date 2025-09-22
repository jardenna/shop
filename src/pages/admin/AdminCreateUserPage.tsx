import CreateAccount from '../../features/auth/components/CreateAccount';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import PageContainer from '../pageContainer/PageContainer';

const AdminCreateUserPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <article className="page page-small">
      <PageContainer heading={language.createNewUser}>
        <CreateAccount
          navigateTo={AdminPath.AdminUser}
          currentUser={currentUser}
          canAssignRoles={currentUser?.isAdmin}
        />
      </PageContainer>
    </article>
  );
};

export default AdminCreateUserPage;
