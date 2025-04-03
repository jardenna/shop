const validateProduct = (product) => {
  switch (true) {
    case !product.productName:
      return 'Product name is required';
    case !product.description:
      return 'Description is required';
    case !product.price:
      return 'Price is required';
    case !product.category:
      return 'Category is required';
    case !product.quantity:
      return 'Quantity is required';
    case !product.brand:
      return 'Brand is required';
    case !product.countInStock:
      return 'Count in stock is required';
    default:
      return null; // No errors
  }
};

export default validateProduct;
