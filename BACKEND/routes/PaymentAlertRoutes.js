const  express = require ('express');

const {
    createPaymentAlert,
    getAllPaymentAlerts,
  updatePaymentStatus,
  deletePaymentAlert
} = require ('../controllers/PaymentAlertController')

const router = express.Router();
// app.use ('/api/cratePayment', PaymentAlertRoutes)

router.post('/alert', createPaymentAlert ,()=>{
    console.log ('create payment alert')
});

// Fetch payment alerts for a user
///api/cratePayment
router.get('/paymentAlerts/', getAllPaymentAlerts);

// Update payment status to "paid"
router.patch('/:alertId/pay', updatePaymentStatus);
// delete payment alert  
router.delete('/deletepaymentAlerts/:id', deletePaymentAlert);



module.exports = router;