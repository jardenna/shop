import { Category } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<Category>[] = [
  {
    key: 'categoryName',
    label: 'name',
    name: 'categoryName',
    tableFilterType: 'text',
  },
  {
    key: 'categoryStatus',
    label: 'status',
    name: 'categoryStatus',
    tableFilterType: 'text',
  },
  {
    key: 'createdAt',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'date',
  },
  { key: 'id', label: '', name: '' },
];
