import { Link } from 'react-router';
import {
  BaseProduct,
  BaseShopProduct,
} from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCartGridContent from './ProductCartGridContent';
import ProductCartListContent from './ProductCartListContent';

interface ProductCartContentProps {
  ariaLabelledby: string;
  linkTo: string;
  product: BaseProduct;
  productView?: string;
}
//
const ProductCartContent = ({
  ariaLabelledby,
  product,
  productView = 'grid',
  linkTo,
}: ProductCartContentProps) => (
  <div className="product-cart-content">
    <Link to={linkTo} tabIndex={-1}>
      <h2 className="product-cart-title" id={ariaLabelledby}>
        {product.productName}
      </h2>
      <div className="product-cart-info">
        {productView === 'list' ? (
          <ProductCartListContent product={product as BaseShopProduct} />
        ) : (
          <ProductCartGridContent
            discount={product.discount}
            price={product.price}
            colors={product.colors}
          />
        )}
      </div>
    </Link>
  </div>
);

export default ProductCartContent;
