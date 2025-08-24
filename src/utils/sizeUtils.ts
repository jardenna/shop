import type {
  ClothingSizes,
  KidsShoesSizes,
  MainCategoryNames,
  MenShoesSizes,
  Size,
  SubCategoryNames,
  WomenShoesSizes,
} from '../app/api/apiTypes/sharedApiTypes';

const clothingSizes: ClothingSizes[] = ['S', 'M', 'L', 'XL'];
export const oneSize = 'Onesize';
const womenShoeSizes: WomenShoesSizes[] = [
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  'Onesize',
];
const menShoesSizes: MenShoesSizes[] = [
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  'Onesize',
];

const kidsShoesSizes: KidsShoesSizes[] = [
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  'Onesize',
];

// Returns the allowed sizes based on the main and sub category
const getAllowedSizesForCategory = ({
  mainKey,
  subKey,
}: {
  mainKey: MainCategoryNames;
  subKey: SubCategoryNames;
}): Size[] => {
  // Special case for kids shoes
  if (mainKey === 'Kids' && subKey === 'Shoes') {
    return kidsShoesSizes;
  }

  // Special case for Mens shoes
  if (mainKey === 'Men' && subKey === 'Shoes') {
    return menShoesSizes;
  }

  // If it's a shoe subcategory but not for kids or men, use women’s shoe sizes
  if (subKey === 'Shoes') {
    return womenShoeSizes;
  }

  // Accessories are always "Onesize"
  if (subKey.includes('Accessories')) {
    return [oneSize];
  }

  // Default to general sizes (used by most other categories)
  return clothingSizes;
};

// Utility function to get display sizes, optionally filtering out Onesize
const getDisplaySizes = ({
  mainKey,
  subKey,
  availableSizes,
}: {
  availableSizes: Size[];
  mainKey: MainCategoryNames;
  subKey: SubCategoryNames;
}): Size[] => {
  const allProductSizes = getAllowedSizesForCategory({ mainKey, subKey });

  const hasOnlyOneSize =
    availableSizes.length === 1 && availableSizes[0] === oneSize;

  // If only Onesize is available, just return that
  if (hasOnlyOneSize) {
    return [oneSize];
  }

  // Otherwise filter Onesize out from the allowed sizes
  return allProductSizes.filter(
    (size): size is Exclude<Size, 'Onesize'> => size !== oneSize,
  );
};
const checkBoxSizeList = (availableSizes: string[]) => {
  const checkBoxSizeList = availableSizes.map((size) => ({
    value: size,
    label: size,
  }));
  return checkBoxSizeList;
};

export {
  checkBoxSizeList,
  clothingSizes,
  getDisplaySizes,
  kidsShoesSizes,
  menShoesSizes,
  womenShoeSizes,
};
