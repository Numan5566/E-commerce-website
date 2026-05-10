import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
    </div>
  );
};

export default Home;
