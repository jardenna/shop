const mergeCartItems = ({
  existingCartItems,
  incomingCartItems,
  databaseProducts,
}) => {
  for (const cartItem of incomingCartItems) {
    const identicalVariant = findIdenticalVariant({
      cartItems: existingCartItems,
      cartItem,
    });

    if (identicalVariant) {
      const databaseProduct = findDatabaseProduct({
        databaseProducts,
        cartItem,
      });

      const totalQuantity = identicalVariant.qty + cartItem.qty;

      // Check count in stock
      if (totalQuantity > databaseProduct.countInStock) {
        return {
          success: false,
          message: 'The product you selected is out of stock',
          cartItem,
        };
      }

      identicalVariant.qty = totalQuantity;
    } else {
      existingCartItems.unshift(cartItem);
    }
  }

  return {
    success: true,
    cartItems: existingCartItems,
  };
};

export { mergeCartItems };
