const express = require('express');
const { addMoney, getWallet } = require('../controllers/walletController');

const router = express.Router();

// Route to add money to wallet
router.post('/add-money', authMiddleware, addMoney);

// Route to get wallet balance and transaction history
router.get('/:userId', authMiddleware, getWallet);

module.exports = router;
