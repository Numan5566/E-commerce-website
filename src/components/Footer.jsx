import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Twitter, Youtube, ShieldCheck, Globe } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v3">
      <div className="container footer-v3-inner">
        <div className="footer-v3-main">
          {/* Brand Info */}
          <div className="footer-v3-brand">
            <Link to="/" className="footer-logo-v3">
              <img src={logoImg} alt="Lumina" />
              <span>LUMINA</span>
            </Link>
            <p className="footer-desc">
              Premium essentials for the modern lifestyle. Designed in San Francisco, delivered worldwide. Join 50,000+ pioneers living the future.
            </p>
            <div className="footer-socials-v3">
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Twitter size={18} /></a>
              <a href="#"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer-v3-links">
            <div className="footer-col-v3">
              <h5>COLLECTIONS</h5>
              <Link to="/shop">New Arrivals</Link>
              <Link to="/shop">Best Sellers</Link>
              <Link to="/shop">Viral Tech</Link>
              <Link to="/shop">Home Decor</Link>
            </div>
            <div className="footer-col-v3">
              <h5>SUPPORT</h5>
              <Link to="/track-order">Track Order</Link>
              <Link to="/faq">Help Center</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/policy">Return Policy</Link>
            </div>
            <div className="footer-col-v3">
              <h5>LEGAL</h5>
              <Link to="/policy">Privacy Policy</Link>
              <Link to="/policy">Terms of Service</Link>
              <Link to="/policy">Cookie Policy</Link>
              <Link to="/admin">Admin Access</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-v3-bottom">
          <div className="footer-copyright">
            © 2026 LUMINA MINIMAL. ALL RIGHTS RESERVED.
          </div>
          <div className="footer-trust-v3">
            <span><ShieldCheck size={14} /> 256-BIT SSL ENCRYPTION</span>
            <span><Globe size={14} /> FREE USA SHIPPING OVER $50</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

