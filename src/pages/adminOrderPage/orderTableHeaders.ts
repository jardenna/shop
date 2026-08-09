import { OrderItems } from '../../app/api/apiTypes/adminApiTypes';
import { Column } from '../../components/sortTable/Table';

export const tableHeaders: Column<OrderItems>[] = [
  {
    key: 'orderId',
    label: 'order',
    name: 'id',
    tableFilterType: 'text',
  },
  {
    key: 'createdAt',
    label: 'date',
    name: 'createdAt',
    tableFilterType: 'date',
  },
  {
    key: 'customer',
    label: 'customer',
    name: 'customer',
    tableFilterType: 'text',
  },
  {
    key: 'totalPrice',
    label: 'totalPrice',
    name: 'totalPrice',
    tableFilterType: 'number',
  },
  {
    key: 'paymentMethod',
    label: 'paymentMethod',
    name: 'paymentMethod',
    tableFilterType: 'radio',
  },
  {
    key: 'paymentStatus',
    label: 'paymentStatus',
    name: 'paymentStatus',
    tableFilterType: 'radio',
  },
  {
    key: 'deliveryStatus',
    label: 'delivery',
    name: 'deliveryStatus',
    tableFilterType: 'radio',
  },
  { key: 'id', label: '', name: '' },
];
