import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Truck, ShieldCheck, RefreshCw,
  Star, ChevronDown, Zap, Heart, ShoppingBag,
  Package, Headphones, Award, Globe, CircleCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import heroBg from '../assets/images/hero_tech.png';
import './Home.css';

/* ─── Countdown Timer ───────────────────────── */
function useCountdown() {
  const getTime = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 0);
    const diff = end - new Date();
    return {
      h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
      m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
      s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
    };
  };
  const [time, setTime] = useState(getTime());
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ─── FAQ Item ──────────────────────────────── */
const FAQItem = ({ q, a, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="accordion-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
    >
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown
          size={18}
          className="accordion-icon"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      {open && (
        <motion.div
          className="accordion-content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          {a}
        </motion.div>
      )}
    </motion.div>
  );
};

/* ─── Main Component ────────────────────────── */
const Home = ({ onCartOpen }) => {
  const { formatPrice, products, addToCart } = useShop();
  const countdown = useCountdown();
  const [wishlisted, setWishlisted] = useState({});
  const [addedId, setAddedId] = useState(null);

  const toggleWish = (id, e) => {
    e.stopPropagation();
    setWishlisted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
    if (onCartOpen) onCartOpen();
  };

  const categories = [
    { icon: '⚡', name: 'Charging Tech', count: '12 Products' },
    { icon: '🌿', name: 'Home Wellness', count: '8 Products' },
    { icon: '🎧', name: 'Audio & Sound', count: '15 Products' },
    { icon: '💡', name: 'Smart Lighting', count: '9 Products' },
  ];

  const reviews = [
    {
      name: 'David S.',
      loc: 'New York, US',
      text: 'The anti-gravity humidifier is MAGIC. Matches my dark setup perfectly. Super fast shipping too!',
      rating: 5,
    },
    {
      name: 'Layla H.',
      loc: 'Dubai, UAE',
      text: 'Excellent quality and packaging. The premium station fast charges all 3 devices simultaneously!',
      rating: 5,
    },
    {
      name: 'Omar F.',
      loc: 'London, UK',
      text: 'Incredible design. Customer support resolved my query in minutes. Highly recommend Lumina!',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'Do you ship internationally?',
      a: 'Absolutely! We partner with premium global carriers to ship worldwide. Most orders arrive within 7–14 business days internationally, and 2–5 days within the USA.',
    },
    {
      q: 'What is the return policy?',
      a: 'We offer a fully protected 30-day return window. If you are not 100% satisfied for any reason, we issue a full refund — no questions asked.',
    },
    {
      q: 'Are the electronics certified?',
      a: 'Yes! All our power stations and electronics carry CE, FCC, and RoHS certifications for your complete safety and peace of mind.',
    },
    {
      q: 'How do I track my order?',
      a: 'Once your order ships, you receive a confirmation email with a tracking link. You can follow your parcel in real time until it reaches your door.',
    },
  ];

  return (
    <div className="home-page">

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-overlay-accent" />
        <img src={heroBg} alt="Lumina Tech" className="hero-bg-img" />

        <div className="container hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="hero-badge-dot" />
            New Collection 2026
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Upgrade Your Desk.<br />Elevate Your Life.
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Premium tech accessories crafted for the modern creator. Minimal design, maximum impact.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <button className="btn-premium">
              Shop Now <ArrowRight size={16} />
            </button>
            <button className="btn-outline">View Bestsellers</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="hero-stat">
              <div className="hero-stat-num">10K+</div>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-label">Countries</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num">4.9★</div>
              <div className="hero-stat-label">Avg Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TRUST BAR ══════════════════════ */}
      <section className="trust-bar">
        <div className="container trust-grid">
          {[
            { icon: <Truck size={20} />, title: 'Fast Global Shipping', desc: 'Expedited 2-Day handling in the USA.' },
            { icon: <ShieldCheck size={20} />, title: 'Secure Encryption', desc: '256-bit SSL protection on all orders.' },
            { icon: <RefreshCw size={20} />, title: '30-Day Returns', desc: 'No questions asked money back policy.' },
            { icon: <Headphones size={20} />, title: '24/7 Support', desc: 'Real humans ready to help anytime.' },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="trust-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="trust-icon-wrap">{t.icon}</div>
              <div className="trust-info">
                <div className="trust-title">{t.title}</div>
                <div className="trust-desc">{t.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ CATEGORIES ══════════════════════ */}
      <section className="category-strip container">
        <div className="section-header">
          <span className="section-eyebrow"><Zap size={12} /> Shop by Category</span>
          <h2>Find Your Perfect Tech</h2>
          <p>Curated collections for every aspect of your modern lifestyle.</p>
        </div>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="cat-icon">{cat.icon}</div>
              <div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{cat.count}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ PRODUCTS ══════════════════════ */}
      <section className="featured-section container">
        <div className="section-header">
          <span className="section-eyebrow"><Award size={12} /> Featured Products</span>
          <h2>Problem-Solving Innovations</h2>
          <p>Highly curated, functional tech for the ultimate aesthetic setup.</p>
        </div>

        <div className="products-grid">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <div className="card-img-wrapper">
                {product.tag && <span className="tag">{product.tag}</span>}
                <button
                  className="wishlist-btn"
                  onClick={(e) => toggleWish(product.id, e)}
                >
                  <Heart
                    size={15}
                    fill={wishlisted[product.id] ? '#f43f5e' : 'none'}
                    stroke={wishlisted[product.id] ? '#f43f5e' : 'currentColor'}
                  />
                </button>
                <img src={product.image} alt={product.name} />
                <button
                  className="quick-add"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <ShoppingBag size={14} />
                  {addedId === product.id ? '✓ Added!' : 'Add to Cart'}
                </button>
              </div>

              <div className="card-info">
                <span className="card-category">{product.category}</span>
                <div className="card-name">{product.name}</div>
                <div className="card-bottom">
                  <div className="card-rating">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={11} fill={s < Math.floor(product.rating || 5) ? '#f59e0b' : '#333'} stroke="none" />
                    ))}
                    <span className="card-rating-num">({(product.reviews || 128).toLocaleString()})</span>
                  </div>
                  <div className="card-price">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ PROMO BANNER ══════════════════════ */}
      <section className="promo-banner container">
        <div className="promo-inner">
          <div>
            <div className="promo-eyebrow">⚡ Limited Time Offer</div>
            <div className="promo-title">Flash Sale — Up to 40% Off<br />Selected Items</div>
            <div className="promo-desc">
              Don't miss these exclusive deals. Offer ends at midnight — grab yours before it's gone.
            </div>
            <div className="countdown-wrap">
              {[
                { num: countdown.h, label: 'Hours' },
                { num: countdown.m, label: 'Mins' },
                { num: countdown.s, label: 'Secs' },
              ].map((b, i) => (
                <div key={i} className="countdown-block">
                  <span className="countdown-num">{b.num}</span>
                  <span className="countdown-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="promo-actions">
            <button className="btn-premium">
              Shop Sale <ArrowRight size={16} />
            </button>
            <button className="btn-ghost">View All Deals</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ REVIEWS ══════════════════════ */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow"><Star size={12} /> Customer Reviews</span>
            <h2>Loved by Creators Globally</h2>
            <p>Join over 10,000+ setups upgraded with Lumina Tech.</p>
          </div>

          <div className="review-grid">
            {reviews.map((rev, i) => (
              <motion.div
                key={i}
                className="review-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5 }}
              >
                <div className="stars">
                  {[...Array(rev.rating)].map((_, s) => (
                    <Star key={s} size={14} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <p className="review-text">{rev.text}</p>
                <div className="reviewer">
                  <div className="rev-avatar">{rev.name[0]}</div>
                  <div>
                    <div className="rev-name">{rev.name}</div>
                    <div className="rev-loc">{rev.loc}</div>
                  </div>
                  <CircleCheck size={16} style={{ marginLeft: 'auto', color: 'var(--accent-secondary)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section className="container">
        <div className="section-header">
          <span className="section-eyebrow"><Package size={12} /> FAQs</span>
          <h2>Got Questions?</h2>
          <p>Everything you need to know before you buy.</p>
        </div>
        <div className="faq-section">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════ NEWSLETTER ══════════════════════ */}
      <section className="container">
        <div className="newsletter-wrap">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Globe size={12} /> Exclusive Access
            </p>
            <h2 className="newsletter-title">Unlock 10% Off Your First Order</h2>
            <p className="newsletter-sub">
              Join the circle. Get exclusive tech drops, flash sales, and first access to new arrivals.
            </p>
            <form className="news-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address..." required />
              <button type="submit" className="btn-premium">
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '1rem', position: 'relative', zIndex: 1 }}>
              No spam ever. Unsubscribe anytime. 🔒
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
