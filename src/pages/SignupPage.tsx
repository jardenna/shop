import useLanguage from '../features/language/useLanguage';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';
import RegisterUser from './RegisterUser';

const SignupPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.createAccount} className="page-small">
      <RegisterUser navigateTo={ShopPath.Root} />
    </MainPageContainer>
  );
};

export default SignupPage;
