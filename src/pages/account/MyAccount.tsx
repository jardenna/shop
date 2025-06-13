import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const MyAccount = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.myAccount}>Konto</MainPageContainer>
  );
};

export default MyAccount;
