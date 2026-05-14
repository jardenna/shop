import { SubCategoryResponse } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<SubCategoryResponse>[] = [
  {
    key: 'categoryName',
    label: 'categoryName',
    name: 'categoryName',
    tableFilterType: 'radio',
  },
  {
    key: 'subCategoryName',
    label: 'name',
    name: 'subCategoryName',
    tableFilterType: 'radio',
  },
  {
    key: 'categoryStatus',
    label: 'status',
    name: 'categoryStatus',
    tableFilterType: 'radio',
  },
  { key: 'id', label: '', name: '' },
];
