import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3 style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'center'}}>
            <img src={logoImg} style={{height:'22px', width:'auto'}} alt="" />
            LUMINA MINIMAL
          </h3>
          <p>Premium Tech Ecosystem</p>
        </div>
        <div className="footer-links">
          <span>© 2026 Lumina Minimal. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
