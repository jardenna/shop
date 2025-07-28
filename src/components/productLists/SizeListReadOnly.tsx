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
  categoryName: MainCategoryNames;
  sizes: Size[];
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
