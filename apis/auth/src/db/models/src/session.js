import mongoose, { Schema } from 'mongoose';

const Schema = mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: new Date() },
});

if (Boolean(process.env.EXPIRE_SESSION_TOKEN)) {
  let seconds = Number(process.env.SESSION_TOKEN_EXPIRATION_TIME);
  if (isNaN(seconds)) seconds = false;
  Schema.index({ createdAt: 1 }, { expireAfterSeconds: seconds || 604800 });
}

export default mongoose.model('session', Schema);
