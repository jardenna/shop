import { useParams } from 'react-router';
import { Size } from '../app/api/apiTypes/sharedApiTypes';
import Accordion from '../components/accordion/Accordion';
import FavoriteHeart from '../components/favorites/FavoriteHeart';
import Img from '../components/Img';
import useAuth from '../features/auth/hooks/useAuth';
import ProductDiscountPrice from '../features/currency/components/ProductDiscountPrice';
import useLanguage from '../features/language/useLanguage';
import InStock from '../features/shop/components/InStock';
import NotifyMe from '../features/shop/components/NotifyMe';
import ShopProductForm from '../features/shop/components/ShopProductForm';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import LayoutElement from '../layout/LayoutElement';
import MetaTags from '../layout/nav/MetaTags';
import { getColorOptions } from '../utils/colorUtils';
import { getDisplaySizes } from '../utils/sizeUtils';
import './SingleProductPage.styles.scss';

export type InitialNotifyValues = {
  email: string;
  sizes: Size[];
};

const SingleProductPage = () => {
  const { currentUser } = useAuth();
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

  const displaySizeList = product
    ? getDisplaySizes({
        mainKey: product.categoryName,
        subKey: product.subCategoryName,
        availableSizes: product.sizes,
      })
    : [];

  const missingSizes = displaySizeList.filter(
    (size) => !product?.sizes.includes(size),
  );

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
            <div className="single-product-content">
              <p>
                {language.brand}: {product.brand}
              </p>
              <LayoutElement
                ariaLabel={language.product}
                className="single-product-header"
              >
                <h1>{product.productName}</h1>
                <FavoriteHeart id={product.id} />
              </LayoutElement>
              <ProductDiscountPrice
                price={product.price}
                discount={product.discount}
              />
              <div className="in-stock-container">
                <InStock stock={product.countInStock} />
                {(missingSizes.length > 0 || product.countInStock === 0) && (
                  <NotifyMe
                    options={missingSizes}
                    id="notifyMe"
                    sizesIsRequered={missingSizes.length > 0}
                    currentUser={currentUser}
                  />
                )}
              </div>
              <ShopProductForm
                selectedProduct={product}
                colorList={colorList}
                displaySizeList={displaySizeList}
              />

              <Accordion accordionItems={accordionItems} />
            </div>
          </section>
        </article>
      )}
    </div>
  );
};

export default SingleProductPage;
