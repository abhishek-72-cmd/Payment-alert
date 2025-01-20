import React, { useState } from 'react';
import { Alert, ListGroup, Card, Badge } from 'react-bootstrap';
import './pages.css'; // Custom styles for Notifications

const Notifications = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'success', message: 'Payment of $150 was successful.', date: '2025-01-07' },
    { id: 2, type: 'danger', message: 'Transaction failed for $200.', date: '2025-01-06' },
    { id: 3, type: 'info', message: 'Your profile was updated.', date: '2025-01-05' },
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, message: 'Upcoming subscription renewal: Netflix - $15.99', dueDate: '2025-01-15' },
    { id: 2, message: 'Credit card bill payment due: $500', dueDate: '2025-01-10' },
  ]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Notifications</h1>

      {/* Alerts Section */}
      <Card className="mb-5 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3>Alerts</h3>
        </Card.Header>
        <Card.Body>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <Alert key={alert.id} variant={alert.type} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{alert.message}</strong>
                  <br />
                  <small className="text-muted">Date: {alert.date}</small>
                </div>
                <Badge bg={alert.type === 'danger' ? 'dark' : 'light'} text={alert.type === 'danger' ? 'light' : 'dark'}>
                  {alert.type.toUpperCase()}
                </Badge>
              </Alert>
            ))
          ) : (
            <p>No alerts available.</p>
          )}
        </Card.Body>
      </Card>

      {/* Reminders Section */}
      <Card className="shadow-sm">
        <Card.Header className="bg-secondary text-white">
          <h3>Reminders</h3>
        </Card.Header>
        <Card.Body>
          {reminders.length > 0 ? (
            <ListGroup>
              {reminders.map((reminder) => (
                <ListGroup.Item key={reminder.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{reminder.message}</strong>
                    <br />
                    <small className="text-muted">Due Date: {reminder.dueDate}</small>
                  </div>
                  <Badge bg="warning" text="dark">
                    UPCOMING
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No reminders available.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Notifications;
