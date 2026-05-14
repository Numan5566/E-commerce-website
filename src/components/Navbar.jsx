import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop, regions } from '../context/ShopContext';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const announcements = [
  "🔥 Limited Time 40% OFF Sitewide",
  "🚚 Free USA Shipping on Orders Above $50",
  "⭐ Trusted by 10,000+ Happy Customers"
];

const Navbar = ({ onCartOpen }) => {
  const { region, setRegion, cartCount } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setAnnouncementIdx(prev => (prev + 1) % announcements.length);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {announcements[announcementIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        style={{ top: '32px' }}
      >
        <div className="container navbar-inner">
          {/* Brand */}
          <div className="nav-brand">
            <Link to="/">
              <img src={logoImg} alt="Lumina" className="nav-logo" />
              <span className="brand-text">LUMINA</span>
            </Link>
          </div>

          {/* Links */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/shop">Best Sellers</Link>
            <Link to="/shop">New Arrivals</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/faq">FAQ</Link>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            {/* Language */}
            <div
              className="lang-selector"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button className="action-btn globe-btn">
                <Globe size={15} />
                <span>{region.code}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="lang-dropdown"
                  >
                    {regions.map(r => (
                      <li key={r.code} onClick={() => { setRegion(r); setLangOpen(false); }}>
                        <span>{r.name}</span>
                        <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.7rem' }}>{r.currency}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <button className="action-btn" aria-label="Search">
              <Search size={17} />
            </button>

            {/* Cart */}
            <button
              className="action-btn cart-btn"
              aria-label="Cart"
              onClick={onCartOpen}
            >
              <ShoppingBag size={17} />
              <span className="cart-label">Cart</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
