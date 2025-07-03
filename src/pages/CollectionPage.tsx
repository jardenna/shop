import { ErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Favorites from '../components/favorites/Favorites';
import Img from '../components/Img';
import ProductColorList from '../components/ProductColorList';
import ProductSizeList from '../components/productSizeList/ProductSizeList';
import Skeleton from '../components/skeleton/Skeleton';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import FilterPanel from '../features/shop/components/FilterPanel';
import ProductViews from '../features/shop/components/ProductViews';
import SizeOverlay from '../features/shop/components/SizeOverlay';
import {
  useGetProductsQuery,
  useGetShopMenuQuery,
} from '../features/shop/shopApiSlice';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import { ShopPath } from '../layout/nav/enums';
import MetaTags from '../layout/nav/MetaTags';
import './_collection-page.scss';
import ProductDiscountPrice from './product/ProductDiscountPrice';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category, categoryId } = useParams();

  // Redux hooks
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    pageSize: '100',
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

  const {
    data: subMenu,
    isLoading: subMenuLoading,
    refetch: refetchSubMenu,
  } = useGetShopMenuQuery(category || 'women');

  const categoryText = category ? language[category] : '';

  const [productView, setProuctView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const displayList = productView === 'list';

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
              <CollectionAside
                subMenu={subMenu || null}
                category={category || 'women'}
                isLoading={subMenuLoading}
                onReset={() => refetchSubMenu()}
                asideHeading={categoryText}
              />

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
                      onSelectProductView={setProuctView}
                    />
                    <FilterPanel />
                  </section>

                  <div
                    className={`product-card-list ${displayList ? 'list' : ''}`}
                  >
                    {products?.products.map((product) => (
                      <section className="product-card" key={product.id}>
                        <div className="img-container">
                          <Favorites id={product.id} />
                          {product.discount > 0 && (
                            <span className="product-badge">
                              - {product.discount} %
                            </span>
                          )}
                          <Link to={`/${ShopPath.Product}/${product.id}`}>
                            <Img
                              alt=""
                              src={product.images[0]}
                              className="product-card-img"
                            />
                          </Link>
                          {!displayList && (
                            <div className="product-overlay-items">
                              <SizeOverlay sizes={product.sizes} />
                            </div>
                          )}
                        </div>
                        <div className="product-card-content">
                          <h2 className="product-card-title">
                            {product.productName}
                          </h2>

                          {displayList && <p>{product.description}</p>}
                          <ProductDiscountPrice
                            price={product.price}
                            discount={product.discount || null}
                          />
                          {displayList && (
                            <ProductSizeList
                              sizes={product.sizes}
                              variant="shop-product"
                            />
                          )}
                          <ProductColorList
                            colours={product.colors}
                            count={3}
                            optionSize={displayList ? '' : 'small'}
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
