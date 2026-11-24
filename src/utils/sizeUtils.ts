import type { OneSize, Size } from '../app/api/apiTypes/sharedApiTypes';
import type { SubCategoriesWithParent } from '../app/api/apiTypes/subCategoryApiTypes';

const clothingSizes: Size[] = ['S', 'M', 'L', 'XL'];
export const oneSize: OneSize = 'Onesize';

export function sortSizesDynamic(sizes: Size[]) {
  const numericSizes = sizes
    .filter((s) => /^\d+$/.test(s))
    .sort((a, b) => Number(a) - Number(b));
  const letterSizes = sizes
    .filter((s) => /^[SMLX]+$/.test(s))
    .sort((a, b) => clothingSizes.indexOf(a) - clothingSizes.indexOf(b));
  const otherSizes = sizes.filter(
    (s) => !numericSizes.includes(s) && !letterSizes.includes(s),
  );

  return [...numericSizes, ...letterSizes, ...otherSizes];
}

interface UseAvailableSizesProps {
  allowedSizes: string[];
  parentCategories: SubCategoriesWithParent[];
  selectedSubCategoryId: string | null;
}

export const findAvailableSizes = ({
  parentCategories,
  selectedSubCategoryId,
  allowedSizes,
}: UseAvailableSizesProps) => {
  const selectedCategory = parentCategories.find(
    (category) => selectedSubCategoryId === category.categoryId,
  );

  const availableSizes = selectedCategory
    ? selectedCategory.allowedSizes
    : allowedSizes;

  return availableSizes;
};
