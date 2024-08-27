import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('DB Conectada');
  })
  .catch((e) => {
    console.error(e);
  });
