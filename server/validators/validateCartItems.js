const errorMessage = 'Cart item is missing field';

const validateCartItems = (cartItem) => {
  switch (true) {
    case !cartItem.productId:
      return `${errorMessage} Product ID`;

    case cartItem.qty === undefined:
      return `${errorMessage} quantity for Product ID: ${cartItem.productId}`;

    case typeof cartItem.qty !== 'number':
      return `Quantity must be a number for Product ID: ${cartItem.productId}`;

    case Number.isNaN(cartItem.qty):
      return `Quantity cannot be NaN for Product ID: ${cartItem.productId}`;

    case cartItem.qty < 1:
      return `Quantity must be greater than 0 for Product ID: ${cartItem.productId}`;

    case !cartItem.size:
      return `${errorMessage} size for Product ID: ${cartItem.productId}`;

    case !cartItem.color:
      return `${errorMessage} color for Product ID: ${cartItem.productId}`;

    default:
      return null;
  }
};

export { validateCartItems };
