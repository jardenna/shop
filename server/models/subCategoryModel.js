import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }, // Link to Category
  },
  { timestamps: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
