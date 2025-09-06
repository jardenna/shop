import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import type { AccordionItem } from '../components/accordion/Accordion';
import Accordion from '../components/accordion/Accordion';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import FavoriteHeart from '../components/favorites/FavoriteHeart';
import ImgList from '../components/ImgList';
import SkeletonSinglePage from '../components/skeleton/skeletonSinglePage/SkeletonSinglePage';
import useAuth from '../features/auth/hooks/useAuth';
import ProductDiscountPrice from '../features/currency/components/ProductDiscountPrice';
import useLanguage from '../features/language/useLanguage';
import ReviewsDisplay from '../features/products/components/reviews/ReviewsDisplay';
import ReviewsForm from '../features/products/components/reviews/ReviewsForm';
import ReviewStars from '../features/products/components/reviews/ReviewStars';
import { getStarsArray } from '../features/products/components/reviews/reviewsUtil.';
import InStock from '../features/shop/components/InStock';
import NotifyMe from '../features/shop/components/NotifyMe';
import ShopProductForm from '../features/shop/components/ShopProductForm';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
import LayoutElement from '../layout/LayoutElement';
import MetaTags from '../layout/nav/MetaTags';
import { getColorOptions } from '../utils/colorUtils';
import { getDisplaySizes } from '../utils/sizeUtils';
import './SingleProductPage.styles.scss';

const SingleProductPage = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetSingleProductQuery(id ?? '');

  const colorList = product
    ? getColorOptions({ colors: product.colors, language })
    : [];

  const accordionItems: AccordionItem[] = [
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
    {
      title: language.reviews,
      additionalTitle: product ? `(${product.numReviews})` : '',
      content:
        product && product.rating > 0 ? (
          <ReviewsDisplay
            reviewList={product.reviews}
            numOfReviews={product.numReviews}
          />
        ) : (
          <span>{language.noReview}</span>
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
      {isLoading && <SkeletonSinglePage />}
      {product && (
        <article className="single-product-container">
          <ImgList images={product.images} onReset={() => refetch} />
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
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
                <ReviewStars
                  stars={getStarsArray(product.rating)}
                  rating={product.rating}
                />
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
                {id && currentUser && <ReviewsForm productId={id} />}
                <ShopProductForm
                  selectedProduct={product}
                  colorList={colorList}
                  displaySizeList={displaySizeList}
                />
                <Accordion accordionItems={accordionItems} />
              </div>
            </section>
          </ErrorBoundary>
        </article>
      )}
    </div>
  );
};

export default SingleProductPage;
