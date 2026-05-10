import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>LUMINA</h3>
          <p>Premium Tech Ecosystem</p>
        </div>
        <div className="footer-links">
          <span>© 2026 Lumina Store. All Rights Reserved.</span>
          <Link to="/admin" className="admin-link">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
