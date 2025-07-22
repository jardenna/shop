import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { sizeList } from '../../utils/productLists';
import VisuallyHidden from '../VisuallyHidden';
import { OptionGroupTitle1 } from './OptionGroupTitle';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListReadOnlyProps = {
  sizes: ProductSizes[];
  groupTitle?: OptionGroupTitle1;
};

const SizeListReadOnly = ({ sizes, groupTitle }: SizeListReadOnlyProps) => {
  const { language } = useLanguage();

  return (
    <ProductList groupTitle={groupTitle}>
      {sizeList.map((size) => (
        <ProductListItem
          as="span"
          text={size}
          className={sizes.includes(size) ? '' : 'text-line-through'}
          key={size}
        >
          <VisuallyHidden>
            {!sizes.includes(size) ? language.unavailable : language.available}{' '}
            {language.size}
          </VisuallyHidden>
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default SizeListReadOnly;
