import React, { createContext, useState, useContext, useEffect } from 'react';
import { featuredProducts } from '../utils/mockData';

const ShopContext = createContext();

export const regions = [
  { code: 'US', name: 'USA',      currency: 'USD', symbol: '$',    rate: 1     },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', symbol: 'Rs.',  rate: 278   },
  { code: 'AE', name: 'UAE',      currency: 'AED', symbol: 'د.إ', rate: 3.67  },
  { code: 'GB', name: 'UK',       currency: 'GBP', symbol: '£',    rate: 0.79  },
  { code: 'EU', name: 'Europe',   currency: 'EUR', symbol: '€',    rate: 0.92  },
];

export const ShopProvider = ({ children }) => {
  const [region, setRegion] = useState(regions.find(r => r.code === 'AE') || regions[0]);

  
  // Cart: array of { ...product, qty }
  const [cart, setCart] = useState(() => {
    try { 
      const saved = localStorage.getItem('lumina_cart');
      const parsed = JSON.parse(saved) || [];
      // Data migration: ensure all items use 'qty'
      return parsed.map(item => ({ ...item, qty: item.qty || item.quantity || 1 }));
    } 
    catch { return []; }
  });


  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shop_products');
      return saved ? JSON.parse(saved) : featuredProducts;
    } catch { return featuredProducts; }
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  // ── Auto-detect user location ──
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const traceRes = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
        const text = await traceRes.text();
        const locLine = text.split('\n').find(l => l.startsWith('loc='));
        if (!locLine) return;
        const countryCode = locLine.split('=')[1].trim();
        const matched = regions.find(r => r.code === countryCode);
        if (matched) { setRegion(matched); return; }

        const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=currencies,name`);
        const meta = await countryRes.json();
        if (meta?.currencies) {
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
            rate,
          });
        }
      } catch (err) {
        console.warn('Location detect failed, using default US.', err);
      }
    };
    detectLocation();
  }, []);

  const formatPrice = (amountInUsd) => {
    const converted = (amountInUsd * region.rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${region.symbol || region.currency} ${converted}`;
  };

  // ── Cart Actions ──
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.id !== productId));
  };

  const updateQty = (productId, delta) => {
    setCart(prev =>
      prev
        .map(i => i.id === productId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── Product Actions ──
  const addCustomProduct = (newProduct) => {
    const updated = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updated);
    localStorage.setItem('shop_products', JSON.stringify(updated));
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('shop_products', JSON.stringify(updated));
  };

  const updateProduct = (id, changes) => {
    const updated = products.map(p => p.id === id ? { ...p, ...changes } : p);
    setProducts(updated);
    localStorage.setItem('shop_products', JSON.stringify(updated));
  };

  return (
    <ShopContext.Provider value={{
      region, setRegion, regions, formatPrice,
      cart, cartCount, addToCart, removeFromCart, updateQty, clearCart,
      products, addCustomProduct, deleteProduct, updateProduct,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
