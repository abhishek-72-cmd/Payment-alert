import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import './register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
  
      try {
        await authService.register({ name, email, password });
        setSuccess('User  registered successfully!'); // Set success message
        setError(''); // Clear any previous error messages
        setTimeout(() => {
          navigate("/login"); // Navigate to login after a short delay
        }, 2000); // Delay for 2 seconds to allow the user to see the success message
      } catch (error) {
        setError("Registration failed, please try again."); // Set error message
        setSuccess(''); // Clear any previous success messages
      }
    };
  
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card shadow-lg p-4" style={{ width: '400px' }}>
          <h2 className="text-center mb-4">Register</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-muted">Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Register;