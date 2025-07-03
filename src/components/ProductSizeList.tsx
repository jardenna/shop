import { ProductSizes } from '../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../features/language/useLanguage';
import { sizeList } from '../utils/utils';
import VisuallyHidden from './VisuallyHidden';

type ProductSizeListProps = {
  sizes: ProductSizes[];
};

const ProductSizeList = ({ sizes }: ProductSizeListProps) => {
  const { language } = useLanguage();

  return (
    <ul className="product-size-list" aria-label={language.sizes}>
      {sizeList.map((size) => (
        <li
          className={`product-size-list-item ${sizes.includes(size) ? 'available' : 'unavailable'}`}
          key={size}
        >
          {size}
          <VisuallyHidden>
            {!sizes.includes(size) ? language.unavailable : language.available}{' '}
            {language.size}
          </VisuallyHidden>
        </li>
      ))}
    </ul>
  );
};
export default ProductSizeList;
