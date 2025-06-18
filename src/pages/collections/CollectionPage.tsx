import { useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { useGetShopProductsQuery } from '../../features/products/productApiSlice';
import MainPageContainer from '../pageContainer/MainPageContainer';
import './_collection-page.scss';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category } = useParams();

  const { data: products } = useGetShopProductsQuery({
    pageSize: '100',
    mainCategory: category,
  });
  console.log(products);

  return (
    <MainPageContainer heading={language.collection}>
      {category} Collection page
    </MainPageContainer>
  );
};

export default CollectionPage;
