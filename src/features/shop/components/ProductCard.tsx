import type { ElementType, ReactNode } from 'react';
import { Link } from 'react-router';
import type { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import Badge from '../../../components/Badge';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import LayoutElement from '../../../layout/LayoutElement';
import useLanguage from '../../language/useLanguage';
import './ProductCard.styles.scss';
import SizeOverlay from './SizeOverlay';

type ProductCardProps = {
  children: ReactNode;
  linkTo: string;
  product: ProductPreview;
  showSizeOverlay?: boolean;
  tag?: ElementType;
};

const ProductCard = ({
  showSizeOverlay,
  product,
  linkTo,
  children,
  tag = 'h2',
}: ProductCardProps) => {
  const { language } = useLanguage();

  const ariaLabelledby = `product-card-title-${product.id}`;

  return (
    <article className="product-card" aria-labelledby={ariaLabelledby}>
      <div className="product-img-container">
        <FavoriteHeart id={product.id} />
        {product.discount > 0 && (
          <Badge badgeText={`- ${product.discount} %`} className="discount" />
        )}
        <Link to={linkTo}>
          <VisuallyHidden>
            {language.view} {product.productName}
          </VisuallyHidden>
          <Img alt="" src={product.images[0]} className="product-card-img" />
        </Link>
        {showSizeOverlay && <SizeOverlay sizes={product.sizes} count={5} />}
      </div>
      <div className="product-card-content">
        <LayoutElement
          as={tag}
          ariaLabelledby={ariaLabelledby}
          className="product-card-title"
        >
          {product.productName}
        </LayoutElement>
        {children}
      </div>
    </article>
  );
};

export default ProductCard;
