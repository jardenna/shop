export const getAddressLabel = (standardAddress) => {
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
