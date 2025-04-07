import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
      unique: true,
      required: [true, 'Please enter an category name'],
    },
    categoryStatus: {
      type: String,
      enum: ['Published', 'Inactive', 'Scheduled'],
      default: 'inactive',
    },
    scheduledDate: {
      type: Date, // Ensure this field is of type Date
    },
  },
  { timestamps: true },
);

const Category = mongoose.model('Category', CategorySchema);

export default Category;
