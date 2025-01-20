import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService'; // Ensure the correct path
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout(); // Call the logout function
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <h2>App Logo</h2>
        <nav>
          <Link to="/dashboard" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/payments" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
            Payments
          </Link>
          <Link to="/wallet" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
            Wallet
          </Link>
          <Link to="/notifications" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
            Notifications
          </Link>
          <Link to="/profile" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
            Profile
          </Link>
          <Link to="/support" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
            Support
          </Link>





          <button onClick={handleLogout}    style={{
              color: '#fff',
              margin: '0 10px',
              textDecoration: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// responsive intereactive with external css  you can use bootsstrap 