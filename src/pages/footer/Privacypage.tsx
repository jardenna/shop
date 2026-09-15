import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const PrivacyPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.privacy}>
      <section>Privacy</section>
    </MainPageContainer>
  );
};

export default PrivacyPage;
