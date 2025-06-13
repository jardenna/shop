import ProductPrice from '../features/currency/components/ProductPrice';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const About = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.collection}>
      <section>
        <ProductPrice price={10200} />
      </section>
    </MainPageContainer>
  );
};

export default About;
