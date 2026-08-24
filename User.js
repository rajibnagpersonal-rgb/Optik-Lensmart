const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 5, max: 120 },
  address: { type: String, required: true, trim: true },
  role: { type: String, enum: ['customer', 'admin', 'optometrist'], default: 'customer' },
  photoLockedUntil: { 
    type: Date, 
    default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1-Year Clinical Lock
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
