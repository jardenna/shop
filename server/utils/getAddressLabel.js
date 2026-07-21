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
