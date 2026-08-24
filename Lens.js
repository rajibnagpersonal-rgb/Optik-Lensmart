const mongoose = require('mongoose');

const lensSchema = new mongoose.Schema({
  lensId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categoryLabel: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  badge: { type: String, default: "" },
  badgeColor: { type: String, default: "bg-blue-50 text-blue-700" },
  shortTag: { type: String, default: "" },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  bestFor: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Lens', lensSchema);