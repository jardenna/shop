import { ErrorBoundary } from 'react-error-boundary';
import { useLanguage } from '../features/language/useLanguage';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';
import Img from './Img';
import Badge from './badge/Badge';

type ImgListProps = {
  images: string[];
  isOutOfStock?: boolean;
  onReset?: () => void;
};

const ImgList = ({ images, onReset, isOutOfStock }: ImgListProps) => {
  const { language } = useLanguage();

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <ul className="product-img-list">
        {images.map((url) => (
          <li key={url} className="product-img-item">
            {isOutOfStock && (
              <div className="badge-container">
                <Badge
                  badgeText={language.outOfStock}
                  className="out-of-stock"
                  variant="medium"
                />
              </div>
            )}
            <Img src={url} alt="" className="product-img" />
          </li>
        ))}
      </ul>
    </ErrorBoundary>
  );
};

export default ImgList;
