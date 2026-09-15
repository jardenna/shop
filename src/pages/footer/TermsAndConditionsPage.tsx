import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const TermsAndConditionsPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.termsAndConditions}>
      <section>TermsAndConditions</section>
    </MainPageContainer>
  );
};

export default TermsAndConditionsPage;
