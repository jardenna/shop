import useLanguage from '../features/language/useLanguage';
import { MainPath } from '../layout/nav/enums';
import RegisterUser from './RegisterUser';

const SignupPage = () => {
  const { language } = useLanguage();

  return <RegisterUser navigateTo={MainPath.Root} heading={language.signup} />;
};

export default SignupPage;
