const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, 
  totalAmount: { type: Number, required: true },
  AddedAmount: { type: Number, default: 0 },
  remainingBalance: { type: Number },
});


const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
