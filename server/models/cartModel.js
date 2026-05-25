import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const CartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    cartItems: [
      {
        productId: {
          type: ObjectId,
          required: true,
          ref: 'Product',
        },
        qty: { type: Number, required: true },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Cart = model('Cart', CartSchema);

export default Cart;
