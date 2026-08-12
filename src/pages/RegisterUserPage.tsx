import CreateAccount from '../features/auth/components/CreateAccount';
import { useLanguage } from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const RegisterUserPage = () => {
  const { language } = useLanguage();
  // const [createUser, { isLoading: isCreateuserLoading }] =
  //   useCreateUserMutation();
  // user register
  return (
    <MainPageContainer heading={language.createAccount} variant="small">
      user
      <CreateAccount
        navigateTo={ShopPath.Root}
        currentUser={null}
        autoComplete="on"
      />
    </MainPageContainer>
  );
};

export default RegisterUserPage;
