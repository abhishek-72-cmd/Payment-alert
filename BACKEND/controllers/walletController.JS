const user = require ('../models/userModel')
const wallet = require ('../models/userWallet')

    const addMoney = async (req, res) => {
        try { 
          const { amount } = req.body;
          const userId = req.user.id; // Extract user ID from the auth middleware
      
          if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
          }
      
          // Find the user's wallet or create a new one if it doesn't exist
          let wallet = await wallet.findOne({ userId });
          if (!wallet) {
            wallet = new Wallet({ userId, balance: 0, transactions: [] });
          }
      
          // Add money to the wallet and record the transaction
          wallet.balance += amount;
          wallet.transactions.push({
            type: 'credit',
            amount,
            date: new Date()
          });
      
          await wallet.save();
      
          res.status(200).json({
            message: 'Money added successfully',
            wallet: {
              balance: wallet.balance,
              transactions: wallet.transactions
            }
          });
        } catch (error) {
          console.error('Error adding money:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      
      // Controller to get wallet balance and transaction history
      
      const getWallet = async (req, res) => {
        try {
          const userId = req.params.userId;
      
          // Find the user's wallet
          const wallet = await wallet.findOne({ userId });
      
          if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
          }
      
          res.status(200).json({
            balance: wallet.balance,
            transactions: wallet.transactions
          });
        } catch (error) {
          console.error('Error fetching wallet:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };






      module.exports = { addMoney, getWallet }