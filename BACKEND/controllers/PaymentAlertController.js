const express = require ('express');
const PaymentAlert = require ('../models/PaymentAlertSchema')

const createPaymentAlert = async (req, res) => {
    try {

        console.log (req.body)
      const { userId, paymentName, paymentAmount, dueDate, receiverName, method } = req.body;

      if (!userId || !paymentName|| !paymentAmount|| !dueDate|| !receiverName|| !method){
       return res.status(400).json('All fields are required')
      }
  
      const newAlert = new PaymentAlert({
        userId,
        paymentName,
        paymentAmount,
        dueDate,
        receiverName,
        method,
      });
      const savedAlert = await newAlert.save();
      console.log ('saved payment Alert ', savedAlert)
      res.status(201).json({ message: 'Payment alert created successfully.', alert: savedAlert });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payment alert.' });
    }
  };


  // Fetch Payment Alerts
  const getAllPaymentAlerts = async (req, res) => {
    // try {
    //   const alerts = await PaymentAlert.find(); // Fetch all alerts from DB
    //   res.status(200).json(alerts);
    // } catch (error) {
    //   res.status(500).json({ error: "Failed to fetch payment alerts." });
    // }
    try {
      const userId = req.query.userId; // Get userId from query params
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      // Fetch payment alerts for the specific user
      const alerts = await PaymentAlert.find({ userId: userId });
  
      if (alerts.length === 0) {
        return res.status(404).json({ message: "No alerts found for this user." });
      }
  
      res.status(200).json(alerts); // Return the found alerts
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch payment alerts." });
    }

  };

  
  // Update Payment Status
  const updatePaymentStatus = async (req, res) => {
    try {
      const { alertId } = req.params;
  
      const updatedAlert = await PaymentAlert.findByIdAndUpdate(
        alertId,
        { status: 'paid', updatedAt: Date.now() },
        { new: true }
      );
  
      res.status(200).json({ message: 'Payment marked as paid.', alert: updatedAlert });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update payment status.' });
    }
  };
  
// to delete the alert

  const deletePaymentAlert = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAlert = await PaymentAlert.findByIdAndDelete(id);

        if (!deletedAlert) {
            return res.status(404).json({ error: "Payment alert not found." });
        }

        res.status(200).json({ message: "Payment alert deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete payment alert." });
    }
};

  module.exports = {
    createPaymentAlert,
    getAllPaymentAlerts,
    updatePaymentStatus,
    deletePaymentAlert
  };

