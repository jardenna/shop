import {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { OptionGroupHeading } from '../../types/types';
import { getDisplaySizes } from '../../utils/sizeUtils';
import VisuallyHidden from '../VisuallyHidden';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListReadOnlyProps = {
  availableSizeList: Size[];
  categoryName: MainCategoryNames;
  subCategoryName: SubCategoryNames;
  groupTitle?: OptionGroupHeading;
};

const SizeListReadOnly = ({
  availableSizeList,
  groupTitle,
  categoryName,
  subCategoryName,
}: SizeListReadOnlyProps) => {
  const { language } = useLanguage();

  const displaySizeList = getDisplaySizes({
    mainKey: categoryName,
    subKey: subCategoryName,
    availableSizes: availableSizeList,
  });

  return (
    <ProductList groupTitle={groupTitle}>
      {displaySizeList.map((size) => (
        <ProductListItem
          as="span"
          text={size}
          isUnavailable={!availableSizeList.includes(size)}
          key={size}
        >
          <VisuallyHidden>
            {!availableSizeList.includes(size)
              ? language.unavailable
              : language.available}
            {language.size}
          </VisuallyHidden>
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default SizeListReadOnly;
