import { Link } from 'react-router';
import type {
  BaseProduct,
  BaseShopProduct,
} from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';

interface ProductCardContentProps {
  ariaLabelledby: string;
  linkTo: string;
  product: BaseProduct;
  productView: string;
}

const ProductCardContent = ({
  ariaLabelledby,
  product,
  productView,
  linkTo,
}: ProductCardContentProps) => (
  <div className="product-card-content">
    <Link to={linkTo} tabIndex={-1}>
      <h2 className="product-card-title" id={ariaLabelledby}>
        {product.productName}
      </h2>
      <div className="product-card-info">
        {productView === 'list' ? (
          <ProductCardListContent product={product as BaseShopProduct} />
        ) : (
          <ProductCardGridContent
            discount={product.discount}
            price={product.price}
            colors={product.colors}
          />
        )}
      </div>
    </Link>
  </div>
);

export default ProductCardContent;
