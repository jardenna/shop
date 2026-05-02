import { Category } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<Category>[] = [
  {
    key: 'categoryName',
    label: 'name',
    name: 'categoryName',
    tableFilterType: 'radio',
  },
  {
    key: 'categoryStatus',
    label: 'status',
    name: 'categoryStatus',
    tableFilterType: 'radio',
  },
  {
    key: 'createdAt',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'text',
  },
  { key: 'id', label: '', name: '' },
];
