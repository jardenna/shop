import { Address, StandardAddress } from '../app/api/apiTypes/addressApiTypes';

export interface StandardAddressIds {
  billingAddressId: string;
  shippingAddressId: string;
}

interface FindStandardAddress {
  id: StandardAddress;
  addresses?: Address[];
}

export interface BaseAddressListProps extends StandardAddressIds {
  addresses: Address[];
  language: Record<string, string>;
  onChangeAddress: (address: StandardAddressIds) => void;
}

export const findStandardAddress = ({ id, addresses }: FindStandardAddress) =>
  addresses?.find((address) => address.standardAddress.includes(id))?.id ?? '';

export const getAddressUpdates = ({
  shippingAddressId,
  billingAddressId,
}: StandardAddressIds) => {
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

export const getAddressLabel = (standardAddress: StandardAddress[]): string => {
  const isDelivery = standardAddress.includes('addressDelivery');
  const isBilling = standardAddress.includes('addressBilling');

  if (isDelivery && isBilling) {
    return 'addressdeliveryAndBilling';
  }

  if (isDelivery) {
    return 'addressDelivery';
  }

  if (isBilling) {
    return 'addressBilling';
  }

  return '';
};

export const getUpdatedAddresses = ({
  addresses,
  shippingAddressId,
  billingAddressId,
}: {
  addresses: Address[];
  billingAddressId: string;
  shippingAddressId: string;
}): Address[] =>
  addresses.map((address) => {
    const standardAddress: StandardAddress[] = [
      ...(address.id === shippingAddressId
        ? (['addressDelivery'] satisfies StandardAddress[])
        : []),
      ...(address.id === billingAddressId
        ? (['addressBilling'] satisfies StandardAddress[])
        : []),
    ];

    return {
      ...address,
      standardAddress,
      label: getAddressLabel(standardAddress),
    };
  });
