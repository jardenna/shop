import mongoose from 'mongoose';
import { STATUS } from '../config/constants.js';
import resolveAllowedSizes from '../utils/resolveAllowedSizes.js';
import Category from './categoryModel.js';

const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true },
    translationKey: { type: String },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    categoryStatus: {
      type: String,
      enum: STATUS,
      default: 'Inactive',
    },
    scheduledDate: {
      type: Date,
    },

    allowedSizes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

subCategorySchema.pre('save', async function (next) {
  if (!this.isModified('category')) return next();

  const cat = await Category.findById(this.category);

  if (!cat) return next(new Error('Invalid main category'));

  this.allowedSizes = resolveAllowedSizes({
    subKey: this.translationKey,
    mainKey: cat.categoryName,
  });

  next();
});

// Make subCategoryName + category unique (case-insensitive)
subCategorySchema.set('collation', { locale: 'en', strength: 2 });
subCategorySchema.index({ subCategoryName: 1, category: 1 }, { unique: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
