import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import Img from '../components/Img';
import ProductCardListContent from '../features/shop/components/ProductCardListContent';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';

const SingleProductPage = () => {
  const { id, category } = useParams();

  const { data: product } = useGetSingleProductQuery(id ?? '');
  const { subMenu } = useSubMenu({ category });

  return (
    <div>
      <MetaTags metaTitle={product?.productName} />
      <Breadcrumbs
        routeList={breadcrumbsList}
        productName={product?.productName}
        subMenu={subMenu}
      />

      <article>
        <ul>
          {product?.images.map((image) => (
            <li key={image}>
              <Img src={image} alt="" />
            </li>
          ))}
        </ul>
        <h1>{product?.productName}</h1>
        {product && <ProductCardListContent product={product} />}
      </article>
    </div>
  );
};

export default SingleProductPage;
