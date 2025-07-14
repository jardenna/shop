import { useParams } from 'react-router';
import Accordion from '../components/accordion/Accordion';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import Img from '../components/Img';
import ProductColorList from '../components/ProductColorList';
import ProductSizeList from '../components/productSizeList/ProductSizeList';
import ProductDiscountPrice from '../features/products/components/ProductDiscountPrice';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';
import './SingleProductPage.styles.scss';

const SingleProductPage = () => {
  const { id, category } = useParams();
  const { data: product } = useGetSingleProductQuery(id ?? '');
  const { subMenu } = useSubMenu({ category });

  return (
    <div className="container">
      <MetaTags metaTitle={product?.productName} />
      <Breadcrumbs
        routeList={breadcrumbsList}
        productName={product?.productName}
        subMenu={subMenu}
      />

      <article className="single-product-container">
        <ul>
          {product?.images.map((image) => (
            <li key={image}>
              <Img src={image} alt="" />
            </li>
          ))}
        </ul>
        {product && (
          <section>
            <h1>{product.productName}</h1>
            <ProductDiscountPrice
              price={product.price}
              discount={product.discount || null}
            />
            <ProductColorList colours={product.colors} />
            <ProductSizeList sizes={product.sizes} variant="shop-product" />
            <Accordion
              description={product.description}
              material={product.material}
            />
          </section>
        )}
      </article>
    </div>
  );
};

export default SingleProductPage;
