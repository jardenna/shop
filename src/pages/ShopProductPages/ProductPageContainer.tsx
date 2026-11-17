import { ReactNode, useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import { ProductMenuResponse } from '../../app/api/apiTypes/shopApiTypes';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { saleBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import EmptyState from '../../components/emptyState/EmptyState';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Picture from '../../components/Picture';
import { useLanguage } from '../../features/language/useLanguage';
import { getProductLink } from '../../features/shop/cartUtils';
import ProductAside from '../../features/shop/components/ProductAside';
import ProductCartList from '../../features/shop/components/ProductCartList';
import MetaTags from '../../layout/MetaTags';
import MainPageContainer from '../pageContainer/MainPageContainer';

interface ProductPageContainerProps {
  altText: string;
  children: ReactNode;
  linkTo: string;
  pageHeading: string;
  path: string;
  products: BaseProduct[];
  productView: string;
  src: string;
  subMenu: ProductMenuResponse[];
  refetch: () => void;
  refetchSubMenu: () => void;
}

const ProductPageContainer = ({
  children,
  linkTo,
  subMenu,
  refetchSubMenu,
  refetch,
  productView,
  products,
  pageHeading,
  path,
  src,
  altText,
}: ProductPageContainerProps) => {
  const ariaLabelledby = useId();
  const { language } = useLanguage();

  if (products.length === 0) {
    return (
      <MainPageContainer heading={language.sale}>
        <EmptyState
          emptyStateTitle={language.noSaleTitle}
          emptyStateText={language.noSaleText}
          src="/images/shoppingBags/sale_shopping_bag"
          emptyStateCtaText={language.noSaleCta}
        />
      </MainPageContainer>
    );
  }

  return (
    <>
      <MetaTags metaTitle={pageHeading} />
      <section
        className="container shop-product-page"
        aria-labelledby={ariaLabelledby}
      >
        <Breadcrumbs routeList={saleBreadcrumbsList} subMenu={subMenu} />

        <div className="shop-product-page-container">
          <ProductAside
            className="sale-aside"
            ariaLabelledby={ariaLabelledby}
            subMenu={subMenu}
            headerText={pageHeading}
            onReset={() => {
              refetchSubMenu();
            }}
            language={language}
            getProductLink={(productId) => `/${path}/${productId}`}
            linkTo={linkTo}
          />

          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => {
              refetch();
            }}
          >
            <section>
              <Picture
                src={`${src}.jpg`}
                srcSet={src}
                alt={language[altText]}
                ratio="16:9"
                priority
                className="shop-product-banner"
              />
              {children}

              <ProductCartList
                products={products}
                getProductLink={getProductLink}
                productView={productView}
              />
            </section>
          </ErrorBoundary>
        </div>
      </section>
    </>
  );
};

export default ProductPageContainer;
