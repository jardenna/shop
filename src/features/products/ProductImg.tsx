import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Figure from '../../components/figure/Figure';

type ProductImgProps = {
  alt: string;
  src: string;
  previewUrl?: string | null;
  Subtitle?: string;
  title?: string;
  refetch?: () => void;
};

const ProductImg = ({
  title,
  Subtitle,
  src,
  alt,
  previewUrl,
  refetch,
}: ProductImgProps) => {
  let imageSource = '/images/uploads/default.png';
  if (previewUrl?.trim()) {
    imageSource = previewUrl;
  } else if (src.trim()) {
    imageSource = `/images/uploads/${src}`;
  }

  return (
    <div className="record-img-container">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        <Figure
          src={imageSource}
          alt={alt}
          figcaption={
            <div className="record-img-header">
              <h2 className="record-img-title text-ellipsis">{title}</h2>
              {Subtitle && <h3 className="record-img-sub-title">{Subtitle}</h3>}
            </div>
          }
        />
      </ErrorBoundary>
    </div>
  );
};

export default ProductImg;
