const errorMessage = 'Cart item is missing field';

const validateCartItems = (cartItem) => {
  switch (true) {
    case !cartItem.qty:
      return `${errorMessage} quantity for Product ID: ${cartItem.productId}`;
    case !cartItem.size:
      return `${errorMessage} size for Product ID: ${cartItem.productId}`;
    case !cartItem.color:
      return `${errorMessage} color for Product ID: ${cartItem.productId}`;
    case !cartItem.productId:
      return `${errorMessage} product ID`;
    default:
      return null;
  }
};

export { validateCartItems };
