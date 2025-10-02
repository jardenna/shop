import { Schema, model } from 'mongoose';
import { INACTIVE, STATUS } from '../config/constants.js';

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
      unique: true,
    },
    categoryStatus: {
      type: String,
      enum: STATUS,
      default: INACTIVE,
    },
    scheduledDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Category = model('Category', CategorySchema);

export default Category;
