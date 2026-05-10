import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import heroBg from '../assets/images/hero_tech.png';
import './Home.css';

const Home = () => {
  const { formatPrice, products } = useShop();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <img src={heroBg} alt="Exclusive collection" className="hero-bg-img" />
        <div className="container hero-content">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-subtitle"
          >
            Modern Work & Lifestyle Tech
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-title"
          >
            Upgrade Your Desk. <br />Elevate Your Flow.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-cta"
          >
            <button className="btn-premium">Shop Smart Tech <ArrowRight size={16} /></button>
            <button className="btn-outline">View Bestsellers</button>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section container">
        <div className="section-header">
          <h2>Problem-Solving Innovations</h2>
          <p>Highly curated, functional tech for the ultimate aesthetic setup.</p>
        </div>

        <div className="products-grid">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="product-card"
            >
              <div className="card-img-wrapper glass">
                <span className="tag">{product.tag}</span>
                <img src={product.image} alt={product.name} />
                <button className="quick-add">Quick Add +</button>
              </div>
              <div className="card-info">
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <span className="price">{formatPrice(product.price)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =================== TRUST BELT =================== */}
      <section className="trust-bar">
        <div className="container trust-grid">
          <div className="trust-item">
            <Truck size={32} className="trust-icon" />
            <div>
              <div className="trust-title">Fast Global Shipping</div>
              <div className="trust-desc">Expedited 2-Day handling within the USA.</div>
            </div>
          </div>
          <div className="trust-item">
            <ShieldCheck size={32} className="trust-icon" />
            <div>
              <div className="trust-title">Secure Encryption</div>
              <div className="trust-desc">256-bit SSL protection for transactions.</div>
            </div>
          </div>
          <div className="trust-item">
            <RefreshCw size={32} className="trust-icon" />
            <div>
              <div className="trust-title">30-Day Returns</div>
              <div className="trust-desc">No questions asked money back policy.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== SOCIAL PROOF (REVIEWS) =================== */}
      <section className="container reviews-section">
        <div className="section-header">
          <h2>Loved by Creators Globally</h2>
          <p>Join over 10,000+ setups upgraded with Lumina Tech.</p>
        </div>
        
        <div className="review-grid">
          {[
            { name: "David S.", loc: "New York, US", text: "The anti-gravity humidifier is absolute MAGIC. Matches my dark setup perfectly. Super fast shipping to NYC." },
            { name: "Layla H.", loc: "Dubai, UAE", text: "Top quality product and excellent packaging. The premium station actually fast charges all 3 devices!" },
            { name: "Omar F.", loc: "London, UK", text: "Incredible design aesthetic. Customer support resolved my setup query in minutes. Highly recommended!" }
          ].map((rev, i) => (
            <motion.div key={i} className="review-card" whileHover={{y:-5}}>
              <div className="stars">
                {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="#f59e0b" stroke="none"/>)}
              </div>
              <p className="review-text">"{rev.text}"</p>
              <div className="reviewer">
                <div className="rev-avatar">{rev.name[0]}</div>
                <div>
                  <div style={{fontWeight: 600, fontSize: '0.85rem'}}>{rev.name}</div>
                  <div style={{fontSize: '0.75rem', color: '#666'}}>{rev.loc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =================== INTELLIGENT FAQ =================== */}
      <section className="container faq-section">
        <div className="section-header" style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h2>Common Inquiries</h2>
        </div>
        
        {[
          { q: "Do you ship outside the USA?", a: "Yes! We partner with premium global carriers to ship worldwide. Exact times vary but are highly expedited." },
          { q: "What is the return window?", a: "We offer a fully protected 30-day return window. If you aren't 100% satisfied, we refund 100%." },
          { q: "Are the electronics certified?", a: "Absolutely. All of our power stations and tech products carry complete CE and FCC security certifications." }
        ].map((faq, i) => (
          <div key={i} className="accordion-item">
            <div className="accordion-header">
              <span>{faq.q}</span>
              <ChevronDown size={18} color="#666" />
            </div>
            <div className="accordion-content">{faq.a}</div>
          </div>
        ))}
      </section>

      {/* =================== ELITE NEWSLETTER =================== */}
      <section className="container" style={{marginBottom: '6rem'}}>
        <div className="newsletter-wrap">
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Unlock 10% Off</h2>
          <p style={{color: '#aaa'}}>Join the circle. Get exclusive access to minimalist tech drops & flash sales.</p>
          <form className="news-form" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder="Enter your best email..." required />
            <button type="submit" className="btn-premium" style={{padding: '0 2rem'}}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
