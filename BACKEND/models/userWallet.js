const WalletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    transactionHistory: [

      {
       
        type: String,  // e.g., "add", "payment"
        amount: Number,
        date: { type: Date, default: Date.now },
    
    }

    ]

  });
  

