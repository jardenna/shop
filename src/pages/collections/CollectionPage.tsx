import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Img from '../../components/Img';
import Skeleton from '../../components/skeleton/Skeleton';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetShopMenuQuery,
  useGetShopProductsQuery,
} from '../../features/products/productApiSlice';
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

  const { data: subMenu } = useGetShopMenuQuery(category || 'women');

  const categoryText = category ? language[category] : '';

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Breadcrumbs routeList={routeList} currentLabel={categoryText} />
            <section className="collection-page">
              <aside className="collection-aside">
                <LayoutElement
                  ariaLabel={language.page}
                  as="header"
                  className="collection-header"
                >
                  <h1>{categoryText}</h1>
                </LayoutElement>
                <LayoutElement as="nav" ariaLabel={language.page}>
                  <ul className="left-menu">
                    {subMenu?.data.map(({ label }) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                </LayoutElement>
              </aside>
              <section>
                <div>
                  <Img
                    src={`/images/collections/${category}/banner.jpg`}
                    alt=""
                  />
                </div>
                <div>
                  <ErrorBoundary
                    FallbackComponent={ErrorBoundaryFallback}
                    onReset={() => refetch}
                  >
                    <article className="product-page-container">
                      <div>filter</div>
                      <section>Products</section>
                    </article>
                  </ErrorBoundary>
                </div>
              </section>
            </section>
          </>
        )}
      </article>
    </>
  );
};

export default CollectionPage;
