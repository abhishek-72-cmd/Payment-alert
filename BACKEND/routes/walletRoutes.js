const express = require('express');
const { addMoney, getWallet } = require('../controllers/walletController.JS')
const getWalletBalance = require('../controllers/paymentController.js')
const router = express.Router();

// Route to add money to wallet


router.post('/add-money', addMoney);

// Route to get wallet balance and transaction history
//router.get('/:userId', authMiddleware, getWallet);
//router.get('/:userId', getWalletBalance);



module.exports = router;
