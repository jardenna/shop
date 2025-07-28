import {
  MainCategoryNames,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { OptionGroupHeading } from '../../types/types';
import { resolveAllowedSizes } from '../../utils/sizeUtils';
import VisuallyHidden from '../VisuallyHidden';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListReadOnlyProps = {
  categoryName: MainCategoryNames;
  sizes: string[];
  subCategoryName: SubCategoryNames;
  groupTitle?: OptionGroupHeading;
};

const SizeListReadOnly = ({
  sizes,
  groupTitle,
  categoryName,
  subCategoryName,
}: SizeListReadOnlyProps) => {
  const { language } = useLanguage();

  const sizeList = resolveAllowedSizes({
    mainKey: categoryName,
    subKey: subCategoryName,
  });

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
