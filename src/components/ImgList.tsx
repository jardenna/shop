import { useLanguage } from '../features/language/useLanguage';
import Img from './Img';
import Badge from './badge/Badge';

type ImgListProps = {
  images: string[];
  isOutOfStock?: boolean;
};

const ImgList = ({ images, isOutOfStock }: ImgListProps) => {
  const { language } = useLanguage();

  return (
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
  );
};

export default ImgList;
