const mongoose = require('mongoose');

const cmsTextSchema = new mongoose.Schema({
  pageKey: { type: String, required: true, unique: true }, // e.g. "global_text", "catalog_page"
  content: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('CmsText', cmsTextSchema);