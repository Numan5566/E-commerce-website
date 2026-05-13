import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, formatPrice } = useShop();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-left">
                <ShoppingBag size={20} />
                <span>Your Cart</span>
                {cart.length > 0 && (
                  <span className="cart-count-badge">{cart.length}</span>
                )}
              </div>
              <button className="cart-close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">
                  <Package size={48} />
                </div>
                <h3>Your cart is empty</h3>
                <p>Add some amazing products to get started!</p>
                <button className="btn-premium" onClick={onClose} style={{ marginTop: '1.5rem' }}>
                  Browse Products <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      className="cart-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-cat">{item.category}</div>
                        <div className="cart-item-price">{formatPrice(item.price)}</div>
                      </div>
                      <div className="cart-item-qty">
                        <span>× {item.qty || 1}</span>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id, idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="cart-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="cart-shipping-note">
                    🚚 Free shipping on orders over $50
                  </p>
                  <button className="btn-premium" onClick={handleCheckout} style={{ width: '100%', padding: '1rem', fontSize: '0.95rem' }}>
                    Checkout <ArrowRight size={16} />
                  </button>
                  <button className="cart-continue" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
