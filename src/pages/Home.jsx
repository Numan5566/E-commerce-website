import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Truck, ShieldCheck, RefreshCw,
  Star, Zap, Heart, ShoppingBag,
  Award, ChevronLeft, ChevronRight, X, Mail
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './Home.css';

/* ─── NEWSLETTER POPUP ──────────────────────── */
const PromoPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const closed = sessionStorage.getItem('popup_closed');
      if (!closed) setShow(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem('popup_closed', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="popup-overlay">
          <motion.div 
            className="popup-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button className="popup-close" onClick={closePopup}><X size={20} /></button>
            <div className="popup-left">
              <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80" alt="promo" />
            </div>
            <div className="popup-right">
              <h2>GET 20% OFF</h2>
              <p>Join the inner circle and get exclusive first access to viral tech drops and seasonal flash sales.</p>
              <div className="popup-form">
                <div className="input-group">
                  <Mail size={16} />
                  <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button className="btn-premium" onClick={closePopup}>Get Offer</button>
              </div>
              <span className="no-spam">* No spam ever. Unsubscribe anytime.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ─── PRODUCT SLIDER SECTION ────────────────── */
const CategorySlider = ({ title, products, formatPrice, addToCart }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400;
      current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-section container">
      <div className="category-header">
        <h2>{title}</h2>
        <div className="slider-btns">
          <button onClick={() => scroll('left')}><ChevronLeft size={20} /></button>
          <button onClick={() => scroll('right')}><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="product-scroll-wrap" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="product-card mini">
            <div className="card-img-wrapper">
              <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <button className="quick-add-small" onClick={() => addToCart(product)}><ShoppingBag size={14} /></button>
            </div>
            <Link to={`/product/${product.id}`} className="card-info-mini">
              <div className="mini-rating"><Star size={10} fill="#f59e0b" stroke="none" /> <span>4.9 (2k+)</span></div>
              <h3 className="mini-title">{product.name}</h3>
              <div className="mini-price-row">
                <span className="mini-price">{formatPrice(product.price)}</span>
                <span className="mini-old">{formatPrice(product.oldPrice)}</span>
              </div>
              <div className="viral-label">🔥 Viral Product</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── MAIN HOME COMPONENT ───────────────────── */
const Home = () => {
  const { formatPrice, products, addToCart } = useShop();
  const [activeHero, setActiveHero] = useState(0);

  // Filter Categories
  const cat_new = products.filter(p => p.category === 'New Arrivals');
  const cat_best = products.filter(p => p.category === 'Best Sellers');
  const cat_tech = products.filter(p => p.category === 'Trending Tech');
  const cat_gadgets = products.filter(p => p.category === 'Chargers & Gadgets');
  const cat_home = products.filter(p => p.category === 'Home Essentials');
  
  const heroSlides = products.filter(p => p.badge === 'Bestseller' || p.badge === 'Trending').slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="home-wrapper">
      <PromoPopup />

      {/* ─── HERO AUTO SLIDER ─── */}
      <section className="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeHero}
            className="hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-bg-overlay">
              <img src={heroSlides[activeHero]?.image} alt="hero" />
            </div>
            <div className="container hero-content-v2">
              <motion.span 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="hero-eyebrow"
              >
                <Zap size={14} /> Featured Innovation
              </motion.span>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.2 }}
              >
                {heroSlides[activeHero]?.name}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.3 }}
              >
                Experience the next generation of lifestyle technology. 
                Designed in the USA for the modern aesthetic.
              </motion.p>
              <motion.div 
                className="hero-btns"
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.4 }}
              >
                <Link to={`/product/${heroSlides[activeHero]?.id}`} className="btn-premium">
                   Shop Now <ArrowRight size={16} />
                </Link>
                <button className="btn-outline-white">View Gallery</button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Hero Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, i) => (
            <div key={i} className={`indicator ${activeHero === i ? 'active' : ''}`} onClick={() => setActiveHero(i)} />
          ))}
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="trust-ribbon">
        <div className="container trust-flex">
          <div><Truck size={18}/> <span>Free Worldwide Shipping</span></div>
          <div className="divider-v"/>
          <div><ShieldCheck size={18}/> <span>Secure Checkout</span></div>
          <div className="divider-v"/>
          <div><RefreshCw size={18}/> <span>30-Day Money Back</span></div>
          <div className="divider-v"/>
          <div><Award size={18}/> <span>Premium Quality</span></div>
        </div>
      </section>

      {/* ─── CATEGORY SLIDERS ─── */}
      <CategorySlider title="New Arrivals" products={cat_new} formatPrice={formatPrice} addToCart={addToCart} />
      <CategorySlider title="Best Sellers" products={cat_best} formatPrice={formatPrice} addToCart={addToCart} />
      <CategorySlider title="Trending Tech" products={cat_tech} formatPrice={formatPrice} addToCart={addToCart} />
      <CategorySlider title="Chargers & Gadgets" products={cat_gadgets} formatPrice={formatPrice} addToCart={addToCart} />
      <CategorySlider title="Home Essentials" products={cat_home} formatPrice={formatPrice} addToCart={addToCart} />

      {/* ─── TESTIMONIALS ─── */}
      <section className="pdp-trust-bar">
        <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Trusted by 10,000+ Happy Customers</h2>
          <p style={{ color: '#666' }}>Don't just take our word for it. Here's what they say.</p>
        </div>
        <div className="container testimonials-grid">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="test-card">
               <div className="test-stars"><Star size={14} fill="#f59e0b" stroke="none" /> x5</div>
               <p>"Best purchase I've made this year. High quality materials and fast shipping to New York!"</p>
               <div className="test-author">
                 <div className="test-avatar">{(i === 1 ? 'JD' : i === 2 ? 'SM' : i === 3 ? 'MR' : 'EW')}</div>
                 <div>
                   <div className="test-name">{i === 1 ? 'John D.' : i === 2 ? 'Sarah M.' : i === 3 ? 'Michael R.' : 'Emma W.'}</div>
                   <div className="test-loc">Verified Buyer, USA</div>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
