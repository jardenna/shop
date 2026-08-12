import { useParams } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCart from './ProductCart';

interface ProductCartListProps {
  products: BaseProduct[];
  productView: string;
  showSizeOverlay: boolean;
}

const ProductCartList = ({
  products,
  productView,
  showSizeOverlay,
}: ProductCartListProps) => {
  const { categoryId } = useParams();

  return (
    <ul className={`product-card-list ${productView}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCart
            showSizeOverlay={showSizeOverlay}
            productView={productView}
            linkTo={categoryId ? product.id : `all-products/${product.id}`}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductCartList;
