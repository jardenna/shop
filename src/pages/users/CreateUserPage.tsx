import { useCreateUserMutation } from '../../features/auth/authApiSlice';
import CreateAccount from '../../features/auth/components/CreateAccount';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const CreateUserPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const [createUser, { isLoading }] = useCreateUserMutation();

  // Admin Create user
  return (
    <AdminPageContainer heading={language.createNewUser} variant="small">
      admin
      <CreateAccount
        navigateTo={AdminPath.AdminUser}
        currentUser={currentUser}
        canAssignRoles={currentUser?.isAdmin}
        isLoadingNew={isLoading}
        createUser={createUser}
      />
    </AdminPageContainer>
  );
};

export default CreateUserPage;
