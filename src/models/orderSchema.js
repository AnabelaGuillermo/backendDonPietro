import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  comments: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['WaitingForPayment', 'Pending', 'Completed'],
    default: 'WaitingForPayment',
  },
  paymentMethod: {
    type: String,
    enum: ['MercadoPago', 'Caja'],
    default: 'Caja',
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Orders', OrderSchema);
