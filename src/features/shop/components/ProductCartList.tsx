import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCart, { BaseProductCart } from './ProductCart';

interface ProductCartListProps extends BaseProductCart {
  products: BaseProduct[];
  productView?: string;
  getProductLink: (id: string) => string;
}

const ProductCartList = ({
  products,
  productView,
  getProductLink,
  onOpenPanel,
  currentUser,
}: ProductCartListProps) => (
  <ul className={`product-cart-list ${productView}`}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCart
          productView={productView}
          linkTo={getProductLink(product.id)}
          product={product}
          isOutOfStock={product.countInStock === 0}
          onOpenPanel={onOpenPanel}
          currentUser={currentUser}
        />
      </li>
    ))}
  </ul>
);

export default ProductCartList;
