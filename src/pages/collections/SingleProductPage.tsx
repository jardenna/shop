import { useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/shop/shopApiSlice';

const SingleProductPage = () => {
  const params = useParams();

  const { data: product } = useGetProductByIdQuery(params.id ?? '');
  console.log(product);

  const { language } = useLanguage();

  return <section>{language.add}</section>;
};

export default SingleProductPage;
