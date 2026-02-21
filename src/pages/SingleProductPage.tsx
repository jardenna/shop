import { useParams } from 'react-router';
import type { AccordionList } from '../components/accordion/Accordion';
import Accordion from '../components/accordion/Accordion';
import ImgList from '../components/ImgList';
import SkeletonSinglePage from '../components/skeleton/skeletonSinglePage/SkeletonSinglePage';
import useAuth from '../features/auth/hooks/useAuth';
import useLanguage from '../features/language/useLanguage';
import InStock from '../features/shop/components/InStock';
import NotifyMe from '../features/shop/components/NotifyMe';
import ProductCareList from '../features/shop/components/ProductCareList';
import ProductPrice from '../features/shop/components/productPrice/ProductPrice';
import ReviewList from '../features/shop/components/reviews/ReviewList';
import ReviewsForm from '../features/shop/components/reviews/ReviewsForm';
import ReviewStars from '../features/shop/components/reviews/ReviewStars';
import { getStarsArray } from '../features/shop/components/reviews/reviewsUtil.';
import SingleProductForm from '../features/shop/components/SingleProductForm';
import SingleProductHeader from '../features/shop/components/SingleProductHeader';
import { useGetSingleProductQuery } from '../features/shop/shopApiSlice';
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
        <div className="single-product-container">
          <ImgList images={product.images} onReset={() => refetch} />
          <section
            className="single-product"
            aria-labelledby={`product-${product.id}-title`}
          >
            <div className="single-product-content">
              <SingleProductHeader onReset={() => refetch} product={product} />
              <ReviewStars
                stars={getStarsArray(product.rating)}
                rating={product.rating}
                onReset={() => refetch}
              />
              <ProductPrice
                price={product.price}
                discountPrice={product.discount}
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
              {id && currentUser && (
                <ReviewsForm productId={id} onReset={() => refetch} />
              )}
              <SingleProductForm
                onReset={() => refetch}
                selectedProduct={product}
                colorList={colorList}
                displaySizeList={displaySizeList}
              />
              <Accordion
                accordionList={accordionList}
                onReset={() => refetch}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
