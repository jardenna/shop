const validateProduct = (product) => {
  switch (true) {
    case !product.productName:
      return 'Product name is required';
    case !product.description:
      return 'Description is required';
    case !product.price:
      return 'Price is required';
    case !product.brand:
      return 'Brand is required';
    case !product.material:
      return 'Material is required';
    case !product.colors:
      return 'Colors is required';
    default:
      return null; // No errors
  }
};

export default validateProduct;
