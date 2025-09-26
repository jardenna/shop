import CreateAccount from '../../features/auth/components/CreateAccount';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminCreateUserPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <AdminPageContainer heading={language.createNewUser} variant="small">
      <CreateAccount
        navigateTo={AdminPath.AdminUser}
        currentUser={currentUser}
        canAssignRoles={currentUser?.isAdmin}
      />
    </AdminPageContainer>
  );
};

export default AdminCreateUserPage;
