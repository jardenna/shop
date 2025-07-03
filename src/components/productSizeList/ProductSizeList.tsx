import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/utils';
import VisuallyHidden from '../VisuallyHidden';
import './_product-size-list.scss';

type ProductSizeListProps = {
  sizes: ProductSizes[];
  variant?: string;
};

const ProductSizeList = ({ sizes, variant = '' }: ProductSizeListProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`product-size-list ${variant}`} aria-label={language.sizes}>
      {sizeList.map((size) => (
        <li
          className={`product-size-item ${sizes.includes(size) ? 'available' : 'unavailable'}`}
          key={size}
        >
          <span className="product-size">{size}</span>
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
