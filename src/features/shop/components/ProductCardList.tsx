import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import type { OmitChecked } from '../../../types/types';
import ProductCard, { type ProductCardProps } from './ProductCard';

type OmitteProductCardProps = OmitChecked<
  ProductCardProps,
  'product' | 'linkTo'
>;

type ProductCardListProps = OmitteProductCardProps & {
  products: Array<BaseProduct | ProductPreview>;
  onReset: () => void;
};

const ProductCardList = ({
  products,
  productView = '',
  onReset,
  showSizeOverlay,
}: ProductCardListProps) => {
  const { categoryId } = useParams();

  return (
    <ul className={`product-card-list ${productView}`}>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              showSizeOverlay={showSizeOverlay}
              productView={productView}
              linkTo={categoryId ? product.id : `all-products/${product.id}`}
              product={product}
            />
          </li>
        ))}
      </ErrorBoundary>
    </ul>
  );
};

export default ProductCardList;
