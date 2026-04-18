import { SubCategoryResponse } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<SubCategoryResponse>[] = [
  {
    key: 'mainCategoryName',
    label: 'mainCategoryName',
    name: 'mainCategoryName',
    tableFilterType: 'text',
  },
  {
    key: 'subCategoryName',
    label: 'name',
    name: 'subCategoryName',
    tableFilterType: 'text',
  },
  {
    key: 'categoryStatus',
    label: 'status',
    name: 'categoryStatus',
    tableFilterType: 'radio',
  },
  { key: 'id', label: '', name: '' },
];
