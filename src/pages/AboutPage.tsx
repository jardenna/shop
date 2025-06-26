import ProductPrice from '../features/currency/components/ProductPrice';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.about}>
      <section>
        <ProductPrice price={10200} />
        <p>tet</p>
      </section>
    </MainPageContainer>
  );
};

export default AboutPage;
