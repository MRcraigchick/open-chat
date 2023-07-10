import mongoose from 'mongoose';

export default mongoose.model(
  'session',
  mongoose.Schema({
    token: String,
  })
);
