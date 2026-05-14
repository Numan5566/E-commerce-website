import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Truck, ShieldCheck, RefreshCw,
  Star, Zap, Heart, ShoppingBag,
  Award, ChevronLeft, ChevronRight, X, Mail,
  CheckCircle2, Globe, CreditCard, Sparkles
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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <button className="popup-close" onClick={closePopup}><X size={24} /></button>
            <div className="popup-left">
              <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80" alt="promo" />
            </div>
            <div className="popup-right">
              <div className="popup-badge">LIMITED TIME OFFER</div>
              <h2>JOIN THE ELITE</h2>
              <p>Get **20% OFF** your first order and exclusive early access to our next viral drop.</p>
              <div className="popup-form">
                <div className="input-group">
                  <Mail size={18} className="icon-faint" />
                  <input type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button className="btn-premium" onClick={closePopup}>Unlock Privilege</button>
              </div>
              <span className="no-spam">Trusted by 50,000+ customers worldwide.</span>
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
        <div>
          <h2 className="premium-title">{title}</h2>
          <div className="title-underline"></div>
        </div>
        <div className="slider-btns">
          <button className="glass-btn" onClick={() => scroll('left')}><ChevronLeft size={20} /></button>
          <button className="glass-btn" onClick={() => scroll('right')}><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="product-scroll-wrap" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="product-card-premium">
            <div className="card-img-wrapper">
              <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
              {product.badge && <span className="premium-badge">{product.badge}</span>}
              <button className="quick-add-btn" onClick={() => addToCart(product)}>
                <ShoppingBag size={18} />
              </button>
            </div>
            <Link to={`/product/${product.id}`} className="card-body-premium">
              <div className="rating-row"><Star size={12} fill="#f59e0b" stroke="none" /> <span>4.9/5.0</span></div>
              <h3 className="product-title-text">{product.name}</h3>
              <div className="price-row">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
              </div>
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
  
  // Hero Visuals (Using Generated Image)
  const heroImg = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=90"; // Fallback high-res
  
  // Filter Categories
  const cat_new = products.filter(p => p.category === 'New Arrivals').slice(0, 8);
  const cat_best = products.filter(p => p.category === 'Best Sellers').slice(0, 8);
  
  return (
    <div className="home-wrapper">
      <PromoPopup />

      {/* ─── CINEMATIC HERO ─── */}
      <section className="hero-v3">
        <div className="hero-v3-overlay">
           <img src={heroImg} alt="Hero" className="hero-main-img" />
        </div>
        <div className="container hero-v3-content">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="hero-label"><Sparkles size={14} /> NEW SEASON ARRIVAL</div>
            <h1 className="hero-main-title">Future Living,<br/>Refined.</h1>
            <p className="hero-subtext">
              Curated essentials for the modern pioneer. Experience the blend of high-performance technology and minimalist USA design.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-premium-lg">Explore Collection <ArrowRight size={18} /></Link>
              <div className="hero-stats">
                <div className="hero-stat-item">
                  <span className="stat-val">10k+</span>
                  <span className="stat-lab">Happy Users</span>
                </div>
                <div className="stat-div" />
                <div className="hero-stat-item">
                  <span className="stat-val">4.9/5</span>
                  <span className="stat-lab">Rating</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="trust-v3">
        <div className="container trust-grid-v3">
          <div className="trust-node">
            <Truck size={22} />
            <div>
              <h6>Fast & Free Shipping</h6>
              <p>On all USA orders over $50</p>
            </div>
          </div>
          <div className="trust-node">
            <ShieldCheck size={22} />
            <div>
              <h6>Secure Payments</h6>
              <p>SSL Encrypted Checkout</p>
            </div>
          </div>
          <div className="trust-node">
            <RefreshCw size={22} />
            <div>
              <h6>30-Day Guarantee</h6>
              <p>Easy returns, no questions asked</p>
            </div>
          </div>
          <div className="trust-node">
            <Globe size={22} />
            <div>
              <h6>24/7 Support</h6>
              <p>Dedicated USA based team</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS SLIDER ─── */}
      <CategorySlider title="New Arrivals" products={cat_new} formatPrice={formatPrice} addToCart={addToCart} />

      {/* ─── SIGNATURE SHOWCASE ─── */}
      <section className="signature-showcase container">
        <div className="signature-grid">
          <div className="sig-content">
            <div className="sig-label">SIGNATURE PRODUCT</div>
            <h2>Lumina Air<br/>Anti-Gravity Pro</h2>
            <p>The original anti-gravity humidifier that took the internet by storm. Experience pure air and stunning visuals for your workspace.</p>
            <div className="sig-features">
              <div className="sig-feat"><CheckCircle2 size={16} /> Ultra-Silent Tech</div>
              <div className="sig-feat"><CheckCircle2 size={16} /> LED Mood Lighting</div>
              <div className="sig-feat"><CheckCircle2 size={16} /> Smart Auto-Shutoff</div>
            </div>
            <button className="btn-premium-lg" style={{ marginTop: '2rem' }}>Buy Now — $79.00</button>
          </div>
          <div className="sig-visual">
            <div className="sig-blob" />
            <img src="https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80" alt="Featured" />
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─── */}
      <CategorySlider title="Best Sellers" products={cat_best} formatPrice={formatPrice} addToCart={addToCart} />

      {/* ─── TRUST & SOCIAL PROOF ─── */}
      <section className="social-proof">
        <div className="container">
          <div className="section-header-centered">
             <div className="hero-label" style={{ margin: '0 auto 1rem' }}>REVIEWS</div>
             <h2>What Our Community Says</h2>
          </div>
          <div className="reviews-masonry">
            {[1, 2, 3].map(i => (
              <div key={i} className="review-card-v3">
                <div className="rev-header">
                  <div className="rev-stars">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" stroke="none" />)}
                  </div>
                  <span className="rev-date">2 days ago</span>
                </div>
                <p className="rev-text">
                  "Absolutely stunning design. It fits perfectly in my minimalist home office. The build quality exceeded my expectations for the price. Highly recommend to anyone in the US looking for premium tech."
                </p>
                <div className="rev-user">
                  <div className="rev-avatar">{(i === 1 ? 'JD' : i === 2 ? 'SM' : 'AR')}</div>
                  <div>
                    <div className="rev-name">{i === 1 ? 'James D.' : i === 2 ? 'Sarah M.' : 'Alex R.'}</div>
                    <div className="rev-status"><CheckCircle2 size={10} /> Verified Buyer, USA</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAYMENT BADGES ─── */}
      <section className="payment-ribbon container">
        <p>SAFE & SECURE CHECKOUT</p>
        <div className="payment-icons">
          <div className="pay-icon">VISA</div>
          <div className="pay-icon">Mastercard</div>
          <div className="pay-icon">Apple Pay</div>
          <div className="pay-icon">PayPal</div>
          <div className="pay-icon">Amex</div>
        </div>
      </section>

    </div>
  );
};

export default Home;

