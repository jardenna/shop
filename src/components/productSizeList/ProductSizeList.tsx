import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/utils';
import VisuallyHidden from '../VisuallyHidden';
import './_product-size-list.scss';

const ProductSizeList = ({ sizes }: { sizes: ProductSizes[] }) => {
  const { language } = useLanguage();

  return (
    <ul className="product-size-list" aria-label={language.sizes}>
      {sizeList.map((size) => (
        <li
          className={`product-size-item ${sizes.includes(size) ? '' : 'text-line-through'}`}
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
