import { useParams } from 'react-router';
import Img from '../components/Img';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';

const SingleProductPage = () => {
  const params = useParams();

  const { data: product } = useGetSingleProductQuery(params.id ?? '');

  // const { language } = useLanguage();

  return (
    <div>
      <MetaTags metaTitle={product?.productName} />

      <ul>
        {product?.images.map((image) => (
          <li key={image}>
            <Img src={image} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleProductPage;
