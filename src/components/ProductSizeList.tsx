import { ProductSizes } from '../app/api/apiTypes/sharedApiTypes';
import { sizeList } from '../utils/utils';

type ProductSizeListProps = {
  sizes: ProductSizes[];
};

const ProductSizeList = ({ sizes }: ProductSizeListProps) => (
  <ul className="product-size-list">
    {sizeList.map((size) => (
      <li
        className={`product-size-list-item ${sizes.includes(size) ? 'available' : 'unavailable'}`}
        key={size}
      >
        {size}
      </li>
    ))}
  </ul>
);

export default ProductSizeList;
