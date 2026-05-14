import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Globe, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

import logoImg from '../assets/logo.png';
import './Navbar.css';

const announcements = [
  "FREE EXPRESS SHIPPING ON USA ORDERS OVER $50",
  "NEW SEASON DROP: EXPLORE THE FUTURE OF LIVING",
  "JOIN OUR COMMUNITY FOR 20% OFF YOUR FIRST ORDER"
];
const Navbar = ({ onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const { cartCount, region, setRegion, regions } = useShop();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <>
      {/* ─── TOP ANNOUNCEMENT ─── */}
      <div className="announcement-bar-v3">
        FREE NEXT-DAY DELIVERY ACROSS UAE — DUBAI | ABU DHABI | SHARJAH
      </div>

      <nav className={`navbar-v3 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner-v3">
          
          {/* LOGO */}
          <Link to="/" className="nav-logo-v3">
            <span>LUMINA UAE</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="nav-menu-v3">
            <Link to="/shop" className="nav-item-v3">Collection</Link>
            <Link to="/shop" className="nav-item-v3">New Arrivals</Link>
            <Link to="/shop" className="nav-item-v3">Best Sellers</Link>
            <Link to="/shop" className="nav-item-v3">Support</Link>
          </div>

          {/* ACTIONS */}
          <div className="nav-actions-v3">
            <div className="globe-wrap" onMouseEnter={() => setIsRegionOpen(true)} onMouseLeave={() => setIsRegionOpen(false)}>
              <button className="nav-action-btn-v3">
                <Globe size={18} />
                <span className="region-code">{region.code}</span>
              </button>
              
              <AnimatePresence>
                {isRegionOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="region-dropdown-v3">
                    {regions.map(r => (
                      <div key={r.code} className={`region-opt ${region.code === r.code ? 'active' : ''}`} onClick={() => setRegion(r)}>
                        {r.name} <span>{r.currency}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="nav-action-btn-v3"><Search size={18} /></button>
            <Link to="/admin" className="nav-action-btn-v3"><User size={18} /></Link>
            
            <button className="nav-action-btn-v3" onClick={onCartOpen}>
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-dot-v3">{cartCount}</span>}
            </button>


            <button className="mobile-toggle nav-action-btn-v3" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="mobile-overlay-v3">
              <button className="close-btn-v3" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
              <div className="mobile-nav-links">
                <Link to="/shop">COLLECTION</Link>
                <Link to="/shop">NEW ARRIVALS</Link>
                <Link to="/shop">BEST SELLERS</Link>
                <Link to="/shop">OUR STORY</Link>
                <Link to="/admin">ADMIN PORTAL</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
