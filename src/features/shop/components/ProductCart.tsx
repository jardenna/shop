import { useId } from 'react';
import { Link } from 'react-router';
import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import {
  BaseProduct,
  BaseShopProduct,
} from '../../../app/api/apiTypes/sharedApiTypes';
import Badge from '../../../components/badge/Badge';
import Button from '../../../components/Button';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import { BtnVariant } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';
import NotifyMe from './NotifyMe';
import './productCart.styles.scss';
import ProductCartGridContent from './ProductCartGridContent';
import ProductCartListContent from './ProductCartListContent';
import SizeOverlay from './SizeOverlay';

export type ProductCartProps = {
  linkTo: string;
  product: BaseProduct;
  currentUser?: UserResponse | null;
  isOutOfStock?: boolean;
  productView?: string;
  showSizeOverlay?: boolean;
  onOpenPanel?: (id: string) => void;
};

const ProductCart = ({
  product,
  showSizeOverlay,
  productView = '',
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
            <Img alt="" src={product.image} />
            {showSizeOverlay && <SizeOverlay sizes={product.sizes} count={5} />}
          </div>
        </Link>
        <FavoriteHeart id={product.id} className="product-cart-favorites" />
      </div>

      <div className="product-cart-content">
        <Link to={linkTo} tabIndex={-1}>
          <h2 className="product-cart-title" id={ariaLabelledby}>
            {product.productName}
          </h2>
          <div className="product-cart-info">
            {productView === 'list' ? (
              <ProductCartListContent product={product as BaseShopProduct} />
            ) : (
              <ProductCartGridContent product={product} />
            )}
          </div>
        </Link>
        {onOpenPanel &&
          (isOutOfStock ? (
            <div className="in-stock-container">
              <NotifyMe
                options={[]}
                id="notifyMe"
                isOutOfStock
                currentUser={currentUser ?? null}
                btnVariant={BtnVariant.Secondary}
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
