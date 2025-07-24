import { useParams } from 'react-router';
import Accordion from '../components/accordion/Accordion';
import Favorites from '../components/favorites/Favorites';
import Img from '../components/Img';
import ProductDiscountPrice from '../features/currency/components/ProductDiscountPrice';
import useLanguage from '../features/language/useLanguage';
import ShopProductForm from '../features/shop/components/ShopProductForm';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import MetaTags from '../layout/nav/MetaTags';
import { getColorOptions } from '../utils/colorUtils';
import './SingleProductPage.styles.scss';

const SingleProductPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: product } = useGetSingleProductQuery(id ?? '');

  const colorList = product
    ? getColorOptions({ colors: product.colors, language })
    : [];

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

      {product && (
        <article className="single-product-container">
          <ul className="product-img-list">
            {product.images.map((image) => (
              <li key={image}>
                <Img src={image} alt="" className="product-img" />
              </li>
            ))}
          </ul>
          <section className="single-product">
            <h1>{product.productName}</h1>
            <Favorites id={product.id} />
            <ProductDiscountPrice
              price={product.price}
              discount={product.discount}
            />
            <ShopProductForm selectedProduct={product} colorList={colorList} />

            <p>Brand: {product.brand}</p>
            <p>
              Stock:
              {product.countInStock < 5 ? 'Low in stock' : product.countInStock}
            </p>
            <Accordion accordionItems={accordionItems} />
          </section>
        </article>
      )}
    </div>
  );
};

export default SingleProductPage;
