import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCart from './ProductCart';

interface ProductCartListProps {
  products: BaseProduct[];
  productView: string;
  showSizeOverlay: boolean;
  currentUser?: UserResponse | null;
  getProductLink: (id: string) => string;
  onOpenPanel?: (id: string) => void;
}

const ProductCartList = ({
  products,
  productView,
  showSizeOverlay,
  getProductLink,
  onOpenPanel,
  currentUser,
}: ProductCartListProps) => (
  <ul className={`product-cart-list ${productView}`}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCart
          showSizeOverlay={showSizeOverlay}
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
