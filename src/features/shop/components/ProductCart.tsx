import { useId } from 'react';
import { Link } from 'react-router';
import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Badge from '../../../components/badge/Badge';
import Button from '../../../components/Button';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import { BtnVariant } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';
import NotifyMeForm from './NotifyMeForm';
import './productCart.styles.scss';
import ProductCartContent from './ProductCartContent';
import SizeOverlay from './SizeOverlay';

export interface BaseProductCart {
  currentUser?: UserResponse | null;
  onOpenPanel?: (id: string) => void;
}

interface ProductCartProps extends BaseProductCart {
  linkTo: string;
  product: BaseProduct;
  isOutOfStock?: boolean;
  productView?: string;
}

const ProductCart = ({
  product,
  productView = 'grid',
  linkTo,
  onOpenPanel,
  currentUser,
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

        {onOpenPanel &&
          (isOutOfStock ? (
            <div className="in-stock-container">
              <NotifyMeForm
                options={[]}
                isOutOfStock
                currentUser={currentUser ?? null}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                onOpenPanel(product.id);
              }}
              variant={BtnVariant.Secondary}
            >
              {language.addToCart}
            </Button>
          ))}
      </div>
    </article>
  );
};

export default ProductCart;
