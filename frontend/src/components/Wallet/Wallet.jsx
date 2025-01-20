import React, { useState, useEffect,navigate } from 'react';
import { Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../pages/pages.css';
import { useNavigate } from 'react-router-dom';


const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');




  // Fetch wallet balance and transactions

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!userId || !token) {
        console.error('User ID or token is missing. Cannot fetch wallet data.');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching wallet data...');
        const response = await axios.get(
          `http://localhost:4000/api/payments/wallet/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Wallet Data Fetched:', response.data);
        setWalletBalance(response.data.remainingBalance);
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error.response?.data || error.message);
        setWalletBalance('Error fetching balance');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [userId, token]);

  // Handle adding funds
  const handleAddFunds = async () => {
    if (!amountToAdd || isNaN(amountToAdd) || Number(amountToAdd) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/payments/add`,
        {
          userId,
          type: 'Wallet Top-Up',
          totalAmount: walletBalance,
          AddedAmount: Number(amountToAdd),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Funds added successfully:', response.data);

      // Update wallet balance and transactions
      setWalletBalance((prevBalance) => prevBalance + Number(amountToAdd));
      setTransactions([
        {   
          date: new Date().toISOString().split('T')[0], 
          type: 'Deposit', 
          amount: Number(amountToAdd),
        },
        ...transactions,
      ]);

      // Reset states
      setAmountToAdd('');
      setError('');
      setSuccessMessage('Funds added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowAddFundsModal(false);
    } catch (error) {
      console.error('Failed to add funds:', error.response?.data || error.message);
      setError('Failed to add funds. Please try again.');
    }
  };

  // Predefined amounts
  const predefinedAmounts = [100, 500, 1000, 5000];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!userId || !token) {
    return <p>User not logged in. Please log in to access your dashboard.</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Wallet Overview</h1>

      {/* Current Balance */}
      <div className="wallet-balance mb-5 text-center">
        <h2>Your Current Balance</h2>
        <div className="balance-display">
          <span>
            {walletBalance !== null && walletBalance !== 'Error fetching balance'
              ? `₹${walletBalance.toFixed(2)}`
              : 'Balance not available'}
          </span>
        </div>
      </div>

      {/* Transaction Summary */}
      
      <div className="mb-5">
        <h3>Transaction Summary</h3>
        {transactions.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>₹{transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>

      {/* Add Funds */}
      <div className="text-center">
        <Button variant="success" size="lg" onClick={() => setShowAddFundsModal(true)}>
          Add Funds
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}

      {/* Add Funds Modal */}
      <Modal show={showAddFundsModal} onHide={() => setShowAddFundsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Money to Wallet</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <div className="predefined-amounts mb-3">
              <p>Select a predefined amount:</p>
              {predefinedAmounts.map((amount, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  className="me-2 mb-2"
                  onClick={() => setAmountToAdd(amount)}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>
            <Form.Group className="mb-3" controlId="amountToAdd">
              <Form.Label>Or enter a custom amount:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
                min="1"
                step="0.01"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddFundsModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleAddFunds}>
              Add Funds
            </Button>

          </Modal.Footer>


        </Form>
      </Modal>
    </div>
  );
};

export default Wallet;
