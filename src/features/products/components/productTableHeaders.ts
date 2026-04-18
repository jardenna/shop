import { Product } from '../../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../../components/sortTable/Table';

export const tableHeaders: Column<Product>[] = [
  {
    key: 'productName',
    label: 'name',
    name: 'productName',
    tableFilterType: 'text',
  },
  {
    key: 'categoryName',
    label: 'category',
    name: 'categoryName',
    tableFilterType: 'text',
  },
  {
    key: 'subCategoryName',
    label: 'subCategory',
    name: 'subCategoryName',
    tableFilterType: 'text',
  },
  {
    key: 'countInStock',
    label: 'countInStock',
    name: 'stock',
    tableFilterType: 'number',
  },
  { key: 'price', label: 'price', name: 'price', tableFilterType: 'number' },
  {
    key: 'discount',
    label: 'discount',
    name: 'discount',
    tableFilterType: 'number',
  },
  {
    key: 'discountedPrice',
    label: 'totalPrice',
    name: 'discountPrice',
    tableFilterType: 'number',
  },
  {
    key: 'productStatus',
    label: 'status',
    name: 'productStatus',
    tableFilterType: 'text',
  },
  { key: 'id', label: '', name: '' },
];
