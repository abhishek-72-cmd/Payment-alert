import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import './pages.css'; // Custom styles for Profile
import axios from 'axios'; // Import axios for making API requests

const Profile = () => {
  // Fetching userId and token from local storage
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  });

  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch the user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/Fullprofile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
  }, [userId, token]);

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };


  

  // Handle save button click and make API call to update profile
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/Fullprofile/${userId}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Profile updated successfully!');
      setProfile(response.data.updatedUser);
      setUpdatedProfile(response.data.updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('❌ Failed to update profile.');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Profile</h1>
      {message && (
        <div
          className={`alert ${
            message.includes('✅') ? 'alert-success' : 'alert-danger'
          } text-center`}
        >
          {message}
        </div>
      )}
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
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  value={updatedProfile.gender}
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
              <p>
                <strong>Gender:</strong> {profile.gender}
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
