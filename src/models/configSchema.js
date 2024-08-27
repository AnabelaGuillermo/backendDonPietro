import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
  cantidadMesas: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Config', ConfigSchema);
