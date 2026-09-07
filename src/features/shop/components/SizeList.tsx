import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import { useLanguage } from '../../language/useLanguage';
import ProductList from './productLists/ProductList';
import ProductListItem from './productLists/ProductListItem';

interface SizeListProps {
  allowedSizes: Size[];
  sizes: Size[];
}

const SizeList = ({ allowedSizes, sizes }: SizeListProps) => {
  const { language } = useLanguage();

  return (
    <ProductList className="size-list" title={language.sizes}>
      {allowedSizes.map((size) => (
        <ProductListItem
          key={size}
          text={size}
          unavailable={!sizes.includes(size)}
        />
      ))}
    </ProductList>
  );
};

export default SizeList;
