import type { BaseShopProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorList from './productLists/ColorList';
import ProductListItem from './productLists/ProductListItem';
import ProductPrice from './productPrice/ProductPrice';

type ProductCartListContentProps = {
  product: BaseShopProduct;
};

const ProductCartListContent = ({ product }: ProductCartListContentProps) => (
  <>
    <p className="product-cart-description">{product.description}</p>
    <ProductPrice price={product.price} discount={product.discount} />
    <ul className="product-list size-list">
      {product.allowedSizes.map((size) => (
        <ProductListItem
          key={size}
          text={size}
          unavailable={!product.sizes.includes(size)}
        />
      ))}
    </ul>

    <ColorList colors={product.colors} variant="small" />
  </>
);

export default ProductCartListContent;
