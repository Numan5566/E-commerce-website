import React, { useState } from 'react';
import { PackageSearch } from 'lucide-react';
import './Pages.css';

const TrackOrder = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setLoading(false);
      setStatus({ status: 'In Transit', desc: 'Your package is currently in transit to your destination.', date: 'Expected in 3-5 business days' });
    }, 1500);
  };

  return (
    <div className="page-container container narrow-page">
      <div className="page-header center">
        <PackageSearch size={48} color="#a78bfa" style={{marginBottom: '1rem'}} />
        <h1 className="page-title">Track Your Order</h1>
        <p>Enter your order details below to see the current status of your shipment.</p>
      </div>
      
      <form onSubmit={handleTrack} className="standard-form">
        <div className="input-group-stack">
          <label>Order Number</label>
          <input type="text" placeholder="e.g. #LUM1234" required className="checkout-input" />
        </div>
        <div className="input-group-stack">
          <label>Email Address</label>
          <input type="email" placeholder="Email used for purchase" required className="checkout-input" />
        </div>
        <button type="submit" className="btn-premium complete-btn" disabled={loading}>
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>

      {status && (
        <div className="tracking-result">
           <h3>Status: <span className="status-badge">{status.status}</span></h3>
           <p>{status.desc}</p>
           <strong>{status.date}</strong>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
