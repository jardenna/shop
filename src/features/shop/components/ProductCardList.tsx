import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import ProductCard, { type ProductCardProps } from './ProductCard';

type OmitteProductCardProps = Omit<ProductCardProps, 'product' | 'linkTo'>;

type ProductCardListProps = OmitteProductCardProps & {
  products: Array<BaseProduct | ProductPreview>;
  onReset: () => void;
};

const ProductCardList = ({
  products,
  productView = '',
  linkText,
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
              linkText={linkText}
              product={product}
            />
          </li>
        ))}
      </ErrorBoundary>
    </ul>
  );
};

export default ProductCardList;
