import React, { useEffect, useState } from 'react';
import { Table, Button, Card, ListGroup } from 'react-bootstrap';
import dashboardService from '../../services/dashboardService';

const UserOverview = () => {
  // State Variables
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });
  const [transactions, setTransactions] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0, recentTransactions: [] });
  const [notifications, setNotifications] = useState([]);

  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userId');

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error('User ID not found. Please log in.');
        return;
      }

      try {
        // Fetch user profile
        const profile = await dashboardService.getUserProfile(userId);
        setUserProfile(profile);
        console.log('User Profile Fetched:', profile);

        // Fetch user payments
        const payments = await dashboardService.getUserPayments(userId);
        setTransactions(payments.filter(payment => payment.status !== 'Pending'));
        setPendingPayments(payments.filter(payment => payment.status === 'Pending'));

        // Calculate wallet balance and recent transactions
        const balance = payments.reduce((total, payment) => total + payment.amount, 0);
        setWallet({
          balance,
          recentTransactions: payments.slice(-5).map(payment => ({
            type: payment.amount > 0 ? 'Deposit' : 'Withdrawal',
            amount: Math.abs(payment.amount),
            date: payment.date,
          })),
        });

        // Mock notifications (replace with real notifications if available)
        setNotifications([
          'Your payment of $75 for Electricity Bill is due on 2025-01-10.',
          'Subscription for streaming service renewed successfully.',
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return <p>User not logged in. Please log in to access your dashboard.</p>;
  }

  return (
    <div className="dashboard container mt-4">
      {/* User Profile Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <Button variant="primary">Account Settings</Button>
        </Card.Body>
      </Card>

      {/* Payment Management Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Payment Management</Card.Title>

          <h5>Transaction History</h5>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Pending Payments</h5>
          <ListGroup>
            {pendingPayments.map((payment, index) => (
              <ListGroup.Item key={index}>
                {payment.name} - Due: {new Date(payment.dueDate).toLocaleDateString()} - Amount: ${payment.amount}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button variant="primary" className="mt-3">Manage Payment Methods</Button>
        </Card.Body>
      </Card>

      {/* Wallet Overview Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Wallet Overview</Card.Title>
          <p><strong>Current Balance:</strong> ${wallet.balance}</p>

          <h5>Transaction Summary</h5>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount ($)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {wallet.recentTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.type}</td>
                  <td>{txn.amount}</td>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="success" className="mt-3">Add Funds</Button>
        </Card.Body>
      </Card>

      {/* Notifications Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Notifications</Card.Title>
          <ListGroup>
            {notifications.map((notification, index) => (
              <ListGroup.Item key={index}>{notification}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserOverview;



















