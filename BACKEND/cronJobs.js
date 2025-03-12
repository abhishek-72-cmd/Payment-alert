// const cron = require('node-cron');
// const Payment = require('./models/paymetModel');  // Assuming Payment is the model for payment data
// const { sendEmailAlert } = require('./utils/notificationService');  // Utility for sending email alerts

// cron.schedule('0 9 * * *', async () => {
//   try {
//     const today = new Date();
//     const duePayments = await Payment.find({ 
//       dueDate: { $lte: today }, 
//       status: 'pending' 
//     });

//     duePayments.forEach(payment => {
//       // Send alert (email/SMS) to user
//       sendEmailAlert(payment.userId, payment);
//     });

//     console.log('Payment alerts sent successfully.');
//   } catch (error) {
//     console.error('Error sending payment alerts:', error);
//   }
// });
