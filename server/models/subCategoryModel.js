import { Schema, model } from 'mongoose';
import { INACTIVE, STATUS } from '../config/constants.js';
import resolveAllowedSizes from '../utils/resolveAllowedSizes.js';
import Category from './categoryModel.js';

const { ObjectId } = Schema;

const subCategorySchema = new Schema(
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
      default: INACTIVE,
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

const SubCategory = model('SubCategory', subCategorySchema);
export default SubCategory;
