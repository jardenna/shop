import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import FavoritesAddToCartBtn from '../../favorites/components/FavoritesAddToCartBtn';
import { useLanguage } from '../../language/useLanguage';
import ProductCart from './ProductCart';

interface ProductCartListProps {
  products: BaseProduct[];
  currentUser?: UserResponse | null;
  productView?: string;
  getProductLink: (id: string) => string;
  onOpenPanel?: (id: string) => void;
}

const ProductCartList = ({
  products,
  productView,
  getProductLink,
  onOpenPanel,
  currentUser,
}: ProductCartListProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`product-cart-list ${productView}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCart
            productView={productView}
            linkTo={getProductLink(product.id)}
            product={product}
            isOutOfStock={product.countInStock === 0}
          />
          {onOpenPanel && (
            <FavoritesAddToCartBtn
              countInStock={product.countInStock}
              onOpenPanel={onOpenPanel}
              currentUser={currentUser ?? null}
              panelId={product.id}
              btnLabel={language.addToCart}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductCartList;
