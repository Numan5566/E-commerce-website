import React from 'react';
import './Pages.css';

const Contact = () => {
  return (
    <div className="page-container container narrow-page">
      <div className="page-header center">
        <h1 className="page-title">Contact Us</h1>
        <p>We're here to help. Reach out to our 24/7 support team.</p>
      </div>
      
      <form className="standard-form" onSubmit={e => { e.preventDefault(); alert('Message sent successfully!'); }}>
        <div className="form-row" style={{marginBottom: '1rem'}}>
          <div className="input-group-stack">
            <label>Name</label>
            <input type="text" required className="checkout-input" />
          </div>
          <div className="input-group-stack">
            <label>Email</label>
            <input type="email" required className="checkout-input" />
          </div>
        </div>
        <div className="input-group-stack" style={{marginBottom: '1rem'}}>
          <label>Subject</label>
          <input type="text" required className="checkout-input" />
        </div>
        <div className="input-group-stack" style={{marginBottom: '2rem'}}>
          <label>Message</label>
          <textarea required className="checkout-input" rows="5"></textarea>
        </div>
        <button type="submit" className="btn-premium complete-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
