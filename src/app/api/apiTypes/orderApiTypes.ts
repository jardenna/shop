import { BaseAddress } from './addressApiTypes';
import { BaseOrder, Order } from './cartApiTypes';
import { PaymentMethods, PaymentStatus } from './paymentApiTypes';
import { DefaultResponseType, Discount, Summary } from './sharedApiTypes';

export interface CreateOrderRequest {
  billingAddressId: string;
  orderItems: BaseOrder[];
  payment: {
    method: PaymentMethods;
  };
  shippingAddressId: string;
}

export interface OrderResponse extends DefaultResponseType {
  billingAddress: BaseAddress;
  discount: Discount;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: Order[];
  paymentStatus: PaymentStatus;
  shippingAddress: BaseAddress;
  summary: Summary;
}
