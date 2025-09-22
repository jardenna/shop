import useAuth from '../features/auth/hooks/useAuth';
import useLanguage from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import CreateAccount from './CreateAccount';
import MainPageContainer from './pageContainer/MainPageContainer';

const CreateAccountPage = () => {
  const { language } = useLanguage();

  const { currentUser } = useAuth();

  return (
    <MainPageContainer heading={language.createAccount} className="page-small">
      <CreateAccount navigateTo={ShopPath.Root} currentUser={currentUser} />
    </MainPageContainer>
  );
};

export default CreateAccountPage;
