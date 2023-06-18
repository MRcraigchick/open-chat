import mongoose from 'mongoose';

export default mongoose.model(
  'token',
  mongoose.Schema({
    hash: String,
  })
);
