/* BUILD_TIMESTAMP: 2026-05-15_00:54 */
import React from 'react';

import { motion } from 'framer-motion';
import { 
  ShoppingBag, ShieldCheck, Truck, 
  Zap, ArrowRight, Star, Globe, 
  Clock, Package, Award, CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Home.css';

// Using high-quality placeholders for build stability
const heroVideo = "https://cdn.pixabay.com/video/2021/04/12/70796-536130424_tiny.mp4";
const sigProduct = "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80";


const Home = () => {
  const { products, formatPrice, addToCart } = useShop();

  const trustItems = [
    { icon: <Truck size={28} />, title: "UAE EXPRESS", desc: "Free 24h Delivery in Dubai & Abu Dhabi" },
    { icon: <ShieldCheck size={28} />, title: "AUTHENTICITY", desc: "100% Genuine Premium Tech" },
    { icon: <CreditCard size={28} />, title: "PAYMENT", desc: "Cash on Delivery Available" },
    { icon: <Award size={28} />, title: "WARRANTY", desc: "2-Year Local UAE Warranty" }
  ];

  const featured = products.slice(0, 4);

  return (
    <div className="home-v3">
      {/* ─── CINEMATIC HERO ─── */}
      <section className="hero-v3">
        <video autoPlay loop muted playsInline className="hero-video-v3">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-content-v3">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-eyebrow">DUBAI'S PREMIUM TECH DESTINATION</span>
            <h1>ELEVATE YOUR <br />EMIRATI LIFESTYLE</h1>
            <p>Experience the next generation of minimalist luxury tech. Engineered for performance, designed for the modern visionary.</p>
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

      {/* ─── SIGNATURE SHOWCASE (LUMINA AIR) ─── */}
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
            <span className="section-eyebrow">2024 SIGNATURE SERIES</span>
            <h2>LUMINA ULTRA <br/>EDITION</h2>
            <p>The pinnacle of tech craftsmanship. Aerospace-grade materials meet unrivaled performance. Exclusive to our UAE pioneers.</p>
            <div className="sig-features-v3">
              <div className="sig-feat-v3"><Zap size={20} /> <span>Ultra-Fast 100W Charging</span></div>
              <div className="sig-feat-v3"><ShieldCheck size={20} /> <span>Titanium-Grade Build</span></div>
              <div className="sig-feat-v3"><Globe size={20} /> <span>Global Compatibility</span></div>
            </div>
            <Link to="/product/1" className="btn-primary-v3">Order Now — {formatPrice(299)}</Link>
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="products-v3">
        <div className="container">
          <div className="section-head-v3">
            <h2>LATEST DROPS</h2>
            <Link to="/shop" className="btn-ghost">View All Arrivals <ArrowRight size={16} /></Link>
          </div>
          <div className="product-grid-v3">
            {featured.map(product => (
              <div key={product.id} className="product-card-v3">
                <Link to={`/product/${product.id}`}>
                  <div className="pc-media-v3">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="pc-info-v3">
                    <h3>{product.name}</h3>
                    <div className="pc-price-v3">
                      {formatPrice(product.price)}
                      <span>{formatPrice(product.price * 1.5)}</span>
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

      {/* ─── UAE CUSTOMER TESTIMONIALS ─── */}
      <section className="testimonials-v3">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">TRUSTED BY UAE'S ELITE</span>
            <h2>VOICES OF OUR COMMUNITY</h2>
          </div>
          <div className="reviews-masonry">
            <div className="review-card-v3">
              <div className="rev-stars-v3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p>"The fastest delivery I've experienced in Dubai. The quality is absolute top-tier. Highly recommended for premium setups."</p>
              <div className="rev-author-v3">
                <div>
                  <h5>Ahmed Al-Maktoum</h5>
                  <span>Verified Buyer, Dubai</span>
                </div>
                <div className="verified-badge"><ShieldCheck size={12}/> Verified</div>
              </div>
            </div>
            <div className="review-card-v3">
              <div className="rev-stars-v3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p>"Exactly what I was looking for. Minimalist design that fits perfectly with my office in Abu Dhabi. 5-star service!"</p>
              <div className="rev-author-v3">
                <div>
                  <h5>Sarah Rashid</h5>
                  <span>Verified Buyer, Abu Dhabi</span>
                </div>
                <div className="verified-badge"><ShieldCheck size={12}/> Verified</div>
              </div>
            </div>
            <div className="review-card-v3">
              <div className="rev-stars-v3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              <p>"Excellent customer support and the packaging was very premium. Will definitely be buying more from Lumina."</p>
              <div className="rev-author-v3">
                <div>
                  <h5>Omar J.</h5>
                  <span>Verified Buyer, Sharjah</span>
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
             <span className="pay-icon">CASH ON DELIVERY</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
