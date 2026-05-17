// import order from '../models/ordersModel';
// import Product from '../models/productModel';
import asyncHandler from '../middleware/asyncHandler.js';

const createOrder = asyncHandler((req, res) => {
  res.send('Hello from order');
});

export { createOrder };
