import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop, regions } from '../context/ShopContext';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const announcements = [
  "FREE EXPRESS SHIPPING ON USA ORDERS OVER $50",
  "NEW SEASON DROP: EXPLORE THE FUTURE OF LIVING",
  "JOIN OUR COMMUNITY FOR 20% OFF YOUR FIRST ORDER"
];

const Navbar = ({ onCartOpen }) => {
  const { region, setRegion, cartCount } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setAnnouncementIdx(prev => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="announcement-bar-v3">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="ann-text"
          >
            {announcements[announcementIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      <header className={`navbar-v3 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner-v3">
          {/* Logo */}
          <Link to="/" className="nav-logo-v3">
            <img src={logoImg} alt="Lumina" />
            <span>LUMINA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-menu-v3">
            <Link to="/shop" className="nav-item-v3">Shop All</Link>
            <Link to="/shop" className="nav-item-v3">New Arrivals</Link>
            <Link to="/shop" className="nav-item-v3">Best Sellers</Link>
            <Link to="/track-order" className="nav-item-v3">Track</Link>
          </nav>

          {/* Actions */}
          <div className="nav-actions-v3">
            <button className="nav-action-btn-v3 globe-wrap" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <Globe size={18} />
              <span className="region-code">{region.code}</span>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="region-dropdown-v3">
                    {regions.map(r => (
                      <div key={r.code} className="region-opt" onClick={() => setRegion(r)}>
                        {r.name} <span>{r.currency}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button className="nav-action-btn-v3"><Search size={18} /></button>
            <button className="nav-action-btn-v3 cart-trigger-v3" onClick={onCartOpen}>
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-dot-v3">{cartCount}</span>}
            </button>
            <button className="nav-action-btn-v3 mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="mobile-overlay-v3">
             <nav className="mobile-nav-links">
                <Link to="/shop" onClick={() => setMobileMenu(false)}>Shop All</Link>
                <Link to="/shop" onClick={() => setMobileMenu(false)}>New Arrivals</Link>
                <Link to="/shop" onClick={() => setMobileMenu(false)}>Best Sellers</Link>
                <Link to="/track-order" onClick={() => setMobileMenu(false)}>Track Order</Link>
                <Link to="/faq" onClick={() => setMobileMenu(false)}>FAQ</Link>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

