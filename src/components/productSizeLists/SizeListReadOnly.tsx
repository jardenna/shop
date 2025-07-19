import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/utils';
import VisuallyHidden from '../VisuallyHidden';
import './_product-size-list.scss';
import ProductSizeItem from './ProductSizeItem';
import ProductSizeList from './ProductSizeList';

const SizeListReadOnly = ({ sizes }: { sizes: ProductSizes[] }) => {
  const { language } = useLanguage();

  return (
    <ProductSizeList ariaId="sizes" optionGroupTitle={language.sizes}>
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
    </ProductSizeList>
  );
};

export default SizeListReadOnly;
