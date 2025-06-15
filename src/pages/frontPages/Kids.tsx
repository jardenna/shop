import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Kids = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer
      heading={language.kids}
      topImg={{
        src: '/images/kids/kid_banner.jpg',
        alt: '',
      }}
    >
      <section>Kids</section>
    </MainPageContainer>
  );
};

export default Kids;
