import { useParams } from 'react-router';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../../../components/breadcrumbs/breadcrumbsRoutes';
import Img from '../../../components/Img';
import { useGetProductByIdQuery } from '../../../features/shop/shopApiSlice';
import MetaTags from '../../../layout/nav/MetaTags';

const SingleProductPage = () => {
  const params = useParams();

  const { data: product } = useGetProductByIdQuery(params.id ?? '');

  // const { language } = useLanguage();

  return (
    <div>
      <MetaTags metaTitle={product?.productName} />
      <Breadcrumbs
        routeList={routeBreadcrumbs}
        currentLabel={product?.productName}
      />
      aaa
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
