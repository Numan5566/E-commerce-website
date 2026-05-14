import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

/* Inline SVG social icons (lucide-react older versions may not have these) */
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="main-footer">
      {/* Top Section */}
      <div className="container footer-top">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <img src={logoImg} alt="Lumina" />
            <span>LUMINA</span>
          </div>
          <p className="footer-tagline">
            Premium tech accessories for the modern creator. Elevate your setup, elevate your life.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="Instagram"><IconInstagram /></a>
            <a href="#" className="social-btn" aria-label="Twitter"><IconTwitter /></a>
            <a href="#" className="social-btn" aria-label="YouTube"><IconYoutube /></a>
          </div>
        </div>

        {/* Shop Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/shop">New Arrivals</Link></li>
            <li><Link to="/shop">Bestsellers</Link></li>
            <li><Link to="/shop">Charging Tech</Link></li>
            <li><Link to="/shop">Home Wellness</Link></li>
            <li><Link to="/shop">Sale <span className="footer-badge">40% Off</span></Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Careers</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact">
            <li>
              <Mail size={14} />
              <span>support@lumina.com</span>
            </li>
            <li>
              <Phone size={14} />
              <span>+1 (800) 123-4567</span>
            </li>
            <li>
              <MapPin size={14} />
              <span>123 Tech Ave, San Francisco, CA</span>
            </li>
          </ul>
          <div className="footer-trust-badges">
            <div className="trust-badge-pill">🔒 SSL Secured</div>
            <div className="trust-badge-pill">✅ CE Certified</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Lumina Minimal. All Rights Reserved.</span>
          <div className="footer-payment-icons">
            <span className="pay-icon">VISA</span>
            <span className="pay-icon">MC</span>
            <span className="pay-icon">PayPal</span>
            <span className="pay-icon">Stripe</span>
          </div>
          <Link to="/admin" className="admin-link">Admin Panel</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
