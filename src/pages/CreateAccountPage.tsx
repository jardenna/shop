import CreateAccount from '../features/auth/components/CreateAccount';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useLanguage } from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const CreateAccountPage = () => {
  const { currentUser } = useAuth();
  const { language } = useLanguage();

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

export default CreateAccountPage;
