const express = require('express');
const { getPayments, addPayment,getWalletBalance } = require('../controllers/paymentController');
const router = express.Router();
// const { verifyToken } = require('../routes/userRoutes');


// Get all payments for a user
router.get('/', getPayments);

// Add a new paymen
router.post('/add', addPayment);

router.get('/wallet/:userId', getWalletBalance);


module.exports = router;
