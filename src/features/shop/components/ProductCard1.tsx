import { ReactNode } from 'react';
import { Link } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
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
  product: BaseProduct;
  productView: ReactNode;
  showSizeOverlay: boolean;
};

const ProductCard1 = ({
  product,
  ariaLabelledby,
  showSizeOverlay,
  productView,
  linkText,
  linkTo,
}: ProductCardProps) => (
  <article aria-labelledby={ariaLabelledby} className="product-card">
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
      <div className="card-text-container">
        <h2 id={ariaLabelledby}>{product.productName}</h2>
        {productView === 'list' ? (
          <ProductCardListContent product={product} />
        ) : (
          <ProductCardGridContent product={product} />
        )}
      </div>
    </Link>
  </article>
);

export default ProductCard1;
