import React, { useState, useEffect, useRef } from 'react';
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
  const scrollRef = useRef(null);

  const generateReviews = (productName) => {
    const names = ["Alex J.", "Sarah M.", "Michael T.", "Jessica R.", "David K.", "Emily W.", "James L.", "Olivia P.", "Daniel B.", "Sophia C."];
    const titles = ["Amazing Product!", "Highly Recommend", "Best Purchase", "Excellent Quality", "Exceeded Expectations", "Great Value", "Love it!", "Perfect", "5 Stars", "Exactly as described"];
    return names.map((name, i) => ({
      id: i,
      name,
      rating: 5,
      date: `${Math.floor(Math.random() * 10) + 1} days ago`,
      title: titles[i],
      text: `I recently bought the ${productName} and I am absolutely blown away by the quality. It works perfectly and the shipping was really fast. Will definitely buy again from Lumina!`,
      location: "Verified Buyer, USA"
    }));
  };

  const productReviews = product ? generateReviews(product.name) : [];
  const otherProducts = products.filter(p => product && p.id !== product.id);

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
    if (!scrollRef.current) return;
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 1500); // Scrolls every 1.5s for better visual pacing

    return () => clearInterval(scrollInterval);
  }, [otherProducts]);

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
            {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
            {product.discount && <span className="discount-tag">{product.discount} OFF</span>}
          </div>

          <div className="urgency-panel">
            <div className="live-viewers">
               🔥 <strong>{liveViewers} people</strong> are viewing this right now
            </div>
            <div className="stock-alert">
               <div className="stock-dot pdp-pulse"></div>
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
            <div className="bullet"><CircleCheck size={18} /> <span>{product.tag || 'Viral Bestselling Tech'}</span></div>
            <div className="bullet"><CircleCheck size={18} /> <span>{product.warranty || '2-Year US Replacement Warranty'}</span></div>
            <div className="bullet"><CircleCheck size={18} /> <span>Free US Express Shipping</span></div>
            <div className="bullet"><CircleCheck size={18} /> <span>SSL Encrypted Checkout (Stripe/PayPal)</span></div>
          </div>

          <button className="pdp-add-btn" onClick={() => addToCart(product)}>
             <ShoppingBag size={20} /> Add to Cart — {formatPrice(product.price)}
          </button>

          <p className="pdp-returns-note">
            <RefreshCw size={14} /> 30-day hassle-free money-back guarantee
          </p>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="pdp-trust-bar">
        <div className="container trust-grid">
          <div className="trust-item"><Shield size={22} /> <span>Lifetime Warranty</span></div>
          <div className="trust-item"><Star size={22} /> <span>50,000+ 5-Star Reviews</span></div>
          <div className="trust-item"><Award size={22} /> <span>Certified Authentic</span></div>
          <div className="trust-item"><Truck size={22} /> <span>Free Express US Shipping</span></div>
        </div>
      </section>

      {/* ─── Detailed Tabs Section ─── */}
      <section className="container pdp-details-tabs">
        <div className="pdp-tabs-header">
          <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</button>
          <button className={activeTab === 'specs' ? 'active' : ''} onClick={() => setActiveTab('specs')}>Specifications</button>
          <button className={activeTab === 'shipping' ? 'active' : ''} onClick={() => setActiveTab('shipping')}>Shipping & Returns</button>
        </div>

        <div className="pdp-tabs-content">
          <div className="pdp-tabs-media">
             <img src={product.image} alt="detail" />
          </div>
          <div className="pdp-tabs-text">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3>Premium Dropship Spec</h3>
                <p>{product.description || "Our signature product designed for those who value both form and function. Built with high-grade components that ensure longevity and peak performance."}</p>
                {product.specs && (
                  <ul className="spec-list">
                     {product.specs.map((spec, i) => (
                       <li key={i}><CircleCheck size={16} /> {spec}</li>
                     ))}
                  </ul>
                )}
              </motion.div>
            )}
            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3>Technical Details</h3>
                {product.specs ? (
                  product.specs.map((spec, i) => (
                    <div className="spec-row" key={i}>
                      <span>Spec {i + 1}</span>
                      <span>{spec}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="spec-row"><span>Material</span> <span>Premium Eco-Sourced</span></div>
                    <div className="spec-row"><span>Weight</span> <span>0.8 lbs</span></div>
                    <div className="spec-row"><span>Dimensions</span> <span>Universal Fit</span></div>
                  </>
                )}
              </motion.div>
            )}
            {activeTab === 'shipping' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3>Shipping & Returns</h3>
                <p>We ship daily from US fulfillment centers. Orders are processed within 24 business hours.</p>
                <div className="shipping-box">
                   <strong>US Standard Shipping:</strong> 3-5 Business Days (Free)
                </div>
                <div className="shipping-box">
                   <strong>US Express Shipping:</strong> 2-3 Business Days ($4.99 or Free over $50)
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Product Specific Reviews (10 Reviews) ─── */}
      <section className="container pdp-reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <div className="reviews-summary">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f59e0b" stroke="none" />)}
            </div>
            <span>5.0 based on 10 reviews</span>
          </div>
        </div>
        <div className="reviews-list">
          {productReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-top">
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" stroke="none" />)}
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <h4 className="review-title">"{review.title}"</h4>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <span className="author-name">{review.name}</span>
                <span className="author-loc"><CircleCheck size={12} color="#48bb78" /> {review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Auto-Scrolling Other Products ─── */}
      <section className="pdp-other-products">
        <div className="container">
          <h2 className="section-title">You Might Also Like</h2>
        </div>
        <div className="other-products-slider" ref={scrollRef}>
          {otherProducts.map(prod => (
            <div key={prod.id} className="other-product-card">
              <Link to={`/product/${prod.id}`}>
                <div className="other-img-wrap">
                  <img src={prod.image} alt={prod.name} />
                  <span className="other-badge">View</span>
                </div>
                <div className="other-info">
                  <h3>{prod.name}</h3>
                  <div className="other-price">
                    <span>{formatPrice(prod.price)}</span>
                    <span className="old">{formatPrice(prod.price * 1.2)}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProductDetails;
