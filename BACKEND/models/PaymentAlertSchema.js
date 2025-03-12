const mongoose = require('mongoose');


const PaymentAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  paymentName: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: ['Online', 'Cash', 'Card'], // Example for validation
  },
});

module.exports = mongoose.model('PaymentAlert', PaymentAlertSchema);