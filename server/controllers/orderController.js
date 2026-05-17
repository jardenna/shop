// import order from '../models/ordersModel';
// import Product from '../models/productModel';

const createOrder = async (req, res) => {
  try {
    res.send('Hello from order');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createOrder };
