import {
  ClothingSizes,
  KidsShoesSizes,
  MenShoesSizes,
  Size,
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

type MainKey = 'Men' | 'Women' | 'Kids';
type SubKey = 'shoes' | 'accessories' | 'clothing';

const resolveAllowedSizes = ({
  subKey,
  mainKey,
}: {
  mainKey: MainKey;
  subKey: SubKey;
}): Size[] => {
  if (mainKey === 'Kids' && subKey === 'shoes') {
    return kidsShoesSizes;
  }

  if (mainKey === 'Men' && subKey === 'shoes') {
    return menShoesSizes;
  }

  if (subKey === 'shoes') {
    return womenShoeSizes;
  }

  if (subKey === 'accessories') {
    return [];
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
