import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    categoryStatus: {
      type: String,
      enum: ['Published', 'Inactive', 'Scheduled'],
      default: 'Inactive',
    },
    scheduledDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Make subCategoryName + category unique (case-insensitive)
subCategorySchema.set('collation', { locale: 'en', strength: 2 });
subCategorySchema.index({ subCategoryName: 1, category: 1 }, { unique: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
