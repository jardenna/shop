import { Schema, model } from 'mongoose';
import { ALLOWED_PAYMENT_METHODS } from '../config/paymentConstants.js';

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
    paymentMethods: {
      type: String,
      enum: ALLOWED_PAYMENT_METHODS,
      required: true,
    },
    discount: {
      code: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      percent: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const Cart = model('Cart', CartSchema);

export default Cart;
