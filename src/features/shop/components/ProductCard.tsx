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
import { ariaInfoTitle } from '../../../utils/utils';
import { useLanguage } from '../../language/useLanguage';
import NotifyMe from './NotifyMe';
import './ProductCard.styles.scss';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';
import SizeOverlay from './SizeOverlay';

export type ProductCardProps = {
  linkTo: string;
  product: BaseProduct;
  currentUser?: UserResponse | null;
  isOutOfStock?: boolean;
  productView?: string;
  showSizeOverlay?: boolean;
  onOpenPanel?: (id: string) => void;
};

const ProductCard = ({
  product,
  showSizeOverlay,
  productView = '',
  linkTo,
  onOpenPanel,
  currentUser,
  isOutOfStock,
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
            {isOutOfStock && (
              <Badge
                badgeText={language.outOfStock}
                className="out-of-stock "
              />
            )}
            <Img alt="" src={product.image} />
            {showSizeOverlay && <SizeOverlay sizes={product.sizes} count={5} />}
          </div>
        </Link>
        <FavoriteHeart id={product.id} className="product-cart-favorites" />
      </div>

      <div className="product-card-content">
        <Link to={linkTo} tabIndex={-1}>
          <h2 className="product-card-title" id={ariaLabelledby}>
            {product.productName}
          </h2>
          <div className="product-card-info">
            {productView === 'list' ? (
              <ProductCardListContent product={product as BaseShopProduct} />
            ) : (
              <ProductCardGridContent product={product} />
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

export default ProductCard;
