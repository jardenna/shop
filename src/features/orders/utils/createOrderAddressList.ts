import {
  Address,
  BaseAddress,
} from '../../../app/api/apiTypes/addressApiTypes';

type createOrderAddressListProps = {
  billingAddress: BaseAddress;
  shippingAddress: BaseAddress;
};

export const createOrderAddressList = ({
  billingAddress,
  shippingAddress,
}: createOrderAddressListProps): Address[] => [
  {
    ...billingAddress,
    id: 'billing',
    label: 'addressBilling',
  },
  {
    ...shippingAddress,
    id: 'shipping',
    label: 'addressDelivery',
  },
];
