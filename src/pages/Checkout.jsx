import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Lock, CreditCard, ChevronLeft } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartSubtotal, formatPrice, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 50 ? 0 : 15; // Free shipping over $50
  const total = subtotal + shipping;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call to payment gateway (Payoneer / 2Checkout / Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('Order Confirmed! Your payment was successful and confirmation email sent.');
      navigate('/');
    }, 2500);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty container">
        <h2>Your cart is empty</h2>
        <button className="btn-premium" onClick={() => navigate('/')}>Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-container container">
      {/* ─── LEFT: Forms ─── */}
      <div className="checkout-main">
        <div className="checkout-header">
          <h1>LUMINA</h1>
          <div className="checkout-breadcrumbs">
             <span className={step >= 1 ? 'active' : ''}>Information</span> &gt;
             <span className={step >= 2 ? 'active' : ''}>Shipping</span> &gt;
             <span className={step >= 3 ? 'active' : ''}>Payment</span>
          </div>
        </div>

        <form onSubmit={step === 3 ? handleCompleteOrder : (e) => { e.preventDefault(); setStep(step + 1); }}>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="form-section">
                  <h2>Contact Information</h2>
                  <input type="email" placeholder="Email" required className="checkout-input" />
                  
                  <h2 className="mt-4">Shipping Address</h2>
                  <div className="form-row">
                    <input type="text" placeholder="First Name" required className="checkout-input" />
                    <input type="text" placeholder="Last Name" required className="checkout-input" />
                  </div>
                  <input type="text" placeholder="Address" required className="checkout-input" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="checkout-input" />
                  <div className="form-row">
                    <input type="text" placeholder="City" required className="checkout-input" />
                    <select className="checkout-input" required>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    <input type="text" placeholder="ZIP Code" required className="checkout-input" />
                  </div>
                </div>
                <div className="checkout-actions">
                  <span className="back-link" onClick={() => navigate('/')}><ChevronLeft size={16}/> Return to cart</span>
                  <button type="submit" className="btn-premium">Continue to Shipping</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                 <div className="form-section summary-box">
                   <div className="summary-row"><span>Contact</span> <span>user@example.com</span> <span className="change" onClick={()=>setStep(1)}>Change</span></div>
                   <div className="summary-row"><span>Ship to</span> <span>123 Main St, NY 10001, USA</span> <span className="change" onClick={()=>setStep(1)}>Change</span></div>
                 </div>

                 <div className="form-section">
                   <h2>Shipping Method</h2>
                   <label className="radio-box">
                     <div>
                       <input type="radio" checked readOnly />
                       <span>Standard Shipping (3-5 Business Days)</span>
                     </div>
                     <strong>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</strong>
                   </label>
                 </div>

                 <div className="checkout-actions">
                  <span className="back-link" onClick={() => setStep(1)}><ChevronLeft size={16}/> Return to information</span>
                  <button type="submit" className="btn-premium">Continue to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                 <div className="form-section">
                   <h2>Payment</h2>
                   <p className="secure-text"><Lock size={12}/> All transactions are secure and encrypted.</p>
                   
                   <div className="payment-methods">
                     <label className={`pm-box ${paymentMethod === 'card' ? 'active' : ''}`}>
                       <div className="pm-header">
                         <div>
                           <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                           <span>Credit Card (Visa / Mastercard)</span>
                         </div>
                         <div className="pm-icons">
                           <CreditCard size={20} />
                         </div>
                       </div>
                       {paymentMethod === 'card' && (
                         <div className="pm-body">
                           <input type="text" placeholder="Card number" required className="checkout-input" />
                           <input type="text" placeholder="Name on card" required className="checkout-input" />
                           <div className="form-row">
                             <input type="text" placeholder="Expiration date (MM / YY)" required className="checkout-input" />
                             <input type="text" placeholder="Security code" required className="checkout-input" />
                           </div>
                         </div>
                       )}
                     </label>

                     <label className={`pm-box ${paymentMethod === 'payoneer' ? 'active' : ''}`}>
                       <div className="pm-header">
                         <div>
                           <input type="radio" name="payment" checked={paymentMethod === 'payoneer'} onChange={() => setPaymentMethod('payoneer')} />
                           <span>Payoneer</span>
                         </div>
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Payoneer_logo.svg/2560px-Payoneer_logo.svg.png" alt="Payoneer" height="15" />
                       </div>
                       {paymentMethod === 'payoneer' && (
                         <div className="pm-body-msg">You will be redirected to Payoneer to complete your purchase securely.</div>
                       )}
                     </label>

                     <label className={`pm-box ${paymentMethod === '2checkout' ? 'active' : ''}`}>
                       <div className="pm-header">
                         <div>
                           <input type="radio" name="payment" checked={paymentMethod === '2checkout'} onChange={() => setPaymentMethod('2checkout')} />
                           <span>2Checkout</span>
                         </div>
                         <span style={{fontWeight: 700, fontSize: '0.8rem', color: '#06b6d4'}}>2Checkout</span>
                       </div>
                       {paymentMethod === '2checkout' && (
                         <div className="pm-body-msg">You will be redirected to 2Checkout to complete your purchase securely.</div>
                       )}
                     </label>
                   </div>
                 </div>

                 <div className="checkout-actions">
                  <span className="back-link" onClick={() => setStep(2)}><ChevronLeft size={16}/> Return to shipping</span>
                  <button type="submit" className="btn-premium complete-btn" disabled={isProcessing}>
                    {isProcessing ? <span className="loader">Processing...</span> : `Pay ${formatPrice(total)}`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </form>

        <div className="checkout-footer">
          <a href="#">Refund policy</a>
          <a href="#">Shipping policy</a>
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
        </div>
      </div>

      {/* ─── RIGHT: Order Summary ─── */}
      <div className="checkout-sidebar">
        <div className="order-items">
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <div className="item-img-wrap">
                <img src={item.image} alt={item.name} />
                <span className="item-qty">{item.quantity}</span>
              </div>
              <span className="item-name">{item.name}</span>
              <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="discount-box">
          <input type="text" placeholder="Discount code" className="checkout-input" />
          <button className="btn-apply">Apply</button>
        </div>

        <div className="totals">
          <div className="total-row"><span>Subtotal</span> <span>{formatPrice(subtotal)}</span></div>
          <div className="total-row"><span>Shipping</span> <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
          <div className="total-row total-final"><span>Total</span> <span><span className="currency">USD</span> {formatPrice(total)}</span></div>
        </div>

        <div className="trust-badges-checkout">
          <div className="badge"><ShieldCheck size={24} color="#48bb78" /> <span>McAfee<br/>Secure</span></div>
          <div className="badge"><Lock size={24} color="#a78bfa" /> <span>SSL<br/>Encrypted</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
