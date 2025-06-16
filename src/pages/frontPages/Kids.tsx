import Img from '../../components/Img';
import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Kids = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer
      heading={language.kids}
      topImg={{
        src: '/images/kids/kid_banner1.jpg',
        alt: '',
      }}
    >
      <section className="product-container">
        <Img src="/images/collections/kids.jpg" alt="" />
        <Img src="/images/collections/kids.jpg" alt="" />
        <Img src="/images/collections/kids.jpg" alt="" />
        <Img src="/images/collections/kids.jpg" alt="" />
      </section>
    </MainPageContainer>
  );
};

export default Kids;
