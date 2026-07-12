const findDatabaseProduct = ({ databaseProducts, cartItem }) => {
  return databaseProducts.find(
    (product) => product._id.toString() === cartItem.productId,
  );
};

const validateVariant = ({ databaseProduct, cartItem }) => {
  return (
    databaseProduct.sizes.includes(cartItem.size) &&
    databaseProduct.colors.includes(cartItem.color)
  );
};

const cartItemIdentifier = (cartItem) => ({
  productId: cartItem.productId,
  size: cartItem.size,
  color: cartItem.color,
});

export { cartItemIdentifier, findDatabaseProduct, validateVariant };
