import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Women = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.women}>
      <section>Damer</section>
    </MainPageContainer>
  );
};

export default Women;
