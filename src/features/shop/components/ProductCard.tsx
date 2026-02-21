import { Link } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import Badge from '../../../components/badge/Badge';
import Button from '../../../components/Button';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import { BtnVariant } from '../../../types/enums';
import { ariaInfoTitle } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';
import './ProductCard.styles.scss';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';
import SizeOverlay from './SizeOverlay';

export type ProductCardProps = {
  linkTo: string;
  product: BaseProduct | ProductPreview;
  productView?: string;
  showAdToCartBtn?: boolean;
  showSizeOverlay?: boolean;
};

const ProductCard = ({
  product,
  showSizeOverlay,
  productView = '',
  linkTo,
  showAdToCartBtn,
}: ProductCardProps) => {
  const { language } = useLanguage();
  const ariaLabelledby = ariaInfoTitle(product.id);

  return (
    <article aria-labelledby={ariaLabelledby} className="product-card">
      <div className="position-relative">
        <Link to={linkTo}>
          <VisuallyHidden>
            {language.view} {product.productName}
          </VisuallyHidden>
          <div className="card-img-container">
            {product.discount > 0 && (
              <Badge
                badgeText={`- ${product.discount} %`}
                className="discount"
              />
            )}
            <Img alt="" src={product.images[0]} />
            {showSizeOverlay && <SizeOverlay sizes={product.sizes} count={5} />}
          </div>
        </Link>
        <FavoriteHeart id={product.id} />
      </div>

      <div className="product-card-content">
        <Link to={linkTo} tabIndex={-1}>
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
        {showAdToCartBtn && (
          <Button variant={BtnVariant.Secondary}>{language.addToCart}</Button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
