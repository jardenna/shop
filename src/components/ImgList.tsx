import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';
import Img from './Img';

type ImgListProps = {
  images: string[];
  onReset: () => void;
};

const ImgList = ({ images, onReset }: ImgListProps) => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
    <ul className="product-img-list">
      {images.map((url) => (
        <li key={url}>
          <Img src={url} alt="" className="product-img" />
        </li>
      ))}
    </ul>
  </ErrorBoundary>
);

export default ImgList;
