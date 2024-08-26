import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
  cantidadMesas: {
    type: Number, // Define que cantidadMesas es un número
    required: true, // Especifica que este campo es obligatorio
  },
});

export default mongoose.model('Config', ConfigSchema);
