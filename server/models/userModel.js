import mongoose from 'mongoose';
import {
  ALLOWED_FASHION_PREFERENCES,
  ALLOWED_ROLES,
} from '../config/constants.js';
const { ObjectId } = mongoose.Schema;

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, default: 'Denmark' },
});

const UserSchema = new mongoose.Schema(
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
    addresses: [AddressSchema],
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
      enum: ALLOWED_FASHION_PREFERENCES,
      type: String,
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
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id; // rename _id to id
        delete ret._id; // remove _id
      },
    },
    toObject: { virtuals: true },
  },
);

const User = mongoose.model('User', UserSchema);

export default User;
