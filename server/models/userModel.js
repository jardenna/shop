import mongoose from 'mongoose';
import { ALLOWED_ROLES } from '../utils/constants.js';

const UserSchema = mongoose.Schema(
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

    role: [
      {
        enum: ALLOWED_ROLES,
        type: String,
        default: ALLOWED_ROLES.User,
        required: true,
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
