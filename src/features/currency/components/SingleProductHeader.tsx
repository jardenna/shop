import { ErrorBoundary } from 'react-error-boundary';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import LayoutElement from '../../../layout/LayoutElement';
import useLanguage from '../../language/useLanguage';

type SingleProductHeaderProps = {
  product: BaseProduct;
  onReset: () => void;
};

const SingleProductHeader = ({
  product,
  onReset,
}: SingleProductHeaderProps) => {
  const { language } = useLanguage();
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <LayoutElement>
        <p>
          {language.brand}: {product.brand}
        </p>
        <div className="single-product-heading">
          <h1 id={`product-${product.id}-title`}>{product.productName}</h1>
          <FavoriteHeart id={product.id} />
        </div>
      </LayoutElement>
    </ErrorBoundary>
  );
};

export default SingleProductHeader;
