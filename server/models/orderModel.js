import { model, Schema } from 'mongoose';
import {
  ALLOWED_PAYMENT_METHODS,
  PAYMENT_STATUS,
  PAYMENT_STATUS_ENUM,
} from '../config/paymentConstants.js';

import { ALLOWED_SIZES } from '../config/constants.js';

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
      name: { type: String, required: true },
      street: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      method: {
        type: String,
        enum: ALLOWED_PAYMENT_METHODS,
        required: true,
      },
      brand: {
        type: String,
        default: '',
      },
      lastFourDigits: {
        type: String,
        default: '',
      },
      cardholderName: {
        type: String,
        default: '',
      },
      status: {
        type: String,
        default: '',
      },
      result: {
        id: {
          type: String,
          default: '',
        },
        status: {
          type: String,
          default: '',
        },
        updateTime: {
          type: String,
          default: '',
        },
        email: {
          type: String,
          default: '',
        },
      },
    },
    summary: {
      subTotal: {
        type: Number,
        required: true,
        default: 0,
      },
      taxPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      discountPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      promoDiscount: {
        type: Number,
        required: true,
        default: 0,
      },
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
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS_ENUM,
      default: PAYMENT_STATUS.PENDING,
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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;

        returnedObject.orderItems = returnedObject.orderItems.map(
          ({ _id, ...orderItem }) => ({
            id: _id.toString(),
            ...orderItem,
          }),
        );

        return returnedObject;
      },
    },
  },
);

const Order = model('orders', orderModelSchema);

export default Order;
