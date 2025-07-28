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
  categoryName: MainCategoryNames;
  initialChecked: string;
  sizeList: string[];
  sizes: Size[];
  subCategoryName: SubCategoryNames;
};

const SizeListSingleChoice = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  sizes,
  categoryName,
  subCategoryName,
}: SizeListSingleChoiceProps) => {
  const sizeList = resolveAllowedSizes({
    mainKey: categoryName,
    subKey: subCategoryName,
  });

  const shouldShowOnlyOnesize = sizes.length === 1 && sizes[0] === 'Onesize';

  const result: Size[] = shouldShowOnlyOnesize
    ? ['Onesize']
    : sizeList.filter(
        (size): size is Exclude<Size, 'Onesize'> => size !== 'Onesize',
      );

  return (
    <ProductList groupTitle={groupTitle}>
      {result.map((size) => (
        <ProductListItem
          key={size}
          htmlFor={size}
          text={size}
          isUnavailable={!sizes.includes(size)}
        >
          <input
            type="radio"
            name={name}
            id={size}
            value={size}
            checked={initialChecked === size}
            onChange={onChange}
          />
          {!sizes.includes(size) && initialChecked === size && (
            <div>Notify me</div>
          )}
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default SizeListSingleChoice;
