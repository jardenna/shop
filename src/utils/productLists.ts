import type { Roles } from '../app/api/apiTypes/adminApiTypes';
import type { Size } from '../app/api/apiTypes/sharedApiTypes';
import { OptionType } from '../types/types';

const sizeList: Size[] = ['S', 'M', 'L', 'XL', 'Onesize'];

const roles: Roles[] = ['Employee', 'User'];

const roleList: OptionType[] = roles.map((role) => ({
  value: role,
  label: role.toLowerCase(),
}));

const raitingList: OptionType[] = [
  { value: '1', label: 'rating1', ariaLabel: true },
  { value: '2', label: 'rating2', ariaLabel: true },
  { value: '3', label: 'rating3', ariaLabel: true },
  { value: '4', label: 'rating4', ariaLabel: true },
  { value: '5', label: 'rating5', ariaLabel: true },
];

export { raitingList, roleList, roles, sizeList };
