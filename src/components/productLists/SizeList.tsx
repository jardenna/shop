import {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import type { OptionGroupHeading } from '../../types/types';
import { getDisplaySizes } from '../../utils/sizeUtils';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListProps = {
  availableSizeList: Size[];
  categoryName: MainCategoryNames;
  subCategoryName: SubCategoryNames;
  groupTitle?: OptionGroupHeading;
};

const SizeList = ({
  availableSizeList,
  groupTitle,
  categoryName,
  subCategoryName,
}: SizeListProps) => {
  const { language } = useLanguage();

  const displaySizeList = getDisplaySizes({
    mainKey: categoryName,
    subKey: subCategoryName,
    availableSizes: availableSizeList,
  });

  return (
    <ProductList groupTitle={groupTitle} className="size-list">
      {displaySizeList.map((size) => (
        <ProductListItem
          key={size}
          ariaLabel={
            !availableSizeList.includes(size)
              ? language.unavailable
              : language.available
          }
          text={size}
        />
      ))}
    </ProductList>
  );
};

export default SizeList;
