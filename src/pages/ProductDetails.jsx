import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, CircleCheck, ArrowRight, Shield, 
  Truck, RefreshCw, Award, ChevronRight, 
  ShoppingBag, Package, Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, formatPrice, addToCart } = useShop();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [activeFeature, setActiveFeature] = useState(0);
  const [liveViewers, setLiveViewers] = useState(14);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setLiveViewers(Math.floor(Math.random() * (45 - 12 + 1)) + 12);
    }, 15000);

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else { s = 59; if (m > 0) m--; else { m = 59; h--; } }
        return { h, m, s };
      });
    }, 1000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setActiveImg(found.image);
    }
    window.scrollTo(0, 0);
  }, [id, products]);

  if (!product) return <div className="loading">Loading Product...</div>;

  const features = [
    { title: "Premium Build", desc: "Crafted with military-grade materials for ultimate durability." },
    { title: "Smart Integration", desc: "Seamlessly connects with your modern tech ecosystem." },
    { title: "Eco-Friendly", desc: "Made from 100% recycled sustainable materials." },
    { title: "Water Resistant", desc: "IPX6 rated protection against splashes and rain." }
  ];

  return (
    <div className="pdp-container">
      {/* ─── Breadcrumbs ─── */}
      <div className="container breadcrumbs">
        <Link to="/">Home</Link> <ChevronRight size={14} /> 
        <Link to="/">{product.category}</Link> <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      <section className="container pdp-main-grid">
        {/* ─── Left: Gallery ─── */}
        <div className="pdp-gallery">
          <div className="thumb-list">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div 
                key={i} 
                className={`thumb-item ${activeImg === img ? 'active' : ''}`}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt="thumb" />
              </div>
            ))}
          </div>
          <div className="main-img-wrap">
            <div className="award-badge">
              <Award size={16} /> <span>Design Award 2024</span>
            </div>
            <motion.img 
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={activeImg} 
              alt={product.name} 
            />
          </div>
        </div>

        {/* ─── Right: Info ─── */}
        <div className="pdp-info">
          <div className="pdp-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" stroke="none" />)}
            </div>
            <span>2,000+ Happy Customers</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>
          
          <div className="pdp-price-wrap">
            <span className="current-price">{formatPrice(product.price)}</span>
            <span className="old-price">{formatPrice(product.price * 1.2)}</span>
            <span className="discount-tag">40% OFF</span>
          </div>

          <div className="urgency-panel">
            <div className="live-viewers">
               🔥 <strong>{liveViewers} people</strong> are viewing this right now
            </div>
            <div className="stock-alert">
               <div className="stock-dot pulse"></div>
               Only <strong>{product.stock || 7} items</strong> left in stock - order soon
            </div>
            <div className="countdown-timer">
               Hurry! Offer ends in: 
               <div className="time-blocks">
                 <span>{String(timeLeft.h).padStart(2, '0')}</span> :
                 <span>{String(timeLeft.m).padStart(2, '0')}</span> :
                 <span>{String(timeLeft.s).padStart(2, '0')}</span>
               </div>
            </div>
          </div>

          <div className="pdp-variant-selector">
            <p>Color: <strong>Midnight Black</strong></p>
            <div className="color-dots">
              <div className="dot active" style={{ background: '#111' }}></div>
              <div className="dot" style={{ background: '#333' }}></div>
              <div className="dot" style={{ background: '#555' }}></div>
            </div>
          </div>

          <div className="pdp-bullets">
            <div className="bullet"><CircleCheck size={18} /> <span>{product.tag || 'Award-winning design'}</span></div>
            <div className="bullet"><CircleCheck size={18} /> <span>100% Water-resistant body</span></div>
            <div className="bullet"><CircleCheck size={18} /> <span>Quick-access tech compartment</span></div>
            <div className="bullet"><CircleCheck size={18} /> <span>Free worldwide shipping</span></div>
          </div>

          <button className="pdp-add-btn" onClick={() => addToCart(product)}>
             <ShoppingBag size={20} /> Add to Cart — {formatPrice(product.price)}
          </button>

          <p className="pdp-returns-note">
            <RefreshCw size={14} /> 100-day hassle-free returns
          </p>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="pdp-trust-bar">
        <div className="container trust-grid">
          <div className="trust-item"><Shield size={22} /> <span>Lifetime Warranty</span></div>
          <div className="trust-item"><Star size={22} /> <span>50,000+ 5-Star Reviews</span></div>
          <div className="trust-item"><Award size={22} /> <span>Certified Sustainable</span></div>
          <div className="trust-item"><Truck size={22} /> <span>Free Express Shipping</span></div>
        </div>
      </section>

      {/* ─── Detailed Tabs Section ─── */}
      <section className="container pdp-details-tabs">
        <div className="pdp-tabs-header">
          <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</button>
          <button className={activeTab === 'specs' ? 'active' : ''} onClick={() => setActiveTab('specs')}>Specifications</button>
          <button className={activeTab === 'shipping' ? 'active' : ''} onClick={() => setActiveTab('shipping')}>Shipping</button>
        </div>

        <div className="pdp-tabs-content">
          <div className="pdp-tabs-media">
             <img src={product.image} alt="detail" />
          </div>
          <div className="pdp-tabs-text">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3>Crafted for the Modern Lifestyle</h3>
                <p>{product.description || "Our signature product designed for those who value both form and function. Built with high-grade components that ensure longevity and peak performance."}</p>
                <ul className="spec-list">
                   <li><CircleCheck size={16} /> Lightweight yet durable construction</li>
                   <li><CircleCheck size={16} /> Integrated smart features for easy use</li>
                   <li><CircleCheck size={16} /> Sleek, minimalist aesthetic</li>
                </ul>
              </motion.div>
            )}
            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3>Technical Details</h3>
                <div className="spec-row"><span>Material</span> <span>Recycled Poly-Carb</span></div>
                <div className="spec-row"><span>Weight</span> <span>1.2 lbs</span></div>
                <div className="spec-row"><span>Dimensions</span> <span>12" x 8" x 2"</span></div>
                <div className="spec-row"><span>Compatibility</span> <span>Universal</span></div>
              </motion.div>
            )}
            {activeTab === 'shipping' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3>Shipping & Returns</h3>
                <p>We ship worldwide. Orders are typically processed within 24 hours.</p>
                <div className="shipping-box">
                   <strong>Standard Shipping:</strong> 3-5 Business Days (Free)
                </div>
                <div className="shipping-box">
                   <strong>Express Shipping:</strong> 1-2 Business Days ($15)
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Feature Showcase (Grid) ─── */}
      <section className="pdp-showcase">
        <div className="container">
          <div className="showcase-grid">
            <div className="showcase-media">
               <div className="showcase-img-grid">
                 <img src={product.image} alt="f1" />
                 <img src={product.image} alt="f2" />
                 <img src={product.image} alt="f3" />
                 <img src={product.image} alt="f4" />
               </div>
            </div>
            <div className="showcase-content">
               <div className="pdp-tabs-mini">
                  {features.map((f, i) => (
                    <button 
                      key={i} 
                      className={activeFeature === i ? 'active' : ''}
                      onClick={() => setActiveFeature(i)}
                    >
                      {f.title}
                    </button>
                  ))}
               </div>
               <motion.div 
                 key={activeFeature}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="feature-detail"
               >
                 <h2>{features[activeFeature].title}</h2>
                 <p>{features[activeFeature].desc}</p>
                 <Link to="/" className="learn-more">Learn more about our materials <ArrowRight size={14}/></Link>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Press / Media ─── */}
      <section className="container pdp-press">
         <div className="press-logos">
            <span>Forbes</span>
            <span>HYPEBEAST</span>
            <span>Esquire</span>
            <span>GQ</span>
            <span>Wired</span>
         </div>
      </section>
    </div>
  );
};

export default ProductDetails;
