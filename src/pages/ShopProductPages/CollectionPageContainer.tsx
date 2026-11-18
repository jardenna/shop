import { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseProduct } from '../../app/api/apiTypes/sharedApiTypes';
import type { ProductMenuResponse } from '../../app/api/apiTypes/shopApiTypes';
import Breadcrumbs, {
  BreadcrumbsListProps,
} from '../../components/breadcrumbs/Breadcrumbs';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Picture from '../../components/Picture';
import { useLanguage } from '../../features/language/useLanguage';
import ProductAside from '../../features/shop/components/ProductAside';
import ProductCartList from '../../features/shop/components/ProductCartList';
import MetaTags from '../../layout/MetaTags';
import './shopProductPage.styles.scss';

interface ProductPageContainerProps {
  altText: string;
  ariaLabelledby: string;
  breadcrumbsList: BreadcrumbsListProps[];
  children: ReactElement;
  pageHeading: string;
  path: string;
  products: BaseProduct[];
  productView: string;
  src: string;
  subMenu: ProductMenuResponse[];
  hideSubMenu?: boolean;
  refetch: () => void;
  refetchSubMenu: () => void;
}

const CollectionPageContainer = ({
  children,
  subMenu,
  refetchSubMenu,
  refetch,
  productView,
  products,
  pageHeading,
  hideSubMenu,
  ariaLabelledby,
  path,
  src,
  altText,
  breadcrumbsList,
}: ProductPageContainerProps) => {
  const { language } = useLanguage();

  return (
    <>
      <MetaTags metaTitle={pageHeading} />

      <Breadcrumbs
        subMenu={subMenu}
        productName=""
        routeList={breadcrumbsList}
      />

      {!hideSubMenu && (
        <ProductAside
          headerText={pageHeading}
          ariaLabelledby={ariaLabelledby}
          subMenu={subMenu}
          linkToAllProducts={path}
          onReset={() => {
            refetchSubMenu();
          }}
          language={language}
          basePath={path}
        />
      )}

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => {
          refetch();
        }}
      >
        <section className="shop-product-content">
          <Picture
            src={src}
            srcSet={src}
            alt={altText}
            ratio="16:9"
            priority
            className="shop-product-banner"
          />

          {children}

          <ProductCartList products={products} productView={productView} />
        </section>
      </ErrorBoundary>
    </>
  );
};

export default CollectionPageContainer;
