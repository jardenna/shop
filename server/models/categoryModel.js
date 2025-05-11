import mongoose from 'mongoose';
import { STATUS } from '../config/constants.js';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
      unique: true,
      required: [true, 'Please enter an category name'],
    },
    categoryStatus: {
      type: String,
      enum: STATUS,
      default: 'Inactive',
    },
    scheduledDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model('Category', CategorySchema);

export default Category;
