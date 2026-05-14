import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { 
      id: 1, 
      name: "Lumina Air Gen-2 (Ultra)", 
      price: 349, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", 
      tag: "BESTSELLER DUBAI",
      desc: "Aerospace-grade titanium audio."
    },
    { 
      id: 2, 
      name: "MagSafe Titanium PowerBank", 
      price: 199, 
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80", 
      tag: "TRENDING UAE",
      desc: "Fast-charge your iPhone 15/16 Pro."
    },
    { 
      id: 3, 
      name: "Anti-Gravity Aura Humidifier", 
      price: 279, 
      image: "https://images.unsplash.com/photo-1585611183913-9154a438848d?w=800&q=80", 
      tag: "VIRAL PRODUCT",
      desc: "Levitating water drops tech."
    },
    { 
      id: 4, 
      name: "Invisible Under-Desk Charger", 
      price: 449, 
      image: "https://images.unsplash.com/photo-1610940882244-116086f6f9fc?w=800&q=80", 
      tag: "LUXURY OFFICE",
      desc: "Charges through 30mm of wood/glass."
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
    return `AED ${price.toLocaleString()}`;
  };

  return (
    <ShopContext.Provider value={{ cart, products, addToCart, removeFromCart, formatPrice }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
