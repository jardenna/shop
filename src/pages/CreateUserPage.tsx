import CreateAccount from '../features/auth/components/CreateAccount';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useLanguage } from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const CreateUserPage = () => {
  const { currentUser } = useAuth();
  const { language } = useLanguage();
  // const [createUser, { isLoading: isCreateuserLoading }] =
  //   useCreateUserMutation();

  return (
    <MainPageContainer heading={language.createAccount} variant="small">
      <CreateAccount
        navigateTo={ShopPath.Root}
        currentUser={currentUser}
        autoComplete="on"
      />
    </MainPageContainer>
  );
};

export default CreateUserPage;
