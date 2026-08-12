import { useRegisterUserMutation } from '../features/auth/authApiSlice';
import CreateAccount from '../features/auth/components/CreateAccount';
import { useLanguage } from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const RegisterUserPage = () => {
  const { language } = useLanguage();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // user register
  return (
    <MainPageContainer heading={language.createAccount} variant="small">
      user
      <CreateAccount
        navigateTo={ShopPath.Root}
        currentUser={null}
        autoComplete="on"
        isLoadingNew={isLoading}
        createUser={registerUser}
      />
    </MainPageContainer>
  );
};

export default RegisterUserPage;
