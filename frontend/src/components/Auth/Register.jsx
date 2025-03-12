// import react, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../../services/authService";
// import './register.css'

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const navigate = useNavigate();
  
//     const handleRegister = async (e) => {
//       e.preventDefault();
  
//       try {
//         await authService.register({ name, email, password });
//         setSuccess('User  registered successfully!'); // Set success message
//         setError(''); // Clear any previous error messages
//         setTimeout(() => {
//           navigate("/login"); // Navigate to login after a short delay
//         }, 2000); // Delay for 2 seconds to allow the user to see the success message
//       } catch (error) {
//         setError("Registration failed, please try again."); // Set error message
//         setSuccess(''); // Clear any previous success messages
//       }
//     };
  
//     return (
//       <div className="container d-flex align-items-center justify-content-center min-vh-100">
//         <div className="card shadow-lg p-4" style={{ width: '400px' }}>
//           <h2 className="text-center mb-4">Register</h2>
//           {error && <p className="text-danger text-center">{error}</p>}
//           {success && <p className="text-success text-center">{success}</p>}
//           <form onSubmit={handleRegister}>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Register
//             </button>
//           </form>
//           <div className="text-center mt-3">
//             <p className="text-muted">Already have an account? <a href="/login">Login</a></p>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default Register;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    profilePicture: "",
    address: "",
    gender: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      setSuccess("User registered successfully!");
      setError("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("Registration failed, please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '450px' }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Picture (URL)</label>
            <input type="text" name="profilePicture" className="form-control" value={formData.profilePicture} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select name="gender" className="form-control" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
