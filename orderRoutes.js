const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, updateOrderStage } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/my-orders', getMyOrders);
router.put('/:id/stage', updateOrderStage);

module.exports = router;
