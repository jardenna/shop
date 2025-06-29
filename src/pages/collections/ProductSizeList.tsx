import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';

type ProductSizesProps = {
  sizes: ProductSizes[];
};

const ProductSizeList = ({ sizes }: ProductSizesProps) => (
  <ul className="size-overlay">
    {sizes.map((size) => (
      <li key={size}>{size}</li>
    ))}
  </ul>
);

export default ProductSizeList;
