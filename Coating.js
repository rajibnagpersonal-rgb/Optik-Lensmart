const mongoose = require('mongoose');

const coatingSchema = new mongoose.Schema({
  coatingId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  priceAddon: { type: Number, required: true },
  image: { type: String, required: true },
  badge: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  features: { type: [String], default: [] },
  bestFor: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Coating', coatingSchema);