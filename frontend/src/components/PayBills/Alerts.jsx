import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const CreatePaymentAlert = () => {
  // Fetch userId from local storage (fallback for testing)
  const userId = localStorage.getItem("userId") || "67890f50ed23ff890f9ac0af";

  const [formData, setFormData] = useState({
    userId,
    paymentName: "",
    paymentAmount: "",
    dueDate: "",
    receiverName: "",
    method: "",
  });

  const [message, setMessage] = useState("");

  // Predefined payment names for type-ahead dropdown
  const paymentNames = [
    "Electricity Bill",
    "Gas Bill",
    "Water Bill",
    "Internet Bill",
    "Phone Recharge",
    "Credit Card Payment",
    "Rent",
    "Insurance Premium",
    "Loan EMI",
    "Subscription Renewal",
  ];

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/cratePayment/alert", formData);
      setMessage("✅ Payment alert created successfully!");

      // Reset form
      setFormData({
        userId,
        paymentName: "",
        paymentAmount: "",
        dueDate: "",
        receiverName: "",
        method: "",
      });
    } catch (error) {
      console.error("Error creating payment alert:", error);
      setMessage("❌ Failed to create payment alert.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0">📢 Create Payment Alert</h2>
            </div>
            <div className="card-body p-4">
              {message && (
                <div
                  className={`alert ${
                    message.includes("✅") ? "alert-success" : "alert-danger"
                  } text-center`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Payment Name */}
                <div className="mb-3">
                  <label className="form-label">Payment Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="paymentName"
                    value={formData.paymentName}
                    onChange={handleChange}
                    list="paymentNames"
                    placeholder="Enter payment name"
                    required
                  />
                  <datalist id="paymentNames">
                    {paymentNames.map((name, index) => (
                      <option key={index} value={name} />
                    ))}
                  </datalist>
                </div>

                {/* Payment Amount and Due Date */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Amount ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="paymentAmount"
                      value={formData.paymentAmount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Receiver Name */}
                <div className="mb-3">
                  <label className="form-label">Receiver Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleChange}
                    placeholder="Enter receiver's name"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Online">💳 Online</option>
                    <option value="Cash">💵 Cash</option>
                    <option value="Card">🏦 Card </option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    🚀 Create Alert
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentAlert;