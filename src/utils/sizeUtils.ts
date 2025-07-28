import {
  ClothingSizes,
  KidsShoesSizes,
  MainCategoryNames,
  MenShoesSizes,
  Size,
  SubCategoryNames,
  WomenShoesSizes,
} from '../app/api/apiTypes/sharedApiTypes';

const clothingSizes: ClothingSizes[] = ['S', 'M', 'L', 'XL'];
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

const resolveAllowedSizes = ({
  subKey,
  mainKey,
}: {
  mainKey: MainCategoryNames;
  subKey: SubCategoryNames;
}): Size[] => {
  if (mainKey === 'Kids' && subKey === 'Shoes') {
    return kidsShoesSizes;
  }

  if (mainKey === 'Men' && subKey === 'Shoes') {
    return menShoesSizes;
  }

  if (subKey === 'Shoes') {
    return womenShoeSizes;
  }

  if (subKey.includes('Accessories')) {
    return ['Onesize'];
  }

  return clothingSizes;
};

export {
  clothingSizes,
  kidsShoesSizes,
  menShoesSizes,
  resolveAllowedSizes,
  womenShoeSizes,
};
