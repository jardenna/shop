import { Roles } from '../app/api/apiTypes/adminApiTypes';
import { ProductSizes } from '../app/api/apiTypes/sharedApiTypes';

const sizeList: ProductSizes[] = ['S', 'M', 'L', 'XL', 'Onesize'];
const sizeListClothing: string[] = ['S', 'M', 'L', 'XL'];
const sizeListWomenShoes: string[] = [
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  'Onesize',
];
const sizeListMenShoes: string[] = [
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  'Onesize',
];

const sizeListKidsShoes: string[] = [
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

const roles: Roles[] = ['Employee', 'User'];

const roleList = roles.map((role) => ({
  value: role,
  label: role.toLowerCase(),
}));

export {
  roleList,
  roles,
  sizeList,
  sizeListClothing,
  sizeListKidsShoes,
  sizeListMenShoes,
  sizeListWomenShoes,
};
