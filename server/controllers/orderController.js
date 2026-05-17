import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/ordersModel.js';
import Product from '../models/productModel.js';

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No order items',
    });
  }

  const productIds = orderItems.map((item) => item.product);

  const databaseProducts = await Product.find({
    _id: {
      $in: productIds,
    },
  });
  console.log({ databaseProducts });

  const productsWithDiscountedPrices = databaseProducts.map(
    (databaseProduct) => {
      const discountedPrice =
        databaseProduct.price -
        (databaseProduct.price * databaseProduct.discount) / 100;
      console.log({ databaseProduct });

      return {
        productId: databaseProduct._id,
        productName: databaseProduct.productName,
        image: databaseProduct.images[0],
        discountedPrice,
      };
    },
  );

  res.status(200).json(productsWithDiscountedPrices);

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // const createdOrder = await order.save();

  // res.status(201).json(createdOrder);
});

export { createOrder };
