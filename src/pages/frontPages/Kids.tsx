import Img from '../../components/Img';
import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Kids = () => {
  const { language } = useLanguage();
  return (
    <>
      <Img src="/images/kids/kid_banner.png" alt="lots of kids" />
      <MainPageContainer heading={language.kids}>
        <section>Kids</section>
      </MainPageContainer>
    </>
  );
};

export default Kids;
