import { useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/shop/shopApiSlice';
import MainPageContainer from '../pageContainer/MainPageContainer';

const SingleProductPage = () => {
  const params = useParams();

  const { data: product } = useGetProductByIdQuery(params.id ?? '');
  console.log(product);

  const { language } = useLanguage();

  return (
    <MainPageContainer
      heading={language.login}
      className="page-small"
      currentLabel={product?.productName}
    >
      {language.add}
    </MainPageContainer>
  );
};

export default SingleProductPage;
