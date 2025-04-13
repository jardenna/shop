import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }, // Link to Parent Category
    categoryStatus: {
      type: String,
      enum: ['Published', 'Inactive', 'Scheduled'],
      default: 'Inactive',
    },
    scheduledDate: {
      type: Date, // Ensure this field is of type Date
    },
  },
  { timestamps: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
