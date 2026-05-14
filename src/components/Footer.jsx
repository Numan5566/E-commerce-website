import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  MapPin, Phone, Mail, 
  ShieldCheck, Globe, CreditCard
} from 'lucide-react';


/* FORCE_REDEPLOY_MARKER: 2026-05-15_01:10 */
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v3">
      <div className="container">
        <div className="footer-v3-main">
          {/* Brand Col */}
          <div className="footer-v3-brand">
            <Link to="/" className="footer-logo-v3">
              <span>LUMINA UAE</span>
            </Link>
            <p className="footer-desc">
              UAE's premier destination for minimalist tech and lifestyle accessories. Redefining premium craftsmanship for the modern Emirati visionary.
            </p>
            <div className="footer-socials-v3">
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Globe size={18} /></a>
              <a href="#"><Mail size={18} /></a>
            </div>

          </div>

          {/* Links Grid */}
          <div className="footer-v3-links">
            <div className="footer-col-v3">
              <h5>COLLECTIONS</h5>
              <Link to="/shop">New Arrivals</Link>
              <Link to="/shop">Best Sellers</Link>
              <Link to="/shop">Signature Series</Link>
              <Link to="/shop">Limited Drops</Link>
            </div>
            <div className="footer-col-v3">
              <h5>SUPPORT</h5>
              <Link to="/shop">Contact Us</Link>
              <Link to="/shop">Shipping Policy</Link>
              <Link to="/shop">Refund Policy</Link>
              <Link to="/shop">Track Order</Link>
            </div>
            <div className="footer-col-v3">
              <h5>VISIT US</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <MapPin size={14} style={{ marginRight: '8px' }} /> 
                Dubai Silicon Oasis, <br/>Building D, Office 402, <br/>Dubai, UAE
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Phone size={14} style={{ marginRight: '8px' }} /> +971 4 123 4567
              </p>
            </div>
          </div>
        </div>

        <div className="footer-v3-bottom">
          <p className="footer-copyright">
            © 2024 LUMINA UAE LUXURY RETAIL. ALL RIGHTS RESERVED.
          </p>
          <div className="footer-trust-v3">
             <span><ShieldCheck size={14} /> SECURE CHECKOUT</span>
             <span><Globe size={14} /> UAE EXPRESS SHIPPING</span>
             <span><CreditCard size={14} /> CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
