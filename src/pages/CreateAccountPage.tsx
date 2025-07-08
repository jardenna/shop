import useLanguage from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import CreateAccount from './CreateAccount';
import MainPageContainer from './pageContainer/MainPageContainer';

const CreateAccountPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.createAccount} className="page-small">
      <CreateAccount navigateTo={ShopPath.Root} />
    </MainPageContainer>
  );
};

export default CreateAccountPage;
