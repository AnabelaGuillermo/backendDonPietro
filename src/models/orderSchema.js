import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: Object,
        ref: 'Products',
        required: true,
      },
    },
  ],
  comments: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      'WaitingForPayment',
      'PreparingOrder',
      'PendingDelivery',
      'Completed',
    ],
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
  table: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Orders', OrderSchema);
