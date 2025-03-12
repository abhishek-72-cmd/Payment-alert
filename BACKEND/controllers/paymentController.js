const Payment = require('../models/paymetModel');
const User = require ('../models/userModel')



// Get all payments for a user

const getPayments = async (req, res) => {
  try {
    const { userId } = req.query; // Assuming userId is passed as a query param
    const payments = await Payment.find({ userId });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add a new payment

// const addPayment = async (req, res) => {   
//   try {
//     const { userId, type, totalAmount, AddedAmount, remainingBalance } = req.body;

//     // Validate that the user exists
//     const userExists = await User.findById(userId);
//     if (!userExists) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // Create a new payment
//     const payment = new Payment({
//       userId,
//       type,
//       totalAmount,
//       AddedAmount: AddedAmount || 0, // Default to 0 if not provided
//       remainingBalance : totalAmount + AddedAmount ,
//     });

//     // Save the payment to the database
//     await payment.save();
//     res.status(201).json({ message: 'Payment added successfully', payment });
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };





// const addPayment = async (req, res) => {
//   try {
//     const { userId, type, totalAmount, AddedAmount } = req.body;

//     // Validate that the user exists
//     const userExists = await User.findById(userId);
//     if (!userExists) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch the latest payment record for the user
//     const latestPayment = await Payment.findOne({ userId }).sort({ createdAt: -1 });
//     const currentBalance = latestPayment ? latestPayment.remainingBalance : 0;

//     // Calculate the new balance
//     const newBalance = currentBalance + (AddedAmount || 0);

//     // Create a new payment record
//     const payment = new Payment({
//       userId,
//       type,
//       totalAmount: totalAmount || currentBalance,
//       AddedAmount: AddedAmount || 0,
//       remainingBalance: newBalance,
//     });

//     // Save the new payment record
//     await payment.save();

//     res.status(201).json({ message: 'Payment added successfully', payment });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

//newly added the code if not work uncomment the previous one 

const addPayment = async (req, res) => {
  try {
    const { userId, type, totalAmount, AddedAmount } = req.body;

    // Validate that the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate the remaining balance dynamically
    const remainingBalance = totalAmount + AddedAmount;

    // Create a new payment
    const payment = new Payment({
      userId,
      type,
      totalAmount,
      AddedAmount: AddedAmount || 0, // Default to 0 if not provided
      remainingBalance, // Updated dynamically
    });

    // Save the payment to the database
    await payment.save();
    res.status(201).json({ message: 'Payment added successfully', payment });
  } catch (err) {
    console.error('Error adding payment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};




// const getWalletBalance = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate that the user exists in the database
//     const userExists = await User.findById(userId);
//     if (!userExists) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch the latest payment record for the user
//     const latestPayment = await Payment.findOne({ userId }).sort({ createdAt: -1 });

//     if (!latestPayment) {
//       return res.status(404).json({ message: 'No payments found for this user' });
//     }

//     // Return the remaining balance
//     res.status(200).json({ remainingBalance: latestPayment.remainingBalance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };




const getWalletBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate that the user exists in the database
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the latest payment record for the user based on _id
    const latestPayment = await Payment.findOne({ userId }).sort({ _id: -1 });

    if (!latestPayment) {
      return res.status(404).json({ message: 'No payments found for this user' });
    }

    // Return the remaining balance
    res.status(200).json({ remainingBalance: latestPayment.remainingBalance });
  } catch (err) {
    console.error('Error fetching wallet balance:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};




const payBill = async (req, res) => {
  try {
    const { userId, billType, billAmount } = req.body;

    // Validate user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the latest wallet balance
    const latestPayment = await Payment.findOne({ userId }).sort({ createdAt: -1 });
    const currentBalance = latestPayment ? latestPayment.remainingBalance : 0;

    if (currentBalance < billAmount) {
      return res.status(400).json({ message: 'Insufficient funds in wallet' });
    }

    // Deduct the bill amount from the wallet balance
    const remainingBalance = currentBalance - billAmount;

    // Create a new payment entry
    const payment = new Payment({
      userId,
      type: billType,
      totalAmount: currentBalance,
      AddedAmount: 0,
      remainingBalance,
    });

    await payment.save();

    res.status(201).json({
      message: `Payment of ${billAmount} for ${billType} successful`,
      remainingBalance,
    });
  } catch (err) {
    console.error('Error processing bill payment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getPayments, addPayment,getWalletBalance,payBill };
