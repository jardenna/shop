import { Size } from './sharedApiTypes';
export interface Order {
  color: string;
  product: string;
  qty: number;
  size: Size | '';
}

export interface CreateOrderRequest {
  orderItems: Order[];
}
