import mongoose from 'mongoose';
import { SIZES, STATUS } from '../config/constants.js';
import SubCategory from './subCategoryModel.js';

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
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

const productSchema = new mongoose.Schema(
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
      default: 'Inactive',
    },
    scheduledDate: {
      type: Date,
    },
    discount: { type: Number, default: 0 },
    material: { type: String, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    sizes: {
      type: [String],
      enum: SIZES,
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
    if (!this.subCategory) return next(); // Intet at validere

    const subCat = await SubCategory.findById(this.subCategory).populate(
      'category',
    );
    if (!subCat || !subCat.category) {
      return next(new Error('Invalid subCategory or category'));
    }

    const categoryName = subCat.subCategoryName.toLowerCase();
    console.log(categoryName);

    if (categoryName === 'accessories') {
      this.sizes = []; // nulstil hvis accessories
    } else {
      // Kræv sizes for andre kategorier
      if (!this.sizes || this.sizes.length === 0) {
        return next(
          new Error(`Sizes are required for category: ${categoryName}`),
        );
      }

      const invalidSizes = this.sizes.filter((s) => !SIZES.includes(s));
      if (invalidSizes.length > 0) {
        return next(new Error(`Invalid sizes: ${invalidSizes.join(', ')}`));
      }
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
