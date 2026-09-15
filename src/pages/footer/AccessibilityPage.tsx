import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const AccessibilityPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.accessibilityStatement}>
      <section>AccessibilityPage</section>
    </MainPageContainer>
  );
};

export default AccessibilityPage;
