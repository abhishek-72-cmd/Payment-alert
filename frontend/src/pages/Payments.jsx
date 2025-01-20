import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import './pages.css'

const Payments = () => {
  const [transactionHistory] = useState([
    { date: '2025-01-01', amount: '$200', status: 'Completed' },
    { date: '2025-01-05', amount: '$50', status: 'Pending' },
    { date: '2025-01-07', amount: '$120', status: 'Completed' },
  ]);

  const [pendingPayments] = useState([
    { id: 1, description: 'Electricity Bill', amount: '$100', dueDate: '2025-01-15' },
    { id: 2, description: 'Credit Card Payment', amount: '$500', dueDate: '2025-01-20' },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Visa **** 1234', type: 'Credit Card' },
    { id: 2, name: 'MasterCard **** 5678', type: 'Debit Card' },
  ]);

  const [showAddMethodModal, setShowAddMethodModal] = useState(false);

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    const newMethod = {
      id: paymentMethods.length + 1,
      name: e.target.elements.methodName.value,
      type: e.target.elements.methodType.value,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddMethodModal(false);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Manage Your Payments</h1>

      {/* Transaction History Section */}
      <div className="mb-5">
        <h3>Transaction History</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      transaction.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pending Payments Section */}
      <div className="mb-5">
        <h3>Pending Payments</h3>
        {pendingPayments.length > 0 ? (
          <ul className="list-group">
            {pendingPayments.map((payment) => (
              <li key={payment.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{payment.description}</strong> - Due by {payment.dueDate}
                </span>
                <span className="text-primary">{payment.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending payments.</p>
        )}
      </div>

      {/* Payment Methods Section */}
      <div className="mb-5">
        <h3>Payment Methods</h3>
        {paymentMethods.length > 0 ? (
          <ul className="list-group">
            {paymentMethods.map((method) => (
              <li key={method.id} className="list-group-item">
                {method.name} ({method.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No payment methods added yet.</p>
        )}
        <Button variant="primary" className="mt-3" onClick={() => setShowAddMethodModal(true)}>
          Add Payment Method
        </Button>
      </div>

      {/* Modal for Adding Payment Method */}
      <Modal show={showAddMethodModal} onHide={() => setShowAddMethodModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Method</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPaymentMethod}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="methodName">
              <Form.Label>Payment Method Name</Form.Label>
              <Form.Control type="text" placeholder="e.g., Visa **** 1234" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="methodType">
              <Form.Label>Payment Method Type</Form.Label>
              <Form.Select required>
                <option value="">Select Type</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Account">Bank Account</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddMethodModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Method
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;
