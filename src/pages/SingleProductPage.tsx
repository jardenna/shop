import { useParams } from 'react-router';
import Accordion from '../components/accordion/Accordion';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import Img from '../components/Img';
import ProductColorList from '../components/ProductColorList';
import ProductSizeList from '../components/productSizeList/ProductSizeList';
import useLanguage from '../features/language/useLanguage';
import ProductDiscountPrice from '../features/products/components/ProductDiscountPrice';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';
import './SingleProductPage.styles.scss';

const SingleProductPage = () => {
  const { id, category } = useParams();
  const { data: product } = useGetSingleProductQuery(id ?? '');
  const { subMenu } = useSubMenu({ category });
  const { language } = useLanguage();

  const accordionItems = [
    { title: language.description, content: <p>{product?.description}</p> },
    {
      title: language.materialAndCare,
      content: (
        <>
          <p>
            <strong>{language.material}:</strong> {product?.material}
          </p>
          <strong>{language.care}</strong>
          <ul className="product-care-info">
            <li>{language.doNotBleach}</li>
            <li>{language.noTumbleDry}</li>
            <li>{language.machineWash}</li>
          </ul>
        </>
      ),
    },
    {
      title: language.paymentAndDelivery,
      content: (
        <>
          <p>
            <strong>{language.delivery}:</strong> {language.deliveryText}
          </p>
          <p>
            <strong>{language.payment}:</strong> {language.paymentText}
          </p>
        </>
      ),
    },
  ];

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
            <Accordion accordionItems={accordionItems} />
          </section>
        )}
      </article>
    </div>
  );
};

export default SingleProductPage;
