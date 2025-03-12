import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch payment alerts from backend API
  const fetchAlerts = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve userId from local storage

      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      // Fetch alerts for the specific user
      const response = await axios.get(`http://localhost:4000/api/cratePayment/paymentAlerts?userId=${userId}`);
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setError("Failed to load payment alerts.");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an alert
  const handleDeleteAlert = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this alert?");
    if (!confirmDelete) return; // Exit if user cancels

    try {
      await axios.delete(`http://localhost:4000/api/cratePayment/deletepaymentAlerts/${id}`);
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== id));
    } catch (error) {
      console.error("Error deleting alert:", error);
      alert("Failed to delete the alert. Please try again.");
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Auto-refresh alerts every 5 seconds
    const interval = setInterval(() => {
      fetchAlerts();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-black-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-black-800">🔔 Your Payment Alerts</h2>

      {loading && <p className="text-center text-black-600">Loading alerts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display alerts in a horizontal grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div
              key={alert._id}
              className="p-6 border border-black-300 rounded-lg shadow-sm bg-black hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-black-800">{alert.paymentName}</h3>
              <p className="text-black-800 mt-2">💰 Amount: <strong>${alert.paymentAmount}</strong></p>
              <p className="text-black-800">📅 Due Date: {new Date(alert.dueDate).toLocaleDateString()}</p>
              <p className="text-black-800">🏦 Receiver: {alert.receiverName}</p>
              <p className="text-black-800">💳 Payment Method: {alert.method}</p>

              {/* Buttons with spacing */}
              <div className="flex justify-between mt-4">
                <button
                  className="w-1/2 bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mr-2"
                  onClick={() => alert(`Paying for ${alert.paymentName}`)}
                >
                  Pay Now
                </button>

                <button
                  className="w-1/2 bg-red-600 text-black py-2 px-4 rounded-lg hover:bg-red-700 transition-colors ml-2"
                  onClick={() => handleDeleteAlert(alert._id)}
                >
                  Delete Alert
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-black-800">No payment alerts found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAlerts;
