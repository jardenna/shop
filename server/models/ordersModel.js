import { model, Schema } from 'mongoose';
import {
  ALLOWED_PAYMENT_METHODS,
  ALLOWED_SIZES,
  PAYMENT_STATUS_ENUM,
} from '../config/constants.js';

const { ObjectId } = Schema;

const orderModelSchema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        productName: { type: String, required: true },
        qty: { type: Number, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true, enum: ALLOWED_SIZES },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productId: {
          type: ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ALLOWED_PAYMENT_METHODS,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updateTime: { type: String },
      email: { type: String },
    },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS_ENUM,
      default: 'PENDING',
    },
    itemPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Order = model('orders', orderModelSchema);

export default Order;
