const user = require ('../models/userModel')
const wallet = require ('../models/userWallet')

    // const addMoney = async (req, res) => {
    //     try { 
    //       const { amount } = req.body;
    //       const userId = req.user.id; // Extract user ID from the auth middleware
      
    //       if (!amount || amount <= 0) {
    //         return res.status(400).json({ message: 'Invalid amount' });
    //       }
      
    //       // Find the user's wallet or create a new one if it doesn't exist
    //       let wallet = await wallet.findOne({ userId });
    //       if (!wallet) {
    //         wallet = new Wallet({ userId, balance: 0, transactions: [] });
    //       }
      
    //       // Add money to the wallet and record the transaction
    //       wallet.balance += amount;
    //       wallet.transactions.push({
    //         type: 'credit',
    //         amount,
    //         date: new Date()
    //       });
      
    //       await wallet.save();
      
    //       res.status(200).json({
    //         message: 'Money added successfully',
    //         wallet: {
    //           balance: wallet.balance,
    //           transactions: wallet.transactions
    //         }
    //       });
    //     } catch (error) {
    //       console.error('Error adding money:', error);
    //       res.status(500).json({ message: 'Internal server error' });
    //     }
    //   };
      
    const Wallet = require('../models/userWallet'); // Use uppercase for model class

    const addMoney = async (req, res) => {
      try { 
        const { amount, userId } = req.body; // Get userId from request body
    
        if (!amount || amount <= 0) {
          return res.status(400).json({ message: 'Invalid amount' });
        }
    
        // Find or create wallet
        let userWallet = await Wallet.findOne({ userId }); // Use uppercase "Wallet"
        if (!userWallet) {
          userWallet = new Wallet({ // Use uppercase "Wallet"
            userId, 
            balance: 0, 
            transactionHistory: []
          });
        }
    

        userWallet.transactionHistory.push({
          transactionType: 'credit', // Match the schema field name
          amount: amount,
          date: new Date()
        });

        // Update balance and transaction
        userWallet.balance += amount;
        userWallet.transactionHistory.push({
          type: 'credit',
          amount,
          date: new Date()
        });
    
        await userWallet.save(); // Save the document
    
        res.status(200).json({
          message: 'Money added successfully',
          balance: userWallet.balance
        });
      } catch (error) {
        console.error('Error adding money:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

      // Controller to get wallet balance and transaction history
      
      // const getWallet = async (req, res) => {
      //   try {
      //     const userId = req.params.userId;
      
      //     // Find the user's wallet
      //     const wallet = await wallet.findOne({ userId });
      
      //     if (!wallet) {
      //       return res.status(404).json({ message: 'Wallet not found' });
      //     }
      
      //     res.status(200).json({
      //       balance: wallet.balance,
      //       transactions: wallet.transactions
      //     });
      //   } catch (error) {
      //     console.error('Error fetching wallet:', error);
      //     res.status(500).json({ message: 'Internal server error' });
      //   }
      // };

      const getWallet = async (req, res) => {
        try {
          const userId = req.params.userId;
      
          let userWallet = await Wallet.findOne({ userId });
          
          // Return zero balance if no wallet exists
          if (!userWallet) {
            return res.status(200).json({
              balance: 0,
              transactions: []
            });
          }
      
          res.status(200).json({
            balance: userWallet.balance,
            transactions: userWallet.transactionHistory
          });
      
        } catch (error) {
          console.error('Error fetching wallet:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };



      module.exports = { addMoney, getWallet }