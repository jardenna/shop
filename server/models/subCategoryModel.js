import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true },
    category: {
      type: ObjectId,
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

// Drop the old single-field index on subCategoryName if it exists
subCategorySchema.pre('save', async function (next) {
  const collection = mongoose.connection.collections['subcategories'];
  if (collection) {
    const indexes = await collection.indexes();
    if (indexes.some((index) => index.name === 'subCategoryName_1')) {
      await collection.dropIndex('subCategoryName_1');
    }
  }
  next();
});

// Make subCategoryName + category unique (case-insensitive)
subCategorySchema.set('collation', { locale: 'en', strength: 2 });
subCategorySchema.index({ subCategoryName: 1, category: 1 }, { unique: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
