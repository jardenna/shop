import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: 'Category', required: true },
    subCategory: { type: ObjectId, ref: 'SubCategory', required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    material: { type: String, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    sizes: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL'],
      default: ['S', 'M', 'L', 'XL'],
    },
    colors: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
export default Product;
