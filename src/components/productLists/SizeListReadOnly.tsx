import {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { OptionGroupHeading } from '../../types/types';
import { resolveAllowedSizes } from '../../utils/sizeUtils';
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

  const sizeList = resolveAllowedSizes({
    mainKey: categoryName,
    subKey: subCategoryName,
  });

  const hasOnlyOneSize =
    availableSizeList.length === 1 && availableSizeList[0] === 'Onesize';

  const displaySizes: Size[] = hasOnlyOneSize
    ? ['Onesize']
    : sizeList.filter(
        (size): size is Exclude<Size, 'Onesize'> => size !== 'Onesize',
      );

  return (
    <ProductList groupTitle={groupTitle}>
      {displaySizes.map((size) => (
        <ProductListItem
          as="span"
          text={size}
          isUnavailable={!availableSizeList.includes(size)}
          key={size}
        >
          <VisuallyHidden>
            {!availableSizeList.includes(size)
              ? language.unavailable
              : language.available}{' '}
            {language.size}
          </VisuallyHidden>
        </ProductListItem>
      ))}
    </ProductList>
  );
};

export default SizeListReadOnly;
