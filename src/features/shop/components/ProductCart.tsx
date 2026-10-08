import { useId } from 'react';
import { Link } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Badge from '../../../components/badge/Badge';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import { useLanguage } from '../../language/useLanguage';
import './productCart.styles.scss';
import ProductCartContent from './ProductCartContent';
import SizeOverlay from './SizeOverlay';

interface ProductCartProps {
  linkTo: string;
  product: BaseProduct;
  isOutOfStock?: boolean;
  productView?: string;
}

const ProductCart = ({
  product,
  productView = 'grid',
  linkTo,
  isOutOfStock,
}: ProductCartProps) => {
  const ariaLabelledby = useId();
  const { language } = useLanguage();

  return (
    <article aria-labelledby={ariaLabelledby} className="product-cart">
      <div className="position-relative">
        <Link to={linkTo}>
          <VisuallyHidden>
            {language.view} {product.productName}
          </VisuallyHidden>
          <div className="cart-img-container">
            <div className="badge-container">
              {product.discount > 0 && (
                <Badge
                  badgeText={`- ${product.discount} %`}
                  className="discount"
                  variant="medium"
                />
              )}
              {isOutOfStock && (
                <Badge
                  badgeText={language.outOfStock}
                  className="out-of-stock"
                  variant="medium"
                />
              )}
            </div>
            <Img alt="" src={product.image} />
            {productView === 'grid' && (
              <SizeOverlay sizes={product.sizes} count={5} />
            )}
          </div>
        </Link>
        <FavoriteHeart id={product.id} className="product-cart-favorites" />
      </div>

      <div className="product-cart-content">
        <ProductCartContent
          ariaLabelledby={ariaLabelledby}
          linkTo={linkTo}
          product={product}
          productView={productView}
        />
      </div>
    </article>
  );
};

export default ProductCart;
