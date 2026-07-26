import { useParams } from 'react-router';
import { BaseShopProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import type { OmitChecked } from '../../../types/types';
import ProductCard, { type ProductCardProps } from './ProductCard';

type OmitteProductCardProps = OmitChecked<
  ProductCardProps,
  'product' | 'linkTo'
>;

type ProductCardListProps = OmitteProductCardProps & {
  products: Array<BaseShopProduct | ProductPreview>;
};

const ProductCardList = ({
  products,
  productView = '',
  showSizeOverlay,
}: ProductCardListProps) => {
  const { categoryId } = useParams();

  return (
    <ul className={`product-card-list ${productView}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
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

export default ProductCardList;
