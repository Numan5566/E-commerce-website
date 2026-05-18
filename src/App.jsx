import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { 
  ShoppingBag, User, Search, X, 
  Truck, ShieldCheck, Star, CheckCircle, Heart,
  MessageCircle, ArrowRight, ChevronDown, ChevronUp, CreditCard, ChevronLeft, ChevronRight, Award, Users, Gem
} from 'lucide-react';

// Import Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Shop from './pages/Shop';
import CartSidebar from './components/CartSidebar';
import SalesPopup from './components/SalesPopup';

/* ─── SHARED COMPONENTS ─── */

const Header = ({ onCartOpen }) => {
  const { cartCount, region, setRegion, regions } = useShop();
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#fff', borderBottom: '1px solid #eee' }}>
      <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '10px 0', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <ChevronLeft size={14} /><span>⚡ FREE EXPRESS US SHIPPING OVER $50 | 2-YEAR US WARRANTY 🇺🇸</span><ChevronRight size={14} />
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.8fr', alignItems: 'center', padding: '15px 0' }}>
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.65rem', fontWeight: 800 }}>
          {["ALL PRODUCTS", "BEST SELLERS", "NEW ARRIVALS", "TRENDING GADGETS"].slice(0, 3).map(cat => (
            <Link key={cat} to="/shop" style={{ color: '#000', textDecoration: 'none' }}>{cat}</Link>
          ))}
        </div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ border: '3px solid #000', width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>L</span>
            </div>
            <div style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '3px' }}>LUMINA MINIMAL</div>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', alignItems: 'center', fontSize: '0.6rem', fontWeight: 800 }}>
          <Link to="/shop" style={{ color: '#000', textDecoration: 'none' }}>SHOP</Link>
          
          {/* Region selector dropdown */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }} className="nav-region-selector">
             <img src={region.flag} style={{ width: '16px', borderRadius: '2px' }} alt="Flag" />
             <span>{region.code}</span>
             <ChevronDown size={10} />
             <select 
               value={region.code} 
               onChange={(e) => setRegion(regions.find(r => r.code === e.target.value))}
               style={{ position: 'absolute', opacity: 0, inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
             >
               {regions.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
             </select>
          </div>

          <button onClick={onCartOpen} style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer' }}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span style={{ position: 'absolute', top: -5, right: -8, background: '#000', color: '#fff', borderRadius: '50%', width: 15, height: 15, fontSize: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
          </button>
          <Search size={18} />
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const { region, regions, setRegion } = useShop();
  return (
    <footer className="premium-footer">
      <div className="container">
         <div className="footer-main">
            <div className="footer-col">
               <div style={{ border: '2px solid #fff', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>L</span>
               </div>
               <div className="contact-info">
                  support@luminaminimal.com<br/>
                  +1 (800) 555-0199<br/><br/>
                  9AM - 6PM EST, MONDAY - FRIDAY
               </div>
            </div>

            <div className="footer-col">
               <h4>SHOP COLLECTIONS</h4>
               <ul>
                  <li><Link to="/shop">TRENDING GADGETS</Link></li>
                  <li><Link to="/shop">NEW ARRIVALS</Link></li>
                  <li><Link to="/shop">BEST SELLERS</Link></li>
               </ul>
            </div>

            <div className="footer-col">
               <h4>CUSTOMER SERVICE</h4>
               <ul>
                  <li><Link to="/checkout">CHECKOUT</Link></li>
                  <li><Link to="/shop">SHIPPING & RETURNS</Link></li>
                  <li><Link to="/shop">FAQ</Link></li>
               </ul>
            </div>

            <div className="footer-col">
               <h4>SIGN UP FOR NEWSLETTER</h4>
               <input type="text" className="newsletter-input" placeholder="Enter Email" style={{ textAlign: 'left' }} />
               <div className="currency-selector" style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <img src={region.flag} style={{ width: '20px' }} alt="Flag" />
                     <span>{region.currency}</span>
                  </div>
                  <ChevronDown size={14} />
                  <select 
                    value={region.code} 
                    onChange={(e) => setRegion(regions.find(r => r.code === e.target.value))}
                    style={{ position: 'absolute', opacity: 0, inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                  >
                    {regions.map(r => <option key={r.code} value={r.code}>{r.name} ({r.currency})</option>)}
                  </select>
               </div>
            </div>
         </div>

         <div className="footer-bottom">
            <div className="footer-legal">
               <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>TERMS & CONDITIONS</Link>
               <span>|</span>
               <span>© 2026 LUMINA MINIMAL STORE | USA</span>
            </div>
            <div className="payment-logos">
               <span style={{ color: '#fff', fontSize: '0.6rem', marginRight: '10px' }}>FREE US SHIPPING & SECURE STRIPE CHECKOUT</span>
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
               <span style={{ color: '#fff', fontSize: '0.55rem', fontWeight: 800, border: '1px solid #fff', padding: '2px 4px', borderRadius: '2px' }}>STRIPE SECURE</span>
            </div>
         </div>
      </div>
    </footer>
  );
};

const AppContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app-container">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SalesPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reviews" element={<div>Reviews Coming Soon</div>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}
