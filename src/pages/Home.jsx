import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { featuredProducts } from '../utils/mockData';
import heroBg from '../assets/images/hero.png';
import './Home.css';

const Home = () => {
  const { formatPrice } = useShop();

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
            Exclusive Essentials
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-title"
          >
            Elevating Your <br />Everyday Aesthetic.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-cta"
          >
            <button className="btn-premium">Explore Collection <ArrowRight size={16} /></button>
            <button className="btn-outline">Read Essence</button>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section container">
        <div className="section-header">
          <h2>The Curated Edit</h2>
          <p>Hand-selected signature pieces for global connoisseurs.</p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product, idx) => (
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
    </div>
  );
};

export default Home;
