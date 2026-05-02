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
    tableFilterType: 'radio',
  },
  {
    key: 'subCategoryName',
    label: 'subCategory',
    name: 'subCategoryName',
    tableFilterType: 'radio',
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
    name: 'discountedPrice',
    tableFilterType: 'number',
  },
  {
    key: 'productStatus',
    label: 'status',
    name: 'productStatus',
    tableFilterType: 'radio',
  },
  { key: 'id', label: '', name: '' },
];
