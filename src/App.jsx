import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { 
  ShoppingBag, User, Search, Menu, X, 
  ArrowRight, Globe, ShieldCheck, 
  Truck, LayoutDashboard, LogOut,
  Package, ShoppingCart, TrendingUp, Star,
  CheckCircle, ChevronRight, Info, Award,
  Instagram, Facebook, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── SHARED COMPONENTS ─── */

const Header = ({ onCartOpen }) => {
  const { cart } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? '#fff' : 'transparent', borderBottom: scrolled ? '1px solid #eee' : 'none', transition: 'all 0.3s' }}>
      <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '10px 0', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px' }}>
        FREE WORLDWIDE SHIPPING ON ALL ORDERS | دبي - أبو ظبي
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 40px' }}>
        <div style={{ display: 'flex', gap: '25px', fontSize: '0.8rem', fontWeight: 700 }}>
          <Link to="/" style={{ color: scrolled ? '#000' : '#000' }}>MENS</Link>
          <Link to="/" style={{ color: scrolled ? '#000' : '#000' }}>WOMENS</Link>
          <Link to="/" style={{ color: scrolled ? '#000' : '#000' }}>BEST SELLERS</Link>
        </div>
        
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '5px', color: '#000', textAlign: 'center' }}>
          MINIMALIST
        </Link>

        <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Search size={20} color="#000" />
          <Link to="/admin"><User size={20} color="#000" /></Link>
          <button onClick={onCartOpen} style={{ background: 'none', border: 'none', color: '#000', position: 'relative', cursor: 'pointer' }}>
            <ShoppingBag size={20} />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -8, right: -10, background: '#000', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

/* ─── PAGES ─── */

const Home = () => {
  const { products, addToCart, formatPrice } = useShop();
  return (
    <div style={{ paddingTop: '0' }}>
      {/* Hero Section */}
      <section style={{ height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)' }}></div>
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#000', marginBottom: '30px' }}>THE EID <br />COLLECTION</motion.h1>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
             <button className="btn-black">Shop Mens</button>
             <button className="btn-black">Shop Womens</button>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
           <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '3px', color: '#888' }}>CURATED FOR YOU</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>LATEST ARRIVALS</h2>
           </div>
           <Link to="/" style={{ fontWeight: 700, borderBottom: '2px solid #000', paddingBottom: '5px' }}>VIEW ALL</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <motion.div key={p.id} className="product-card" whileHover={{ y: -5 }}>
              <Link to={`/product/${p.id}`}>
                <div style={{ position: 'relative', background: '#F8F8F8', height: '450px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                     <span className="badge-new">NEW</span>
                  </div>
                  <img src={p.image} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  <button className="glass" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '12px', borderRadius: '50%', border: 'none' }}>
                    <Heart size={18} />
                  </button>
                </div>
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                   <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 800, letterSpacing: '2px' }}>{p.tag}</span>
                   <h3 style={{ fontSize: '1rem', margin: '8px 0', letterSpacing: '0' }}>{p.name}</h3>
                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{formatPrice(p.price)}</span>
                      <div style={{ display: 'flex', color: 'var(--accent-gold)' }}><Star size={12} fill="currentColor" /> <span style={{ fontSize: '0.8rem', color: '#000', fontWeight: 700, marginLeft: '5px' }}>4.9</span></div>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Width Banner */}
      <section style={{ height: '70vh', position: 'relative', overflow: 'hidden', marginBottom: '100px' }}>
         <img src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
            <div className="container">
               <h2 style={{ fontSize: '4rem', marginBottom: '20px' }}>THE ART OF <br />MINIMALISM</h2>
               <button className="btn-outline-black" style={{ borderColor: '#fff', color: '#fff' }}>DISCOVER MORE</button>
            </div>
         </div>
      </section>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, formatPrice } = useShop();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) setProduct(found);
    window.scrollTo(0, 0);
  }, [id, products]);

  if (!product) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }}>
        {/* Gallery */}
        <div style={{ display: 'flex', gap: '20px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '80px' }}>
              {[1,2,3,4].map(i => <img key={i} src={product.image} style={{ width: '100%', height: '80px', objectFit: 'cover', border: i === 1 ? '1px solid #000' : '1px solid #eee' }} />)}
           </div>
           <div style={{ flex: 1, background: '#F8F8F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
              <img src={product.image} style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain' }} />
           </div>
        </div>

        {/* Info */}
        <div>
           <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#888', letterSpacing: '3px' }}>{product.tag}</span>
           <h1 style={{ fontSize: '3rem', margin: '15px 0' }}>{product.name}</h1>
           <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800 }}>{formatPrice(product.price)}</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.9rem' }}>• FREE SHIPPING BY TOMORROW</span>
           </div>

           <p style={{ color: '#444', lineHeight: '1.8', marginBottom: '40px' }}>{product.desc} Designed for the modern visionary, this piece combines timeless aesthetics with high-performance functionality.</p>

           <div style={{ marginBottom: '40px' }}>
              <p style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '15px' }}>SELECT COLOR</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                 <div style={{ width: '35px', height: '35px', background: '#000', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 0 0 1px #000' }}></div>
                 <div style={{ width: '35px', height: '35px', background: '#888', borderRadius: '50%' }}></div>
                 <div style={{ width: '35px', height: '35px', background: '#D4AF37', borderRadius: '50%' }}></div>
              </div>
           </div>

           <button className="btn-black" style={{ width: '100%', padding: '20px', fontSize: '0.9rem' }} onClick={() => addToCart(product)}>ADD TO BAG</button>
           
           <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '15px' }}><Truck size={20}/><div style={{ fontSize: '0.8rem' }}><strong>Express Shipping</strong><br/>Dubai & Abu Dhabi</div></div>
              <div style={{ display: 'flex', gap: '15px' }}><ShieldCheck size={20}/><div style={{ fontSize: '0.8rem' }}><strong>Authenticity</strong><br/>100% Genuine Tech</div></div>
           </div>
        </div>
      </div>

      {/* Reviews */}
      <section style={{ marginTop: '120px' }}>
         <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '60px' }}>VERIFIED CUSTOMER REVIEWS</h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[{n: "Ahmed A.", l: "Dubai"}, {n: "Sarah R.", l: "Abu Dhabi"}, {n: "Omar J.", l: "Sharjah"}].map((u, i) => (
              <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
                 <div style={{ display: 'flex', color: 'var(--accent-gold)', marginBottom: '15px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                 <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '10px' }}>"Highly Recommend!"</p>
                 <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>Exactly as described. The minimalist design is perfect for my collection.</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.7rem' }}>{u.n[0]}</div>
                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{u.n} <CheckCircle size={10} color="var(--accent-green)" /></div><div style={{ fontSize: '0.7rem', color: '#888' }}>Verified Buyer in {u.l}</div></div>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const { products, formatPrice } = useShop();

  if (!auth) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F8F8' }}>
      <div style={{ padding: '60px', background: '#fff', borderRadius: '0', textAlign: 'center', width: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '10px', letterSpacing: '5px' }}>MINIMALIST</h2>
        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '40px' }}>ADMINISTRATION ACCESS</p>
        <input 
          type="password" 
          placeholder="Passcode" 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ width: '100%', padding: '18px', background: '#F8F8F8', border: '1px solid #EEE', color: '#000', marginBottom: '20px', textAlign: 'center' }} 
        />
        <button className="btn-black" onClick={() => pass === 'admin123' ? setAuth(true) : alert('Invalid')} style={{ width: '100%' }}>LOGIN</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fff' }}>
      <aside style={{ width: '300px', borderRight: '1px solid #EEE', padding: '50px 30px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '3px', marginBottom: '60px' }}>MINIMALIST HQ</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
           <button style={{ background: '#000', color: '#fff', padding: '15px', textAlign: 'left', fontWeight: 700, border: 'none' }}>DASHBOARD</button>
           <button style={{ background: 'none', color: '#888', padding: '15px', textAlign: 'left', fontWeight: 700, border: 'none' }}>ORDERS</button>
           <button style={{ background: 'none', color: '#888', padding: '15px', textAlign: 'left', fontWeight: 700, border: 'none' }}>PRODUCTS</button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '50px' }}>
         <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>UAE SALES PERFORMANCE</h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ padding: '30px', background: '#F8F8F8' }}><span>Revenue</span><h3 style={{ fontSize: '2rem' }}>AED 24,500</h3></div>
            <div style={{ padding: '30px', background: '#F8F8F8' }}><span>Orders</span><h3 style={{ fontSize: '2rem' }}>42</h3></div>
            <div style={{ padding: '30px', background: '#F8F8F8' }}><span>Views</span><h3 style={{ fontSize: '2rem' }}>1.8K</h3></div>
         </div>
      </main>
    </div>
  );
};

const Checkout = () => {
  const { cart, formatPrice } = useShop();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal + 25;

  return (
    <div className="container" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px' }}>
        <div>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>SECURE CHECKOUT</h2>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <input placeholder="First Name" style={{ padding: '18px', border: '1px solid #EEE', background: '#F8F8F8' }} />
              <input placeholder="Last Name" style={{ padding: '18px', border: '1px solid #EEE', background: '#F8F8F8' }} />
           </div>
           <select style={{ width: '100%', padding: '18px', border: '1px solid #EEE', background: '#F8F8F8', marginBottom: '20px' }}>
              <option>Emirate</option><option>Dubai</option><option>Abu Dhabi</option>
           </select>
           <input placeholder="Address" style={{ width: '100%', padding: '18px', border: '1px solid #EEE', background: '#F8F8F8', marginBottom: '40px' }} />
           <button className="btn-black" style={{ width: '100%' }}>PLACE ORDER (CASH ON DELIVERY)</button>
        </div>
        <div style={{ padding: '40px', background: '#F8F8F8' }}>
           <h3>ORDER SUMMARY</h3>
           {cart.map(i => <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}><span>{i.name} x{i.qty}</span><span>{formatPrice(i.price * i.qty)}</span></div>)}
           <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}><span>TOTAL</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
    </div>
  );
};

/* ─── MAIN APP ─── */

const AppContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const { cart, formatPrice, removeFromCart } = useShop();
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="app-container">
      {!isAdmin && <Header onCartOpen={() => setCartOpen(true)} />}
      
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} style={{ position: 'fixed', top: 0, right: 0, width: '450px', background: '#fff', height: '100%', padding: '50px', zIndex: 1001, boxShadow: '-20px 0 60px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '1.2rem' }}>SHOPPING BAG</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24}/></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', height: 'calc(100% - 250px)', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '20px' }}>
                     <img src={item.image} style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#F8F8F8' }} />
                     <div style={{ flex: 1 }}><h4>{item.name}</h4><div style={{ fontWeight: 800, marginTop: '5px' }}>{formatPrice(item.price)}</div></div>
                     <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#888' }}><X size={18}/></button>
                  </div>
                ))}
                {cart.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>BAG IS EMPTY</p>}
              </div>
              <div style={{ position: 'absolute', bottom: '50px', left: '50px', right: '50px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontWeight: 800, fontSize: '1.2rem' }}><span>TOTAL</span><span>{formatPrice(total)}</span></div>
                 <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-black" style={{ width: '100%', textAlign: 'center', display: 'block' }}>CHECKOUT NOW</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {!isAdmin && (
        <footer style={{ padding: '100px 0', borderTop: '1px solid #EEE', textAlign: 'center', background: '#F8F8F8' }}>
          <div className="container">
             <h2 style={{ letterSpacing: '5px', marginBottom: '10px' }}>MINIMALIST</h2>
             <p className="arabic" style={{ opacity: 0.5, marginBottom: '40px' }}>دبي - الإمارات العربية المتحدة</p>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '0.8rem', fontWeight: 700 }}>
                <Link to="/">PRIVACY</Link><Link to="/">TERMS</Link><Link to="/">CONTACT</Link>
             </div>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
