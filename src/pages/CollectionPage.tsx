import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useSearchParams } from 'react-router';
import { Size } from '../app/api/apiTypes/sharedApiTypes';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../components/breadcrumbs/breadcrumbsLists';
import DisplayControls from '../components/DisplayControls';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Img from '../components/Img';
import SkeletonCardList from '../components/skeleton/SkeletonCardList';
import useLanguage from '../features/language/useLanguage';
import CollectionAside from '../features/shop/components/CollectionAside';
import FilterPanel from '../features/shop/components/FilterPanel';
import ProductCard from '../features/shop/components/ProductCard';
import ProductCardGridContent from '../features/shop/components/ProductCardGridContent';
import ProductCardListContent from '../features/shop/components/ProductCardListContent';
import useSubMenu from '../features/shop/hooks/useSubMenu';
import { useGetProductsQuery } from '../features/shop/shopApiSlice';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import MetaTags from '../layout/nav/MetaTags';
import { IconName } from '../types/enums';
import { ChangeInputType } from '../types/types';
import './CollectionPage.styles.scss';

export type FilterValues = {
  brand: string[];
  sizes: Size[];
  [key: string]: string[] | Size[];
};

const CollectionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const { category, categoryId } = useParams();
  const initialState: FilterValues = {
    sizes: [],
    colors: [],
    brand: [],
  };
  const [filterValues, setFilterValues] = useState<FilterValues>(initialState);

  // Redux hooks
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    pageSize: '100',
    // colors: ['silver', 'black'],
    brand: filterValues.brand,
    sizes: filterValues.sizes,
    mainCategory: category,
    subCategoryId: categoryId || '',
  });

  const { subMenu, subMenuLoading, refetchSubMenu } = useSubMenu({ category });
  const categoryText = category ? language[category] : '';

  const handleFilterProducts = (event: ChangeInputType) => {
    const { name, value, checked } = event.target as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams);

    setFilterValues(() => {
      const currentValues = filterValues[name];
      if (checked) {
        const updatedValues = [...currentValues, value];
        newParams.set(name, JSON.stringify(updatedValues));
        return {
          ...filterValues,
          [name]: updatedValues,
        };
      } else {
        newParams.delete(name);
      }
      return {
        ...filterValues,
        [name]: currentValues.filter((item) => item !== value),
      };
    });

    setSearchParams(Object.fromEntries(newParams.entries()));
  };

  const [productView, setProuctView] = useLocalStorage(
    localStorageKeys.productView,
    'grid',
  );

  const productViewIconList = [
    {
      iconName: IconName.LayoutGrid,
      title: language.grid,
      ariaLabel: language.grid,
      display: 'grid',
    },
    {
      iconName: IconName.LayoutList,
      title: language.list,
      ariaLabel: language.list,
      display: 'list',
    },
  ];

  return (
    <>
      <MetaTags metaTitle={category} />
      <article className="container page collection-page">
        {subMenu && (
          <Breadcrumbs
            routeList={breadcrumbsList}
            subMenu={subMenu}
            productName=""
          />
        )}

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
            <div className="collection-page-content">
              <Img src={`/images/collections/${category}/banner.jpg`} alt="" />
              <section className="product-toolbar">
                <DisplayControls
                  onSetDisplay={setProuctView}
                  displayControlList={productViewIconList}
                  isActive={productView}
                  ariaLabel={language.productDisplay}
                />
                {products && (
                  <>
                    <span>
                      {products.productCount} {language.itemLabel}
                    </span>
                    <FilterPanel
                      onChange={handleFilterProducts}
                      values={filterValues}
                      availableBrands={products.availableBrands}
                      availableSizes={products.availableSizes}
                    />
                  </>
                )}
              </section>
              {isLoading ? (
                <SkeletonCardList count={8} />
              ) : (
                <article
                  className={`product-card-list ${productView === 'list' ? 'list' : ''}`}
                >
                  {products &&
                    products.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        linkTo={
                          categoryId ? product.id : `allProducts/${product.id}`
                        }
                        product={product}
                        showSizeOverlay={productView !== 'list'}
                      >
                        {productView === 'list' ? (
                          <ProductCardListContent product={product} />
                        ) : (
                          <ProductCardGridContent product={product} />
                        )}
                      </ProductCard>
                    ))}
                </article>
              )}
            </div>
          </ErrorBoundary>
        </div>
      </article>
    </>
  );
};

export default CollectionPage;
