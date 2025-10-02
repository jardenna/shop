import mongoose from 'mongoose';
import {
  ALLOWED_FASHION_PREFERENCES,
  ALLOWED_ROLES,
} from '../config/constants.js';
import { renameIdTransform } from '../utils/formatMongoData.js';
const { ObjectId } = mongoose.Schema;

const AddressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, default: 'Denmark' },
  },
  {
    toJSON: {
      virtuals: true,
      transform: renameIdTransform,
    },
    toObject: { virtuals: true },
  },
);

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [AddressSchema],
    phoneNo: { type: String },
    dateOfBirth: { type: Date },
    isAdmin: { type: Boolean, required: true, default: false },
    preferredFashion: {
      enum: ALLOWED_FASHION_PREFERENCES,
      type: String,
      default: 'noPreference',
    },
    role: {
      enum: ALLOWED_ROLES,
      type: String,
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
    toObject: { virtuals: true },
  },
);

const User = mongoose.model('User', UserSchema);

export default User;
