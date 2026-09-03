import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { ShopPath } from '../../../layout/nav/enums';
import ProductCart from './ProductCart';

interface ProductCartListProps {
  products: BaseProduct[];
  productView: string;
  showSizeOverlay: boolean;
  categoryId?: string;
}

const ProductCartList = ({
  products,
  productView,
  showSizeOverlay,
  categoryId,
}: ProductCartListProps) => (
  <ul className={`product-cart-list ${productView}`}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCart
          showSizeOverlay={showSizeOverlay}
          productView={productView}
          linkTo={
            categoryId ? product.id : `${ShopPath.AllProducts}/${product.id}`
          }
          product={product}
          isOutOfStock={product.countInStock === 0}
        />
      </li>
    ))}
  </ul>
);

export default ProductCartList;
