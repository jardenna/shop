import { useParams } from 'react-router';
import Img from '../../components/Img';
import { useGetProductByIdQuery } from '../../features/shop/shopApiSlice';

const SingleProductPage = () => {
  const params = useParams();

  const { data: product } = useGetProductByIdQuery(params.id ?? '');

  // const { language } = useLanguage();

  return (
    <div>
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
