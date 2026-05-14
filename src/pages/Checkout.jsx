import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Lock, CreditCard, ChevronLeft, Truck, MapPin } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, formatPrice, clearCart, region } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    emirate: 'Dubai',
    phone: ''
  });

  const subtotalInUsd = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingInUsd = subtotalInUsd > 100 ? 0 : 15; // Free shipping in UAE over 100 USD (approx 367 AED)
  const totalInUsd = subtotalInUsd + shippingInUsd;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('Order Confirmed! Your UAE delivery is scheduled. You will receive a WhatsApp confirmation shortly.');
      navigate('/');
    }, 2500);
  };

  const emirates = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 
    'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'
  ];

  if (cart.length === 0) {
    return (
      <div className="checkout-empty-v3 container">
        <h2>Your Bag is Empty</h2>
        <p>Add some premium tech to your collection to continue.</p>
        <button className="btn-primary-v3" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-root-v3">
      <div className="container checkout-grid-v3">
        
        {/* ─── LEFT: Information ─── */}
        <div className="checkout-main-v3">
          <div className="checkout-header-v3">
            <h1 className="logo-text">LUMINA UAE</h1>
            <nav className="checkout-steps-v3">
              <span className={step >= 1 ? 'active' : ''}>Contact</span>
              <span className={step >= 2 ? 'active' : ''}>Shipping</span>
              <span className={step >= 3 ? 'active' : ''}>Payment</span>
            </nav>
          </div>

          <form onSubmit={step === 3 ? handleCompleteOrder : (e) => { e.preventDefault(); setStep(step + 1); }}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <section className="checkout-section-v3">
                    <div className="section-head-v3">
                      <h3>Contact Information</h3>
                      <p>Already have an account? <span className="link-gold">Log in</span></p>
                    </div>
                    <input type="email" placeholder="Email Address" required className="input-v3" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    
                    <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>Shipping Details (UAE)</h3>
                    <div className="form-row-v3">
                      <input type="text" placeholder="First Name" required className="input-v3" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                      <input type="text" placeholder="Last Name" required className="input-v3" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    <input type="text" placeholder="Street Address / Villa Number" required className="input-v3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    <div className="form-row-v3">
                      <select className="input-v3" value={formData.emirate} onChange={e => setFormData({...formData, emirate: e.target.value})}>
                        {emirates.map(em => <option key={em} value={em}>{em}</option>)}
                      </select>
                      <input type="text" placeholder="Phone (+971)" required className="input-v3" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </section>
                  <div className="checkout-actions-v3">
                    <button type="submit" className="btn-primary-v3">Proceed to Shipping</button>
                    <span onClick={() => navigate('/cart')} className="back-btn-v3"><ChevronLeft size={16}/> Back to Bag</span>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <div className="summary-box-v3">
                    <div className="s-row-v3"><span>Ship to</span> <p>{formData.address}, {formData.emirate}</p> <button type="button" onClick={() => setStep(1)}>Edit</button></div>
                  </div>
                  <section className="checkout-section-v3">
                    <h3>Shipping Method</h3>
                    <div className="shipping-option-v3 active">
                       <div className="so-left-v3">
                         <Truck size={20} />
                         <div>
                           <p>UAE Express Delivery</p>
                           <span>Next Day Delivery for {formData.emirate}</span>
                         </div>
                       </div>
                       <p className="so-price-v3">{shippingInUsd === 0 ? 'FREE' : formatPrice(shippingInUsd)}</p>
                    </div>
                  </section>
                  <div className="checkout-actions-v3">
                    <button type="submit" className="btn-primary-v3">Proceed to Payment</button>
                    <span onClick={() => setStep(1)} className="back-btn-v3"><ChevronLeft size={16}/> Edit Details</span>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <section className="checkout-section-v3">
                    <div className="section-head-v3">
                      <h3>Payment Secure</h3>
                      <p><Lock size={12}/> All transactions are encrypted</p>
                    </div>
                    
                    <div className="payment-options-v3">
                       <label className={`pm-v3 ${paymentMethod === 'cod' ? 'active' : ''}`}>
                         <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                         <div className="pm-info-v3">
                           <p>Cash on Delivery (COD)</p>
                           <span>Pay at your doorstep in {formData.emirate}</span>
                         </div>
                         <MapPin size={20} />
                       </label>

                       <label className={`pm-v3 ${paymentMethod === 'card' ? 'active' : ''}`}>
                         <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                         <div className="pm-info-v3">
                           <p>Credit / Debit Card</p>
                           <span>Visa, Mastercard, Apple Pay</span>
                         </div>
                         <CreditCard size={20} />
                       </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="card-form-v3">
                         <input type="text" placeholder="Card Number" className="input-v3" />
                         <div className="form-row-v3">
                           <input type="text" placeholder="MM/YY" className="input-v3" />
                           <input type="text" placeholder="CVC" className="input-v3" />
                         </div>
                      </div>
                    )}
                  </section>
                  <div className="checkout-actions-v3">
                    <button type="submit" className="btn-primary-v3" disabled={isProcessing}>
                      {isProcessing ? 'Processing UAE Order...' : `Complete UAE Order — ${formatPrice(totalInUsd)}`}
                    </button>
                    <span onClick={() => setStep(2)} className="back-btn-v3"><ChevronLeft size={16}/> Shipping Method</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* ─── RIGHT: Order Summary ─── */}
        <div className="checkout-sidebar-v3">
          <div className="sidebar-inner-v3">
            <h3>Order Summary</h3>
            <div className="sidebar-items-v3">
              {cart.map(item => (
                <div key={item.id} className="si-item-v3">
                  <div className="si-img-v3">
                    <img src={item.image} alt={item.name} />
                    <span>{item.qty}</span>
                  </div>
                  <div className="si-info-v3">
                    <p>{item.name}</p>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-totals-v3">
              <div className="st-row-v3"><span>Subtotal</span> <span>{formatPrice(subtotalInUsd)}</span></div>
              <div className="st-row-v3"><span>Shipping</span> <span className="shipping-gold">{shippingInUsd === 0 ? 'FREE' : formatPrice(shippingInUsd)}</span></div>
              <div className="st-row-v3 total-v3"><span>Total Due</span> <span><small>AED</small> {(totalInUsd * region.rate).toFixed(2)}</span></div>
            </div>

            <div className="checkout-trust-v3">
               <div className="trust-item-v3"><ShieldCheck size={18}/> <span>100% Authentic Products</span></div>
               <div className="trust-item-v3"><Truck size={18}/> <span>Fast UAE Express Delivery</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
