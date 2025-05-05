const validateProduct = (product) => {
  switch (true) {
    case !product.productName:
      return 'Please insert product name';
    case !product.description:
      return 'Please insert product description';
    case !product.price:
      return 'Please insert price';
    case !product.brand:
      return 'Please insert brand';
    case !product.material:
      return 'Please insert material';
    case !product.colors:
      return 'Please select at least one color';
    case !product.sizes:
      return 'Please select at least one size';
    default:
      return null; // No errors
  }
};

export default validateProduct;
