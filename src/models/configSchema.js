import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
  configurations: [
    {
      type: String,
      value: mongoose.Schema.Types.Mixed,
      // mongoose.Schema.Types.Mixed Acepta String, number y array
    },
  ],
});

export default mongoose.model('Config', ConfigSchema);
