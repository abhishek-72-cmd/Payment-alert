import React, { useState } from 'react';
import './pages.css'; // Optional: Add your CSS file for styling

const HelpAndSupport = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to send the message to your backend or support team
    if (name && email && message) {
      setSuccess('Your message has been sent successfully!');
      setError('');
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setError('Please fill in all fields.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Help and Support</h2>

      <section className="faq-section mb-5">
        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-item">
          <h5>1. How do I reset my password?</h5>
          <p>You can reset your password by clicking on the "Forgot Password?" link on the login page.</p>
        </div>
        <div className="faq-item">
          <h5>2. How do I contact support?</h5>
          <p>You can contact support by filling out the form below or emailing us at support@example.com.</p>
        </div>
        <div className="faq-item">
          <h5>3. Where can I find more information about your services?</h5>
          <p>More information can be found on our website under the "Services" section.</p>
        </div>
      </section>

      <section className="contact-form-section">
        <h3>Contact Us</h3>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default HelpAndSupport;