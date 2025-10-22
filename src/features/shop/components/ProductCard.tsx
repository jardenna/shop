import { Link } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import Badge from '../../../components/Badge';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import './ProductCard.styles.scss';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';
import SizeOverlay from './SizeOverlay';

export type ProductCardProps = {
  ariaLabelledby: string;
  linkText: string;
  linkTo: string;
  product: BaseProduct | ProductPreview;
  productView?: string;
  showSizeOverlay?: boolean;
  onReset: () => void;
};

const ProductCard = ({
  product,
  ariaLabelledby,
  showSizeOverlay,
  productView = '',
  linkText,
  linkTo,
}: ProductCardProps) => (
  <article aria-labelledby={ariaLabelledby} className="product-card">
    <div>
      <FavoriteHeart id={product.id} />
      <Link
        to={linkTo}
        aria-labelledby={ariaLabelledby}
        className="product-card-link"
      >
        <VisuallyHidden>
          {linkText} {product.productName}
        </VisuallyHidden>
        <div className="card-img-container">
          {product.discount > 0 && (
            <Badge badgeText={`- ${product.discount} %`} className="discount" />
          )}
          <Img alt="" src={product.images[0]} />
          {showSizeOverlay && <SizeOverlay sizes={product.sizes} count={5} />}
        </div>
      </Link>
    </div>

    <div className="product-card-content">
      <Link
        to={linkTo}
        aria-labelledby={ariaLabelledby}
        className="product-card-link"
        tabIndex={-1}
      >
        <h2 className="product-card-title" id={ariaLabelledby}>
          {product.productName}
        </h2>
        <div className="product-card-info">
          {productView === 'list' ? (
            <ProductCardListContent product={product as BaseProduct} />
          ) : (
            <ProductCardGridContent product={product} />
          )}
        </div>
      </Link>
    </div>
  </article>
);

export default ProductCard;
