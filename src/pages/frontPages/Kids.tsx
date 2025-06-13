import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Kids = () => {
  const { language } = useLanguage();
  return (
    <MainPageContainer heading={language.kids}>
      <section>Kids</section>
    </MainPageContainer>
  );
};

export default Kids;
