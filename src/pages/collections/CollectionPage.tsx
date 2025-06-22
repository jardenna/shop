import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import IconContent from '../../components/IconContent';
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
            <div className="collection-page-container">
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

              <ErrorBoundary
                FallbackComponent={ErrorBoundaryFallback}
                onReset={() => refetch()}
              >
                <div>
                  <Img
                    src={`/images/collections/${category}/banner.jpg`}
                    alt=""
                  />
                  <section className="collection-filter">
                    <div className="filter-icons">
                      <IconContent
                        iconName={IconName.LayoutList}
                        title={language.list}
                        ariaLabel={language.viewAsList}
                        size="18"
                      />
                      <IconContent
                        iconName={IconName.LayoutGrid}
                        title={language.grid}
                        ariaLabel={language.viewAsGrid}
                        size="16"
                      />
                      {products?.productCount && (
                        <span>
                          {products.productCount} {language.products}
                        </span>
                      )}
                    </div>
                    <div className="filter-text">
                      <span>{language.filter}</span>
                      <Icon
                        iconName={IconName.Filter}
                        title={language.filter}
                      />
                    </div>
                  </section>
                  <section className="collection-list">
                    {products?.products.map((product) => (
                      <div key={product.id}>
                        <Img alt="" src={product.images[0]} />
                      </div>
                    ))}
                  </section>
                </div>
              </ErrorBoundary>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default CollectionPage;
