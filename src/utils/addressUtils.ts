import { Address, StandardAddress } from '../app/api/apiTypes/addressApiTypes';
import { AddressSelection } from '../app/api/apiTypes/orderApiTypes';

interface FindStandardAddress {
  id: StandardAddress;
  addresses?: Address[];
}

export const findStandardAddress = ({ id, addresses }: FindStandardAddress) =>
  addresses?.find((address) => address.standardAddress.includes(id))?.id ?? '';

export const getAddressUpdates = ({
  shippingAddressId,
  billingAddressId,
}: AddressSelection) => {
  if (shippingAddressId === billingAddressId) {
    return [
      {
        addressId: shippingAddressId,
        standardAddress: [
          'addressDelivery',
          'addressBilling',
        ] satisfies StandardAddress[],
      },
    ];
  }

  return [
    {
      addressId: shippingAddressId,
      standardAddress: ['addressDelivery'] satisfies StandardAddress[],
    },
    {
      addressId: billingAddressId,
      standardAddress: ['addressBilling'] satisfies StandardAddress[],
    },
  ];
};
