import mongoose from 'mongoose';
import { STATUS } from '../config/constants.js';
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
  if (!this.isModified('category')) return next(); // only if new is changed

  const cat = await Category.findById(this.category);
  if (!cat) return next(new Error('Invalid main category'));

  const name = cat.categoryName.toLowerCase();

  if (name === 'accessories') {
    this.allowedSizes = [];
  } else if (this.subCategoryName.toLowerCase() === 'shoes') {
    this.allowedSizes = [
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      'Onesize',
    ];
  } else {
    this.allowedSizes = ['S', 'M', 'L', 'XL'];
  }

  next();
});

// Make subCategoryName + category unique (case-insensitive)
subCategorySchema.set('collation', { locale: 'en', strength: 2 });
subCategorySchema.index({ subCategoryName: 1, category: 1 }, { unique: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
