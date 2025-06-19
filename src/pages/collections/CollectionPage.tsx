import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Img from '../../components/Img';
import Skeleton from '../../components/skeleton/Skeleton';
import useLanguage from '../../features/language/useLanguage';
import { useGetShopProductsQuery } from '../../features/products/productApiSlice';
import LayoutElement from '../../layout/LayoutElement';
import MetaTags from '../../layout/nav/MetaTags';
import { routeList } from '../../routes/routeConfig';
import './_collection-page.scss';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category } = useParams();

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetShopProductsQuery({
    pageSize: '100',
    mainCategory: category,
  });
  console.log(products);

  const categoryText = category ? language[category] : '';

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <LayoutElement
              ariaLabel={language.page}
              as="header"
              className="main-page-header"
            >
              <Breadcrumbs routeList={routeList} currentLabel={categoryText} />
              <Img src={`/images/collections/${category}/banner.jpg`} alt="" />
              <h1>{categoryText}</h1>
              <div>Filter</div>
            </LayoutElement>

            <div className="main-page">
              <ErrorBoundary
                FallbackComponent={ErrorBoundaryFallback}
                onReset={() => refetch}
              >
                <article className="product-page-container">
                  <ul className="left-panel">
                    <li>Tøj</li>
                    <li>Sko</li>
                    <li>Accessories</li>
                    <li>Legetøj</li>
                  </ul>
                  <section>Products</section>
                </article>
              </ErrorBoundary>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default CollectionPage;
