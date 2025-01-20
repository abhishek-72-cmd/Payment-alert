import React, { useEffect, useState,navigate } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });
  const [walletBalance, setWalletBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [amountToAdd, setAmountToAdd] = useState(''); // State for the input amount
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId || !token) {
        console.error('User ID or token is missing. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Attempting to fetch user profile...');
        const response = await axios.get(
          `http://localhost:4000/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('User Profile Fetched:', response.data);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchWalletBalance = async () => {
      if (!userId || !token) {
        console.error('User ID or token is missing. Cannot fetch wallet balance.');
        return;
      }

      try {
        console.log('Attempting to fetch wallet balance...');
        const response = await axios.get(
          `http://localhost:4000/api/payments/wallet/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Wallet Balance Fetched:', response.data);
        setWalletBalance(response.data.remainingBalance);
      } catch (error) {
        console.error('Failed to fetch wallet balance:', error.response?.data || error.message);
        setWalletBalance('Error fetching balance');
      }
    };

    fetchUserProfile();
    fetchWalletBalance();
  }, [userId, token]);

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

      // Update wallet balance after adding funds
      setWalletBalance((prevBalance) => prevBalance + Number(amountToAdd));
      setShowModal(false); // Close the modal
      setAmountToAdd(''); // Reset the form
      setError('');
    } catch (error) {
      console.error('Failed to add funds:', error.response?.data || error.message);
      setError('Failed to add funds. Please try again.');
    }
  
   };


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!userId || !token) {
    return <p>User not logged in. Please log in to access your dashboard.</p>;
  }

  return (
    <div className="dashboard container mt-4">
      {/* User Profile Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <p><strong>Name:</strong> {userProfile.name || 'Name not available'}</p>
          <p><strong>Email:</strong> {userProfile.email || 'Email not available'}</p>
          <Button variant="primary">Account Settings</Button>
        </Card.Body>
      </Card>

      {/* Wallet Balance Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Check Wallet Balance</Card.Title>
          <p>
            <strong>Remaining Balance:</strong>{' '}
            {walletBalance !== null ? `₹${walletBalance}` : 'Balance not available'}
          </p>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Add Funds
          </Button>
          
          
   

        </Card.Body>
      </Card>





      <Card className="mb-4">
      
      <Button variant="primary" onClick={() => navigate('/PayBills')}>
      Pay Bills
    </Button>

      </Card>




      {/* Add Funds Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Funds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Amount to Add</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddFunds}>
            Add Funds
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
