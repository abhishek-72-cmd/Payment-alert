import React, { useState } from 'react';
import { Button, Modal, Form, Card, ListGroup } from 'react-bootstrap';

const PayBills = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [amountToPay, setAmountToPay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(250);
     
  const bills = [
    'Light Bill',
    'Gas Bill',
    'Water Bill',
    'Cash Withdrawal',
    'Phone Recharge',
    'LIC Policy',
  ];

  const handleSelectBill = (billName) => {
    setSelectedBill(billName);
    setAmountToPay(Math.floor(Math.random() * (1000 - 500 + 1)) + 500); // Generate random amount between 500 and 1000
    setShowModal(true);
  };

  const handlePayBill = (e) => {
    e.preventDefault();

    if (amountToPay > walletBalance) {
      alert('Insufficient wallet balance!');
      return;
    }

    // Deduct amount from wallet balance
    setWalletBalance(walletBalance - amountToPay);
    alert(`Successfully paid ${selectedBill} of $${amountToPay}`);
    setShowModal(false);
  };

  return (
    <div className="pay-bills container mt-4">
      <h1 className="text-center mb-4">Pay Bills</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Available Bills</Card.Title>
          <ListGroup>
            {bills.map((bill, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleSelectBill(bill)}
              >
                {bill}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Wallet Balance Display */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Wallet Balance: ${walletBalance.toFixed(2)}</h5>
        </Card.Body>
      </Card>

      {/* Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pay {selectedBill}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlePayBill}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Amount to Pay</Form.Label>
              <Form.Control
                type="number"
                value={amountToPay}
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Pay
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default PayBills;
