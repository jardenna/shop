import { useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';

const ViewProductPage = () => {
  const { language } = useLanguage();
  const params = useParams();

  const { data: product } = useGetProductByIdQuery(params.id || '');

  console.log(product);

  return <section>{language.add}dd</section>;
};

export default ViewProductPage;
