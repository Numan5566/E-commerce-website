/* BUILD_TIMESTAMP: 2026-05-19_02:54 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, ShieldCheck, Truck, 
  Zap, ArrowRight, Star, Globe, 
  Clock, Package, Award, CreditCard, Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Home.css';

// Using high-quality placeholders for build stability
const heroVideo = "https://cdn.pixabay.com/video/2021/04/12/70796-536130424_tiny.mp4";
const sigProduct = "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80";

const Home = () => {
  const { products, formatPrice, addToCart } = useShop();
  const [activeTab, setActiveTab] = useState('viral');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show premium Nomad-style popup after 3 seconds on page load
    const timer = setTimeout(() => {
      const closed = localStorage.getItem('nomad_voucher_closed');
      if (!closed) {
        setShowModal(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const trustItems = [
    { icon: <Truck size={28} />, title: "FREE US SHIPPING", desc: "Fast 2-3 Days Shipping Across USA" },
    { icon: <ShieldCheck size={28} />, title: "AUTHENTICITY", desc: "100% Genuine Premium Tech" },
    { icon: <CreditCard size={28} />, title: "SECURE CHECKOUT", desc: "SSL Encrypted Card Checkout (Stripe)" },
    { icon: <Award size={28} />, title: "LIFETIME WARRANTY", desc: "Hassle-Free Replacements & Returns" }
  ];

  // Filtering products for Shopify-style targeted categories
  const viralProducts = products.filter(p => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(p.id));
  const lifestyleProducts = products.filter(p => [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(p.id));
  const displayedProducts = activeTab === 'viral' ? viralProducts : lifestyleProducts;

  return (
    <div className="home-v3">
      {/* ─── CINEMATIC HERO ─── */}
      <section className="hero-v3">
        <div className="hero-content-v3">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-eyebrow">AMERICA'S PREMIUM TECH DESTINATION</span>
            <h1>ELEVATE YOUR <br />MODERN LIFESTYLE</h1>
            <p>Experience the next generation of minimalist luxury tech and lifestyle winners. Engineered for performance, designed for the modern visionary.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary-v3">Shop New Collection</Link>
              <Link to="/shop" className="btn-outline-v3">Explore Best Sellers</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST RIBBON ─── */}
      <section className="trust-ribbon-v3">
        <div className="container trust-grid-v3">
          {trustItems.map((item, i) => (
            <motion.div key={i} className="trust-item-v3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
              {item.icon}
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── DUAL COLLECTION BANNER GRID ─── */}
      <section className="us-banners-grid" style={{ padding: '6rem 0 2rem 0', background: '#fafafa' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <motion.div 
            className="promo-banner-card"
            style={{ 
              position: 'relative', 
              height: '400px', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              color: '#fff'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', color: '#d4af37', marginBottom: '8px' }}>MINIMAL DESK SETUP</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px 0' }}>ULTRA-CLEAN TECH</h3>
            <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0 0 20px 0', lineHeight: '1.5' }}>Premium GaN chargers, invisible charging setups, and aesthetic levitating lamps.</p>
            <Link to="/shop" className="btn-primary-v3" style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '0.65rem' }}>Explore Collection</Link>
          </motion.div>

          <motion.div 
            className="promo-banner-card"
            style={{ 
              position: 'relative', 
              height: '400px', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              color: '#fff'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', color: '#d4af37', marginBottom: '8px' }}>FUTURISTIC CYBERPUNK GADGETS</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px 0' }}>SMART SETUP GEAR</h3>
            <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0 0 20px 0', lineHeight: '1.5' }}>Glowing RGB tube clocks, transparent 65W GaN fast chargers, and magnetic astronaut speakers.</p>
            <Link to="/shop" className="btn-primary-v3" style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '0.65rem' }}>Explore Collection</Link>
          </motion.div>

        </div>
      </section>

      {/* ─── SIGNATURE SHOWCASE (MAGSAFE POWERSTATION PRO) ─── */}
      <section className="signature-v3">
        <div className="container signature-grid">
          <div className="sig-media-v3">
            <div className="sig-glow-v3"></div>
            <motion.img 
              src={sigProduct} 
              alt="Lumina Air" 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="sig-info-v3">
            <span className="section-eyebrow">2026 SIGNATURE SERIES</span>
            <h2>LUMINA ULTRA <br/>EDITION</h2>
            <p>The pinnacle of tech craftsmanship. Aerospace-grade materials meet unrivaled performance. Exclusive to our US pioneers.</p>
            <div className="sig-features-v3">
              <div className="sig-feat-v3"><Zap size={20} /> <span>Ultra-Fast 100W Charging</span></div>
              <div className="sig-feat-v3"><ShieldCheck size={20} /> <span>Titanium-Grade Build</span></div>
              <div className="sig-feat-v3"><Globe size={20} /> <span>Global Compatibility</span></div>
            </div>
            <Link to="/product/1" className="btn-primary-v3">Order Now — {formatPrice(59.99)}</Link>
          </div>
        </div>
      </section>

      {/* ─── SHOPPING COLLECTION TABS Showcase ─── */}
      <section className="products-v3">
        <div className="container">
          <div className="section-head-v3" style={{ flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '3rem' }}>
            <span className="section-eyebrow" style={{ alignSelf: 'center' }}>HOT DEALS LIVE IN USA</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>TRENDING drops</h2>
            
            {/* Shopify style tabs selectors */}
            <div className="dropship-tabs-wrapper" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => setActiveTab('viral')}
                style={{ 
                  background: activeTab === 'viral' ? '#000' : 'none', 
                  color: activeTab === 'viral' ? '#fff' : '#000', 
                  border: '1px solid #000', 
                  padding: '10px 24px', 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  letterSpacing: '1px', 
                  cursor: 'pointer',
                  borderRadius: '30px',
                  transition: '0.3s'
                }}
              >
                TRENDING TECH DROPS
              </button>
              <button 
                onClick={() => setActiveTab('lifestyle')}
                style={{ 
                  background: activeTab === 'lifestyle' ? '#000' : 'none', 
                  color: activeTab === 'lifestyle' ? '#fff' : '#000', 
                  border: '1px solid #000', 
                  padding: '10px 24px', 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  letterSpacing: '1px', 
                  cursor: 'pointer',
                  borderRadius: '30px',
                  transition: '0.3s'
                }}
              >
                SMART GADGETS & SETUP
              </button>
            </div>
          </div>

          <div className="product-grid-v3">
            {displayedProducts.map(product => (
              <div key={product.id} className="product-card-v3">
                <Link to={`/product/${product.id}`}>
                  <div className="pc-media-v3">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="pc-info-v3">
                    <h3>{product.name}</h3>
                    <div className="pc-price-v3">
                      {formatPrice(product.price)}
                      {product.oldPrice ? (
                        <span>{formatPrice(product.oldPrice)}</span>
                      ) : (
                        <span>{formatPrice(product.price * 1.5)}</span>
                      )}
                    </div>
                  </div>
                </Link>
                <button className="pc-add-v3" onClick={() => addToCart(product)}>
                  <ShoppingBag size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FULL-SCREEN US PROMOTIONAL SPECIAL BANNER ─── */}
      <section className="us-promo-banner-section" style={{ background: 'linear-gradient(135deg, #0e0e0e 0%, #1e1e1e 100%)', color: '#fff', padding: '6rem 0', margin: '4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="promo-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.08, background: 'radial-gradient(circle, #d4af37 10%, transparent 10.01%)', backgroundSize: '20px 20px' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', color: '#d4af37' }}>LIMITED TIME US SPECIAL OFFER 🇺🇸</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>HOLIDAY SUPER SALE: UP TO 60% OFF</h2>
          <p style={{ maxWidth: '650px', fontSize: '0.9rem', color: '#ccc', lineHeight: 1.6, margin: 0 }}>
            Unlock extreme discounts on premium tech setups, smart wellness physical recovery, and aesthetic home devices. Sourced directly from trending catalogs with 2-year warranty and free express shipping. Securely checkout using Stripe.
          </p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '1rem' }}>
            <Link to="/shop" className="btn-primary-v3" style={{ background: '#d4af37', color: '#000', textDecoration: 'none' }}>Shop the Sale Now</Link>
            <Link to="/shop" className="btn-outline-v3" style={{ borderColor: '#fff', color: '#fff', textDecoration: 'none' }}>Explore Best Sellers</Link>
          </div>
        </div>
      </section>

      {/* ─── USA CUSTOMER TESTIMONIALS ─── */}
      <section className="testimonials-v3">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">TRUSTED BY OVER 50,000+ CUSTOMERS</span>
            <h2>VOICES OF OUR COMMUNITY</h2>
          </div>
          <div className="reviews-masonry">
            <div className="review-card-v3">
              <div className="rev-stars-v3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p>"The fastest delivery I've experienced in New York. The quality is absolute top-tier. Highly recommended for premium setups."</p>
              <div className="rev-author-v3">
                <div>
                  <h5>Jonathan K.</h5>
                  <span>Verified Buyer, New York, NY</span>
                </div>
                <div className="verified-badge"><ShieldCheck size={12}/> Verified</div>
              </div>
            </div>
            <div className="review-card-v3">
              <div className="rev-stars-v3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p>"Exactly what I was looking for. Minimalist design that fits perfectly with my office in Los Angeles. 5-star service!"</p>
              <div className="rev-author-v3">
                <div>
                  <h5>Sarah M.</h5>
                  <span>Verified Buyer, Los Angeles, CA</span>
                </div>
                <div className="verified-badge"><ShieldCheck size={12}/> Verified</div>
              </div>
            </div>
            <div className="review-card-v3">
              <div className="rev-stars-v3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p>"Excellent customer support and the packaging was very premium. Will definitely be buying more from Lumina."</p>
              <div className="rev-author-v3">
                <div>
                  <h5>Michael R.</h5>
                  <span>Verified Buyer, Austin, TX</span>
                </div>
                <div className="verified-badge"><ShieldCheck size={12}/> Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER LOGOS ─── */}
      <section className="footer-logos-v3">
        <div className="container">
          <div className="payment-icons">
             <span className="pay-icon">VISA</span>
             <span className="pay-icon">MASTERCARD</span>
             <span className="pay-icon">APPLE PAY</span>
             <span className="pay-icon">STRIPE SECURE CARD</span>
          </div>
        </div>
      </section>

      {/* ─── NOMAD-STYLE NEWSLETTER GIFT MODAL ─── */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="nomad-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="nomad-modal-card"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button 
                className="nomad-modal-close"
                onClick={() => { 
                  setShowModal(false); 
                  localStorage.setItem('nomad_voucher_closed', 'true'); 
                }}
              >
                &times;
              </button>
              
              <div 
                className="nomad-modal-img" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80')" 
                }}
              ></div>
              
              <div className="nomad-modal-content">
                <span className="nomad-modal-tag">LUMINA TECH CLUB</span>
                <h3>CLAIM $15 SETUP GIFT</h3>
                <p>Get a free smart tech desk voucher and exclusive premium US dropshipping alerts when you join the Lumina Minimal circle.</p>
                
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    alert('Success! Code "LUMINA15" sent to your email. Apply at checkout for $15 OFF!'); 
                    setShowModal(false); 
                    localStorage.setItem('nomad_voucher_closed', 'true'); 
                  }}
                >
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                  />
                  <button type="submit" className="btn-nomad-modal">
                    Claim Your Free Gift
                  </button>
                </form>
                
                <span className="nomad-modal-footer">
                  *Available towards your first purchase. Cannot be combined with other offers.
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
