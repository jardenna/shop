import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CookiesPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.cookies}>
      <section>Cookies</section>
    </MainPageContainer>
  );
};

export default CookiesPage;
