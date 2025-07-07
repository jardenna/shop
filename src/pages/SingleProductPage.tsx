import { useParams } from 'react-router';
import { routeBreadcrumbs } from '../components/breadcrumbs/breadcrumbsRoutes';
import UnifiedBreadcrumbs from '../components/breadcrumbs/UnifiedBreadcrumbs ';
import Img from '../components/Img';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';

const SingleProductPage = () => {
  const { category, id } = useParams();

  const { data: product } = useGetSingleProductQuery(id ?? '');
  const { subMenu } = useSubMenu({ category });

  // const { language } = useLanguage();

  return (
    <div>
      <MetaTags metaTitle={product?.productName} />
      {subMenu && (
        <UnifiedBreadcrumbs
          routeList={routeBreadcrumbs}
          subMenu={subMenu}
          productName={product?.productName}
        />
      )}

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
