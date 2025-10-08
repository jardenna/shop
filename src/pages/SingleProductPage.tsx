import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import type { AccordionList } from '../components/accordion/Accordion';
import Accordion from '../components/accordion/Accordion';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import FavoriteHeart from '../components/favorites/FavoriteHeart';
import ImgList from '../components/ImgList';
import SkeletonSinglePage from '../components/skeleton/skeletonSinglePage/SkeletonSinglePage';
import useAuth from '../features/auth/hooks/useAuth';
import ProductDiscountPrice from '../features/currency/components/ProductDiscountPrice';
import useLanguage from '../features/language/useLanguage';
import InStock from '../features/shop/components/InStock';
import NotifyMe from '../features/shop/components/NotifyMe';
import ProductCareList from '../features/shop/components/ProductCareList';
import ReviewList from '../features/shop/components/reviews/ReviewList';
import ReviewsForm from '../features/shop/components/reviews/ReviewsForm';
import ReviewStars from '../features/shop/components/reviews/ReviewStars';
import { getStarsArray } from '../features/shop/components/reviews/reviewsUtil.';
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

  const accordionList: AccordionList[] = [
    { title: language.description, content: <p>{product?.description}</p> },
    {
      title: language.materialAndCare,
      content: (
        <>
          <p>
            <strong>{language.material}:</strong> {product?.material}
          </p>
          <ProductCareList
            title={language.care}
            careList={[
              language.doNotBleach,
              language.noTumbleDry,
              language.machineWash,
            ]}
          />
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
      additionalTitle:
        product && product.numReviews > 0 ? product.numReviews : '',
      content:
        product && product.rating > 0 ? (
          <ReviewList
            reviewList={product.reviews}
            title={`${language.numberOfReviews} ${product.numReviews}`}
            onReset={() => refetch}
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
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => refetch}
                >
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
                </ErrorBoundary>

                <ReviewStars
                  stars={getStarsArray(product.rating)}
                  rating={product.rating}
                  onReset={() => refetch}
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

                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => refetch}
                >
                  <ShopProductForm
                    selectedProduct={product}
                    colorList={colorList}
                    displaySizeList={displaySizeList}
                  />
                </ErrorBoundary>
                <ErrorBoundary
                  FallbackComponent={ErrorBoundaryFallback}
                  onReset={() => refetch}
                >
                  <Accordion accordionList={accordionList} />
                </ErrorBoundary>
              </div>
            </section>
          </ErrorBoundary>
        </article>
      )}
    </div>
  );
};

export default SingleProductPage;
