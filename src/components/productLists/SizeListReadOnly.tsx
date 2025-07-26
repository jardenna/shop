import useLanguage from '../../features/language/useLanguage';
import { OptionGroupHeading } from '../../types/types';
import { sizeList } from '../../utils/productLists';
import VisuallyHidden from '../VisuallyHidden';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListReadOnlyProps = {
  sizes: string[];
  groupTitle?: OptionGroupHeading;
};

const SizeListReadOnly = ({ sizes, groupTitle }: SizeListReadOnlyProps) => {
  const { language } = useLanguage();

  return (
    <ProductList groupTitle={groupTitle}>
      {sizeList.map((size) => (
        <ProductListItem
          as="span"
          text={size}
          isUnavailable={!sizes.includes(size)}
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
