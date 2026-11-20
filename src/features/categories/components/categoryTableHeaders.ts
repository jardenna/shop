import type { Category } from '../../../app/api/apiTypes/categoryApiTypes';
import type { Column } from '../../../components/sortTable/SortTable';

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
    tableFilterType: 'date',
  },
];
