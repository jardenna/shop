import useLanguage from '../features/language/useLanguage';
import { AdminPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';
import RegisterUser from './RegisterUser';

const SignupPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.signup} className="page-small">
      <RegisterUser navigateTo={AdminPath.Root} />
    </MainPageContainer>
  );
};

export default SignupPage;
