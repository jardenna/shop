import Img from '../../components/Img';
import useLanguage from '../../features/language/useLanguage';
import ProductPageContainer from '../pageContainer/ProductPageContainer';

const Kids = () => {
  const { language } = useLanguage();

  return (
    <ProductPageContainer
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
    </ProductPageContainer>
  );
};

export default Kids;
