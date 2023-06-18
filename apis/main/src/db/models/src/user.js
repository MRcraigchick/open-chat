import mongoose from 'mongoose';

export default mongoose.model(
  'users',
  mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  })
);
