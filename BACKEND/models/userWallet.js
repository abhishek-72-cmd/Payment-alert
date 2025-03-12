const mongoose = require('mongoose');


// const WalletSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     balance: { type: Number, default: 0 },
//     transactionHistory: [

//       {
       
//         type: String,  // e.g., "add", "payment"
//         amount: Number,
//         date: { type: Date, default: Date.now },
    
//     }

//     ]

//   });

const WalletSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  balance: { 
    type: Number, 
    default: 0 
  },
  transactionHistory: [{
    transactionType: { // Rename "type" to avoid conflicts
      type: String,    // e.g., "credit", "debit"
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: { 
      type: Date, 
      default: Date.now 
    }
  }]
});


transactionHistory: [{
  type: String,  //  Mongoose thinks this defines the subdocument type!
  amount: Number,
  date: Date
}]


// Explicitly name the collection (optional)
const Wallet = mongoose.model('Wallet', WalletSchema, 'userwallets');
module.exports = Wallet;
