import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import TrackOrder from './pages/TrackOrder';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import SalesPopup from './components/SalesPopup';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="app-container">
      {!isAdmin && (
        <Navbar onCartOpen={() => setCartOpen(true)} />
      )}
      <main style={{ paddingTop: isAdmin ? 0 : '104px' }}>
        <Routes>
          <Route path="/" element={<Home onCartOpen={() => setCartOpen(true)} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Policy />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/terms-of-service" element={<Policy />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}
      {!isAdmin && <SalesPopup />}
    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
