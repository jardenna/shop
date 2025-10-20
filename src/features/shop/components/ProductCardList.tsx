import { useParams } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCard1, { ProductCardProps } from './ProductCard1';

type OmitteProductCardProps = Omit<ProductCardProps, 'product' | 'linkTo'>;

type ProductCardListProps = OmitteProductCardProps & {
  products: BaseProduct[];
};

const ProductCardList = ({
  products,
  ariaLabelledby,
  productView,
  linkText,
  showSizeOverlay,
}: ProductCardListProps) => {
  const { categoryId } = useParams();

  return (
    <ul className={`product-card-list ${productView}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard1
            ariaLabelledby={ariaLabelledby}
            showSizeOverlay={showSizeOverlay}
            productView={productView}
            linkTo={categoryId ? product.id : `allProducts/${product.id}`}
            linkText={linkText}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
};
export default ProductCardList;
