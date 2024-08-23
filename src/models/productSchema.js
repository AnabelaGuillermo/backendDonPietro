import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['comidas', 'bebidas'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  isVegan: {
    type: Boolean,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    required: true,
  },
  isGlutenFree: {
    type: Boolean,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Products', ProductSchema);
