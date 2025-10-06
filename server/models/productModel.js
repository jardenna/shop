import { Schema, model } from 'mongoose';
import { INACTIVE, STATUS } from '../config/constants.js';
import SubCategory from './subCategoryModel.js';

const { ObjectId } = Schema;

// Review schema
const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

// Product schema
const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    images: { type: [String], required: true },
    brand: { type: String, required: true },
    quantity: { type: Number },
    subCategory: { type: ObjectId, ref: 'SubCategory', required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: {
      type: Number,
      required: true,
      default: 0,
      set: (value) =>
        typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value,
    },
    productStatus: {
      type: String,
      enum: STATUS,
      default: INACTIVE,
    },
    scheduledDate: {
      type: Date,
    },
    discount: { type: Number, default: 0 },
    material: { type: String, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },

    sizes: {
      type: [String],
      default: undefined,
    },

    colors: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

// Custom logic for dynamic size validation
productSchema.pre('validate', async function (next) {
  try {
    if (!this.subCategory) return next();

    const subCat = await SubCategory.findById(this.subCategory);
    if (!subCat) {
      return next(new Error('Invalid subCategory'));
    }

    const allowedSizes = subCat.allowedSizes ?? [];

    if (allowedSizes.length === 0) {
      // if no sizes are allowed, reset
      this.sizes = [];
      return next();
    }

    if (!this.sizes || this.sizes.length === 0) {
      return next(new Error('Sizes are required for this subCategory'));
    }

    const invalidSizes = this.sizes.filter((s) => !allowedSizes.includes(s));
    if (invalidSizes.length > 0) {
      return next(new Error(`Invalid sizes: ${invalidSizes.join(', ')}`));
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Product = model('Product', productSchema);
export default Product;
