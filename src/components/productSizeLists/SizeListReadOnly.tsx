import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/utils';
import VisuallyHidden from '../VisuallyHidden';
import './_product-size-list.scss';
import ProductSizeList from './ProductSizeList';
import ProductSizeText from './ProductSizeText';

const SizeListReadOnly = ({ sizes }: { sizes: ProductSizes[] }) => {
  const { language } = useLanguage();

  return (
    <ProductSizeList ariaId="sizes" optionGroupTitle={language.sizes}>
      {sizeList.map((size) => (
        <li
          className={`product-size-item ${sizes.includes(size) ? '' : 'text-line-through'}`}
          key={size}
        >
          <ProductSizeText as="span" text={size} />
          <VisuallyHidden>
            {!sizes.includes(size) ? language.unavailable : language.available}{' '}
            {language.size}
          </VisuallyHidden>
        </li>
      ))}
    </ProductSizeList>
  );
};

export default SizeListReadOnly;
