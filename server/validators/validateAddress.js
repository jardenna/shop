const validateCreateAddress = (address) => {
  switch (true) {
    case !address.street:
      return 'Please enter street';
    case !address.zipCode:
      return 'Please enter zipcode';
    case !address.city:
      return 'Please enter city';
    default:
      return null; // No errors
  }
};

export { validateCreateAddress };
