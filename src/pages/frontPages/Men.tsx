import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Men = () => {
  const { language } = useLanguage();
  return (
    <MainPageContainer heading={language.men}>
      <section>Mænd</section>
    </MainPageContainer>
  );
};

export default Men;
