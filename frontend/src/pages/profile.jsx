import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import './pages.css'; // Custom styles for Profile

const Profile = () => {

  const [userProfile, setUserProfile] = useState({ name: '', email: '' });
    
  
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 123-456-7890',
    address: '123 Main Street, Cityville, USA',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Profile</h1>
      <Card className="shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Header className="bg-primary text-white">
          <h3>User Information</h3>
        </Card.Header>
        <Card.Body>
          {isEditing ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={updatedProfile.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={updatedProfile.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={updatedProfile.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-end">
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <Button variant="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
