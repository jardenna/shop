import { Roles } from '../app/api/apiTypes/adminApiTypes';
import { Size } from '../app/api/apiTypes/sharedApiTypes';

const sizeList: Size[] = ['S', 'M', 'L', 'XL', 'Onesize'];

const roles: Roles[] = ['Employee', 'User'];

const roleList = roles.map((role) => ({
  value: role,
  label: role.toLowerCase(),
}));

export { roleList, roles, sizeList };
