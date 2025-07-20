import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/utils';
import VisuallyHidden from '../VisuallyHidden';
import './_product-size-list.scss';
import ProductList from './ProductList';
import ProductSizeItem from './ProductSizeItem';

type SizeListReadOnlyProps = {
  sizes: ProductSizes[];
  optionGroupTitle?: string;
};

const SizeListReadOnly = ({
  sizes,
  optionGroupTitle,
}: SizeListReadOnlyProps) => {
  const { language } = useLanguage();

  return (
    <ProductList ariaId="sizes" optionGroupTitle={optionGroupTitle}>
      {sizeList.map((size) => (
        <ProductSizeItem
          as="span"
          text={size}
          className={`product-size-item ${sizes.includes(size) ? '' : 'text-line-through'}`}
          key={size}
        >
          <VisuallyHidden>
            {!sizes.includes(size) ? language.unavailable : language.available}{' '}
            {language.size}
          </VisuallyHidden>
        </ProductSizeItem>
      ))}
    </ProductList>
  );
};

export default SizeListReadOnly;
