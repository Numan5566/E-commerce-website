import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { 
      id: 1, 
      name: "LUMINA AIR GEN-2", 
      price: 349, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", 
      tag: "BESTSELLER DUBAI",
      gender: "MENS"
    },
    { 
      id: 2, 
      name: "JAWHARA GOLD WATCH", 
      price: 1475, 
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", 
      tag: "BEST SELLER",
      gender: "WOMENS"
    },
    { 
      id: 3, 
      name: "MAHRA BURGUNDY BAG", 
      price: 2389, 
      image: "https://images.unsplash.com/photo-1584917033904-47e08ef7d37b?w=800&q=80", 
      tag: "NEW ARRIVAL",
      gender: "WOMENS"
    },
    { 
      id: 4, 
      name: "HERITAGE CHRONOGRAPH", 
      price: 1850, 
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80", 
      tag: "LUXURY",
      gender: "MENS"
    },
    { 
      id: 5, 
      name: "FYNE GOLD SET", 
      price: 1415, 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", 
      tag: "EXCLUSIVE",
      gender: "WOMENS"
    },
    { 
      id: 6, 
      name: "MAGSAFE POWERBANK", 
      price: 199, 
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80", 
      tag: "TRENDING",
      gender: "MENS"
    }
  ]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(price) + " د.إ";
  };

  return (
    <ShopContext.Provider value={{ cart, products, addToCart, removeFromCart, formatPrice }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
