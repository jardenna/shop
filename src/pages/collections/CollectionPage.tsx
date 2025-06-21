import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Icon from '../../components/icons/Icon';
import Img from '../../components/Img';
import Skeleton from '../../components/skeleton/Skeleton';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetProductsQuery,
  useGetShopMenuQuery,
} from '../../features/shop/shopApiSlice';
import LayoutElement from '../../layout/LayoutElement';
import MetaTags from '../../layout/nav/MetaTags';
import { IconName } from '../../types/enums';
import './_collection-page.scss';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category } = useParams();

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    pageSize: '100',
    mainCategory: category,
  });
  console.log(products);

  const { data: subMenu } = useGetShopMenuQuery(category || 'women');

  const categoryText = category ? language[category] : '';

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page collection-page">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Breadcrumbs
              routeList={routeBreadcrumbs}
              currentLabel={categoryText}
            />
            <section className="collection-page-container">
              <aside className="collection-aside">
                <LayoutElement
                  ariaLabel={language.page}
                  as="header"
                  className="collection-header"
                >
                  <h1>{categoryText}</h1>
                </LayoutElement>
                <LayoutElement as="nav" ariaLabel={language.page}>
                  <ul className="collection-nav-list">
                    {subMenu?.data.map(({ label }) => (
                      <li className="collection-nav-item" key={label}>
                        {label}
                      </li>
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
                      <section className="collectiopn-filter">
                        <div className="filter-icons">
                          <Icon
                            iconName={IconName.LayoutGrid}
                            title={language.grid}
                            ariaLabel={language.viewAsGrid}
                          />
                          <Icon
                            iconName={IconName.LayoutList}
                            title={language.list}
                            ariaLabel={language.viewAsList}
                          />
                        </div>
                        <div>
                          <Icon
                            iconName={IconName.Filter}
                            title={language.filter}
                            ariaLabel={language.filterProducts}
                          />
                          <span>{language.filter}</span>
                        </div>
                      </section>
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
