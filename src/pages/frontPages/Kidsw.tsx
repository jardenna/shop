import Img from '../../components/Img';
import useLanguage from '../../features/language/useLanguage';
import { useGetShopProductsQuery } from '../../features/products/productApiSlice';
import ProductPageContainer from '../pageContainer/ProductPageContainer';

const Kids = () => {
  const { language } = useLanguage();

  const { data: products } = useGetShopProductsQuery({
    pageSize: '100',
    mainCategory: 'kids',
  });
  console.log(products);

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
