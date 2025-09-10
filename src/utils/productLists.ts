import type { Roles } from '../app/api/apiTypes/adminApiTypes';
import type { Size } from '../app/api/apiTypes/sharedApiTypes';
import { OptionType } from '../types/types';

const sizeList: Size[] = ['S', 'M', 'L', 'XL', 'Onesize'];

const roles: Roles[] = ['Employee', 'User'];

const roleList: OptionType[] = roles.map((role) => ({
  value: role,
  label: role.toLowerCase(),
}));

export { roleList, roles, sizeList };
