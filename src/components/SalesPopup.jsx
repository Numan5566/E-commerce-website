import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { CheckCircle } from 'lucide-react';
import './SalesPopup.css';

const locations = ["Texas, USA", "California, USA", "New York, USA", "Florida, USA", "London, UK", "Sydney, AUS"];
const names = ["Sarah M.", "Michael T.", "Jessica R.", "David K.", "Emily W.", "James L."];
const times = ["2 minutes ago", "5 minutes ago", "12 minutes ago", "Just now", "1 hour ago"];

const SalesPopup = () => {
  const { products } = useShop();
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const showRandomPopup = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      setPopupData({
        product: randomProduct,
        location: randomLocation,
        name: randomName,
        time: randomTime
      });

      // Hide popup after 5 seconds
      setTimeout(() => setPopupData(null), 5000);
    };

    // Initial delay before first popup
    const initialTimer = setTimeout(showRandomPopup, 8000);

    // Show popup every 20-30 seconds
    const interval = setInterval(() => {
      if (!popupData) { // Only trigger if not currently showing
        showRandomPopup();
      }
    }, Math.floor(Math.random() * 10000) + 20000); 

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [products]);

  return (
    <AnimatePresence>
      {popupData && (
        <motion.div
          className="sales-popup"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="sales-img">
            <img src={popupData.product.image} alt="product" />
          </div>
          <div className="sales-info">
            <div className="sales-header">
              <span className="sales-name">{popupData.name}</span> in {popupData.location}
            </div>
            <div className="sales-action">Purchased <strong>{popupData.product.name}</strong></div>
            <div className="sales-footer">
              <span className="sales-time">{popupData.time}</span>
              <span className="sales-verify"><CheckCircle size={10} /> Verified Buyer</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SalesPopup;
