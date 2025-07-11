import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import ProductCard from '../features/shop/components/ProductCard';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';
import Img from '../components/Img';

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
      {product && <ProductCard product={product} displayList />}
      <article>
        <ul>
          {product?.images.map((image) => (
            <li key={image}>
              <Img src={image} alt="" />
            </li>
          ))}
        </ul>

        <section>
          <h1>{product?.productName}</h1>
        </section>
      </article>
    </div>
  );
};

export default SingleProductPage;
