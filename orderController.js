const Order = require('../models/Order');

// @desc Place a New Prescription Order (Mandatory UTR + Details)
// @route POST /api/orders
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, address, lensName, coating, price, rx, utrNumber } = req.body;

    if (!customerName || !customerPhone || !address) {
      return res.status(400).json({ success: false, message: 'Customer Name, Phone, and Delivery Address are mandatory!' });
    }

    if (!utrNumber || utrNumber.length !== 12 || isNaN(utrNumber)) {
      return res.status(400).json({ success: false, message: 'A valid 12-digit numeric UPI UTR number is mandatory!' });
    }

    const orderId = `OLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = await Order.create({
      orderId,
      customerName,
      customerPhone,
      address,
      lensName,
      coating,
      price,
      rx,
      utrNumber,
      currentStage: 1, // Stage 1: Payment Checking
      statusMessage: `Payment checking initiated for UTR: ${utrNumber}. Lab surfacing starts on clearance.`
    });

    res.status(201).json({ success: true, message: 'Order queued in Lab (Stage 1)', data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get Orders (Past 1-Year with Recent Priority)
// @route GET /api/orders/my-orders
exports.getMyOrders = async (req, res) => {
  try {
    const phone = req.query.phone;
    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    const query = {
      orderDate: { $gte: oneYearAgo }
    };

    if (phone) query.customerPhone = phone;

    const orders = await Order.find(query).sort({ orderDate: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Update Order Stage & Tracking (Admin / Lab Technician)
// @route PUT /api/orders/:id/stage
exports.updateOrderStage = async (req, res) => {
  try {
    const { currentStage, statusMessage, courierPartner, trackingId, trackingUrl, paymentStatus } = req.body;

    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (currentStage) order.currentStage = currentStage;
    if (statusMessage) order.statusMessage = statusMessage;
    if (courierPartner) order.courierPartner = courierPartner;
    if (trackingId) order.trackingId = trackingId;
    if (trackingUrl) order.trackingUrl = trackingUrl;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.status(200).json({ success: true, message: 'Order status updated successfully', data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
