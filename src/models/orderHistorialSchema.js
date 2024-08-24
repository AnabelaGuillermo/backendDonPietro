import mongoose from 'mongoose';

const OrderHistorialSchema = new mongoose.Schema({
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
    enum: ['WaitingForPayment', 'PreparingOrder', 'PendingDelivery'],
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

export default mongoose.model('OrderHistorial', OrderHistorialSchema);
