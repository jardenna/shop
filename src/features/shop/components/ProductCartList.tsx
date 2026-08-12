import { useParams } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import type { OmitChecked } from '../../../types/types';
import ProductCart, { type ProductCardProps } from './ProductCart';

type OmitteProductCardProps = OmitChecked<
  ProductCardProps,
  'product' | 'linkTo'
>;

type ProductCartListProps = OmitteProductCardProps & {
  products: BaseProduct[];
};

const ProductCartList = ({
  products,
  productView = '',
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
