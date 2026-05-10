import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const regions = [
  { code: 'US', name: 'USA', currency: 'USD', symbol: '$', rate: 1 },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', symbol: 'Rs.', rate: 278 },
  { code: 'AE', name: 'UAE', currency: 'AED', symbol: 'د.إ', rate: 3.67 },
];

export const ShopProvider = ({ children }) => {
  const [region, setRegion] = useState(regions[0]);
  const [cart, setCart] = useState([]);

  const formatPrice = (amountInUsd) => {
    const price = (amountInUsd * region.rate).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return `${region.symbol} ${price}`;
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <ShopContext.Provider value={{ region, setRegion, formatPrice, cart, addToCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
