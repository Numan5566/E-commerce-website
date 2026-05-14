import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Pages.css';

const Shop = () => {
  const { products, formatPrice } = useShop();

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1 className="page-title">All Products</h1>
        <p>Explore our premium collection of tech accessories.</p>
      </div>
      <div className="shop-grid">
        {products.map(prod => (
          <div key={prod.id} className="other-product-card" style={{margin: '0', flex: 'none'}}>
            <Link to={`/product/${prod.id}`}>
              <div className="other-img-wrap">
                <img src={prod.image} alt={prod.name} />
              </div>
              <div className="other-info">
                <h3>{prod.name}</h3>
                <div className="other-price">
                  <span>{formatPrice(prod.price)}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
