import React, { createContext, useState, useContext, useEffect } from 'react';

import { featuredProducts } from '../utils/mockData';

const ShopContext = createContext();

export const regions = [
  { code: 'US', name: 'USA', currency: 'USD', symbol: '$', rate: 1 },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', symbol: 'Rs.', rate: 278 },
  { code: 'AE', name: 'UAE', currency: 'AED', symbol: 'د.إ', rate: 3.67 },
];

export const ShopProvider = ({ children }) => {
  const [region, setRegion] = useState(regions[0]);
  const [cart, setCart] = useState([]);
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shop_products');
    return saved ? JSON.parse(saved) : featuredProducts;
  });

  const addCustomProduct = (newProduct) => {
    const updatedList = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updatedList);
    localStorage.setItem('shop_products', JSON.stringify(updatedList));
  };

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const traceRes = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
        const text = await traceRes.text();
        const lines = text.split('\n');
        const locData = lines.find(line => line.startsWith('loc='));
        
        if (locData) {
          const countryCode = locData.split('=')[1].trim();
          const matched = regions.find(r => r.code === countryCode);
          
          if (matched) {
            setRegion(matched);
          } else {
            // Dynamically pull currency metadata via RestCountries or simple static mapping wrapper
            // For extreme simplicity, fetch free exchange rates directly for current country logic
            // Fallback to basic matching or extended list. Let's grab Live rates from public api.
            
            // Step 2: We have country code! We fetch basic details.
            const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=currencies,name`);
            const meta = await countryRes.json();
            
            if (meta && meta.currencies) {
              const currencyCode = Object.keys(meta.currencies)[0];
              const currencyInfo = meta.currencies[currencyCode];

              const rateRes = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
              const exchangeData = await rateRes.json();
              const rate = exchangeData.rates[currencyCode] || 1;

              setRegion({
                code: countryCode,
                name: meta.name.common || countryCode,
                currency: currencyCode,
                symbol: currencyInfo.symbol || currencyCode,
                rate: rate
              });
            }
          }
        }
      } catch (error) {
        console.error("Loc trace fallback using default US.", error);
      }
    };

    detectLocation();
  }, []);

  const formatPrice = (amountInUsd) => {
    const converted = (amountInUsd * region.rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    // Fix displaying symbol properly if it's null
    const finalSymbol = region.symbol ? region.symbol : region.currency;
    return `${finalSymbol} ${converted}`;
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <ShopContext.Provider value={{ region, setRegion, formatPrice, cart, addToCart, products, addCustomProduct }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
