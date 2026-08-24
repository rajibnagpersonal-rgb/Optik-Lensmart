const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  address: { type: String, required: true },
  
  // Optical Specification
  lensName: { type: String, required: true },
  coating: { type: String, required: true },
  price: { type: Number, required: true },
  
  // Clinical Eye Powers
  rx: {
    od: {
      sph: { type: String, default: '0.00' },
      cyl: { type: String, default: '0.00' },
      axis: { type: String, default: '0' }
    },
    os: {
      sph: { type: String, default: '0.00' },
      cyl: { type: String, default: '0.00' },
      axis: { type: String, default: '0' }
    },
    add: { type: String, default: '' }
  },

  // Mandatory Payment
  utrNumber: { 
    type: String, 
    required: true, 
    length: 12,
    trim: true 
  },
  paymentMethod: { type: String, default: 'UPI_QR' },
  paymentStatus: { 
    type: String, 
    enum: ['checking', 'verified', 'rejected'], 
    default: 'checking' 
  },

  // 6-Stage Lab Lifecycle
  // Stage 1: Payment Checking
  // Stage 2: Order Received
  // Stage 3: In Lab (CNC Surfacing)
  // Stage 4: Lens Ready
  // Stage 5: Dispatched
  // Stage 6: Delivered
  currentStage: { type: Number, min: 1, max: 6, default: 1 },
  statusMessage: { 
    type: String, 
    default: 'Payment checking in progress. Lab verification within 30 minutes.' 
  },

  // Shipping & Courier
  courierPartner: { type: String, default: null },
  trackingId: { type: String, default: null },
  trackingUrl: { type: String, default: null },

  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for 1-Year Fast Querying
orderSchema.index({ orderDate: -1, customerPhone: 1 });

module.exports = mongoose.model('Order', orderSchema);
