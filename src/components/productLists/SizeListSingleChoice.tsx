import {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import { ProductListChoiceProps } from '../../types/types';
import { resolveAllowedSizes } from '../../utils/sizeUtils';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListSingleChoiceProps = ProductListChoiceProps & {
  availableSizeList: Size[];
  categoryName: MainCategoryNames;
  initialChecked: string;
  subCategoryName: SubCategoryNames;
};

const SizeListSingleChoice = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  availableSizeList,
  categoryName,
  subCategoryName,
}: SizeListSingleChoiceProps) => {
  const allProductSizes = resolveAllowedSizes({
    mainKey: categoryName,
    subKey: subCategoryName,
  });

  const oneSize = 'Onesize';

  const hasOnlyOneSize =
    availableSizeList.length === 1 && availableSizeList[0] === oneSize;

  const displaySizes: Size[] = hasOnlyOneSize
    ? [oneSize]
    : allProductSizes.filter(
        (size): size is Exclude<Size, 'Onesize'> => size !== oneSize,
      );

  return (
    <ProductList groupTitle={groupTitle}>
      {displaySizes.map((size) => (
        <ProductListItem
          key={size}
          htmlFor={size}
          text={size}
          isUnavailable={!availableSizeList.includes(size)}
        >
          <input
            type="radio"
            name={name}
            id={size}
            value={size}
            checked={initialChecked === size}
            onChange={onChange}
          />
          {!availableSizeList.includes(size) && initialChecked === size && (
            <div>Notify me</div>
          )}
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default SizeListSingleChoice;
