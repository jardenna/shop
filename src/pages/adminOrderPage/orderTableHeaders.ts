import { AdminOrderResponse } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<AdminOrderResponse>[] = [
  {
    key: 'id',
    label: 'name',
    name: 'categoryName',
    tableFilterType: 'text',
  },
  {
    key: 'createdAt',
    label: 'status',
    name: 'categoryStatus',
    tableFilterType: 'date',
  },
  {
    key: 'customer',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'text',
  },
  {
    key: 'deliveryStatus',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'text',
  },
  {
    key: 'itemCount',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'number',
  },
  {
    key: 'paymentMethod',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'text',
  },
  {
    key: 'paymentStatus',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'text',
  },
  {
    key: 'totalPrice',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'number',
  },
];
