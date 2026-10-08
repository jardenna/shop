import { UserResponse } from '../../../app/api/apiTypes/adminApiTypes';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';
import NotifyMeForm from './NotifyMeForm';
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
          {onOpenPanel &&
            (product.countInStock === 0 ? (
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
        </li>
      ))}
    </ul>
  );
};
export default ProductCartList;
