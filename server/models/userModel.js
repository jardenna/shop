import mongoose from 'mongoose';
import { ALLOWED_ROLES } from '../config/constants.js';
const { ObjectId } = mongoose.Schema;

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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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

  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
