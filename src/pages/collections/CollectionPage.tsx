import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Favorite from '../../components/favorites/Favorite';
import IconContent from '../../components/IconContent';
import Icon from '../../components/icons/Icon';
import Img from '../../components/Img';
import ProductColorList from '../../components/ProductColorList';
import Skeleton from '../../components/skeleton/Skeleton';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetProductsQuery,
  useGetShopMenuQuery,
} from '../../features/shop/shopApiSlice';
import LayoutElement from '../../layout/LayoutElement';
import MetaTags from '../../layout/nav/MetaTags';
import { IconName } from '../../types/enums';
import ProductDiscountPrice from '../product/ProductDiscountPrice';
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
                  <div className="collection-filter">
                    <section className="filter-icons">
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
                    </section>
                    <section className="filter-text">
                      <span>{language.filter}</span>
                      <Icon
                        iconName={IconName.Filter}
                        title={language.filter}
                      />
                    </section>
                  </div>
                  <div className="product-card-list">
                    {products?.products.map((product) => (
                      <section key={product.id} className="product-card">
                        <div className="img-container">
                          <Favorite id={product.id} />
                          {product.discount > 0 && (
                            <span className="product-badge">
                              {language.sale}
                            </span>
                          )}
                          <Img
                            alt=""
                            src={product.images[0]}
                            className="product-card-img"
                          />
                        </div>

                        <div className="product-card-content">
                          <h2 className="product-card-title">
                            {product.productName}
                          </h2>

                          <ProductDiscountPrice
                            price={product.price}
                            discount={product.discount || 0}
                          />
                          <ProductColorList
                            colours={product.colors}
                            count={3}
                            optionSize="small"
                          />
                        </div>
                      </section>
                    ))}
                  </div>
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
