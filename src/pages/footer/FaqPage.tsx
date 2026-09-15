import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const FaqPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.faq}>
      <section>faq</section>
    </MainPageContainer>
  );
};

export default FaqPage;
