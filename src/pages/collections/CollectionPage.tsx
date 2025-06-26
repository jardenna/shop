import { ErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Favorites from '../../components/favorites/Favorites';
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
import ProductDiscountPrice from '../product/ProductDiscountPrice';
import './_collection-page.scss';
import FilterPanel from './FilterPanel';
import ProductViews from './ProductViews';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category } = useParams();

  // Redux hooks

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

                  <section className="product-toolbar">
                    <ProductViews
                      productCount={products?.productCount || null}
                    />
                    <FilterPanel />
                  </section>

                  <div className="product-card-list">
                    {products?.products.map((product) => (
                      <div key={product.id}>
                        <section className="product-card">
                          <div className="img-container">
                            <Favorites id={product.id} />
                            <Link to={product.id}>
                              <Img
                                alt=""
                                src={product.images[0]}
                                className="product-card-img"
                              />
                            </Link>
                            <div className="product-overlay-items">
                              {product.discount > 0 && (
                                <span className="product-badge">
                                  {language.sale}
                                </span>
                              )}
                              <ul className="size-overlay">
                                {product.sizes.map((size) => (
                                  <li key={size}>{size}</li>
                                ))}
                              </ul>
                            </div>
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
                      </div>
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
