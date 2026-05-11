import React, { useState } from 'react';
import { Search, ShoppingBag, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop, regions } from '../context/ShopContext';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { region, setRegion, cart } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}
    >
      <div className="container navbar-inner">
        <div className="nav-brand">
          <a href="/" style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <img src={logoImg} alt="Lumina" style={{height:'28px', width:'auto'}} />
            LUMINA MINIMAL
          </a>
        </div>

        <nav className="nav-links">
          <a href="#">Collections</a>
          <a href="#">New Arrivals</a>
          <a href="#">Essence</a>
        </nav>

        <div className="nav-actions">
          <div className="lang-selector" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button className="action-btn globe-btn">
              <Globe size={18} />
              <span>{region.code}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="lang-dropdown glass"
                >
                  {regions.map(r => (
                    <li key={r.code} onClick={() => { setRegion(r); setLangOpen(false); }}>
                      {r.name} ({r.currency})
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button className="action-btn"><Search size={20} /></button>
          <button className="action-btn cart-btn">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
