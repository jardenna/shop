import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductListItem from './productLists/ProductListItem';

interface SizeListProps {
  allowedSizes: Size[];
  sizes: Size[];
}

const SizeList = ({ allowedSizes, sizes }: SizeListProps) => (
  <ul className="product-list size-list">
    {allowedSizes.map((size) => (
      <ProductListItem
        key={size}
        text={size}
        unavailable={!sizes.includes(size)}
      />
    ))}
  </ul>
);

export default SizeList;
