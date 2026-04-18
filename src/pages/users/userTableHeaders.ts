import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<UserResponse>[] = [
  {
    key: 'username',
    label: 'username',
    name: 'username',
    tableFilterType: 'text',
  },
  { key: 'email', label: 'email', name: 'email', tableFilterType: 'text' },
  { key: 'role', label: 'role', name: 'role', tableFilterType: 'text' },
  { key: 'id', label: '', name: '' },
];
