const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cronJobs =  require('./cronJobs');
const userRoutes = require('./routes/userRoutes');
const PaymentAlertRoutes = require ('./routes/PaymentAlertRoutes')
const getWalletBalance = require ('./routes/walletRoutes')
const {startCronJob} = require ('./utils/cronJob')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow multiple origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));


app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use ('/api/cratePayment', PaymentAlertRoutes)
app.use ('/api/walletRoutes',getWalletBalance)


console.log(authRoutes.stack.map(layer => layer.route?.path));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // 🔔 Start cron jobs after server starts
  startCronJob();   // <--- Call it here
});