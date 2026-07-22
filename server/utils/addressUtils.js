import { STANDARD_ADDRESS_TYPES } from '../config/constants.js';

const [deliveryType, billingType] = STANDARD_ADDRESS_TYPES;

export const getAddressLabel = (standardAddress) => {
  const isDelivery = standardAddress.includes(deliveryType);
  const isBilling = standardAddress.includes(billingType);

  if (isDelivery && isBilling) {
    return 'addressdeliveryAndBilling';
  }

  if (isDelivery) {
    return deliveryType;
  }

  if (isBilling) {
    return billingType;
  }

  return '';
};

const normalize = (value) => (value ?? '').trim().toLowerCase();

export const findDuplicateAddress = (userAddresses, address) => {
  return userAddresses.find(
    (item) =>
      item.id !== address.id &&
      normalize(item.street) === normalize(address.street) &&
      Number(item.zipCode) === Number(address.zipCode) &&
      normalize(item.city) === normalize(address.city) &&
      normalize(item.country) === normalize(address.country),
  );
};

export const formatAddresses = (addresses) => {
  return addresses.map((address) => ({
    ...address.toObject(),
    label: getAddressLabel(address.standardAddress),
  }));
};

export const updateStandardAddresses = (
  userAddresses,
  standardAddress,
  currentAddressId,
) => {
  standardAddress.forEach((addressType) => {
    userAddresses.forEach((address) => {
      if (address.id === currentAddressId) {
        return;
      }

      address.standardAddress = address.standardAddress.filter(
        (type) => type !== addressType,
      );
    });
  });
};
