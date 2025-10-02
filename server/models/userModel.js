import { Schema, model } from 'mongoose';
import {
  ALLOWED_FASHION_PREFERENCES,
  ALLOWED_ROLES,
} from '../config/constants.js';
import { renameIdTransform } from '../utils/formatMongoData.js';
const { ObjectId } = Schema;

const AddressSchema = new Schema(
  {
    name: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'Denmark',
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: renameIdTransform,
    },
    toObject: {
      virtuals: true,
    },
  },
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: {
      type: [AddressSchema],
      default: [],
    },
    phoneNo: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    preferredFashion: {
      type: String,
      enum: ALLOWED_FASHION_PREFERENCES,
      default: 'noPreference',
    },
    role: {
      type: String,
      enum: ALLOWED_ROLES,
      default: 'User',
    },
    favorites: [
      {
        type: ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: renameIdTransform,
    },
    toObject: {
      virtuals: true,
    },
  },
);

const User = model('User', UserSchema);

export default User;
