import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { CheckCircle } from 'lucide-react';
import './SalesPopup.css';

const locations = ["Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE", "Ajman, UAE", "Dubai Marina", "Downtown Dubai", "Al Reem Island"];
const names = ["Ahmed A.", "Sarah R.", "Omar J.", "Fatima H.", "Zayed M.", "Laila S."];
const times = ["2 minutes ago", "5 minutes ago", "Just now", "12 minutes ago", "1 hour ago"];

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

    // Initial delay
    const initialTimer = setTimeout(showRandomPopup, 8000);

    // Interval
    const interval = setInterval(() => {
      if (!popupData) {
        showRandomPopup();
      }
    }, 25000); 

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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
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
