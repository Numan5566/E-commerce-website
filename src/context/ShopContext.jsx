import React, { createContext, useState, useContext, useEffect } from 'react';
import { featuredProducts } from '../utils/mockData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products] = useState(featuredProducts);
  
  const [regions] = useState([
    { code: 'US', name: 'United States', currency: 'USD', symbol: '$', rate: 1, flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg' },
    { code: 'UK', name: 'United Kingdom', currency: 'GBP', symbol: '£', rate: 0.78, flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg' },
    { code: 'EU', name: 'Europe', currency: 'EUR', symbol: '€', rate: 0.92, flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg' }
  ]);
  const [region, setRegion] = useState(regions[0]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const formatPrice = (price) => {
    const converted = price * region.rate;
    return region.symbol + new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(converted);
  };

  return (
    <ShopContext.Provider value={{ 
      cart, 
      products, 
      addToCart, 
      removeFromCart, 
      clearCart,
      formatPrice, 
      cartCount, 
      region, 
      setRegion, 
      regions,
      cartOpen,
      setCartOpen
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

