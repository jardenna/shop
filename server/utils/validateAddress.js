const validateCreateAddress = (address) => {
  switch (true) {
    case !address.street:
      return 'Please insert street';
    case !address.zipCode:
      return 'Please insert zipcode';
    case !address.city:
      return 'Please insert city';
    default:
      return null; // No errors
  }
};

export { validateCreateAddress };

// update address
// skal være et id som matcher users address _id
