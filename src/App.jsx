import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { 
  ShoppingBag, User, Menu, X, 
  ArrowRight, Globe, ShieldCheck, 
  Truck, LayoutDashboard, LogOut,
  Package, ShoppingCart, TrendingUp, Star,
  CheckCircle, ChevronRight, Info, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── SHARED COMPONENTS ─── */

const Navbar = ({ onCartOpen }) => {
  const { cart } = useShop();
  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '2px' }}>LUMINA UAE</Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 600, fontSize: '0.9rem' }}>HOME</Link>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}><User size={16}/> ADMIN</Link>
          <button onClick={onCartOpen} style={{ background: 'none', border: 'none', color: 'white', position: 'relative', cursor: 'pointer' }}>
            <ShoppingBag size={22} />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--gold)', color: 'black', borderRadius: '50%', width: 18, height: 18, fontSize: '0.7rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ─── PAGES ─── */

const Home = () => {
  const { products, addToCart, formatPrice } = useShop();
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ height: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80") center/cover no-repeat', opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '4px', fontSize: '0.8rem' }}>DUBAI | ABU DHABI | SHARJAH</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: '20px 0', lineHeight: 1 }}>
            THE PINNACLE OF <br /><span style={{ color: 'var(--gold)' }}>UAE LUXURY TECH</span>
          </motion.h1>
          <p className="arabic" style={{ fontSize: '1.4rem', opacity: 0.8, marginBottom: '40px' }}>ارتقِ بأسلوب حياتك مع أرقى التقنيات في الإمارات</p>
          <div style={{ display: 'flex', gap: '20px' }}>
             <Link to="/" className="btn-gold">Explore Drops <ArrowRight size={18}/></Link>
             <button className="btn-outline">Watch Film</button>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem' }}>UAE TOP SELLERS</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>The most coveted tech in the region right now.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <motion.div key={p.id} whileHover={{ y: -10 }} className="glass" style={{ padding: '25px', borderRadius: '15px', position: 'relative' }}>
              <Link to={`/product/${p.id}`} style={{ display: 'block' }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--gold)', color: 'black', padding: '4px 10px', fontSize: '0.6rem', fontWeight: 900, borderRadius: '2px', zIndex: 2 }}>
                  {p.tag}
                </div>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{p.name}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px', height: '40px' }}>{p.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #222' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--gold)' }}>{formatPrice(p.price)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold)' }}><Star size={12} fill="var(--gold)"/> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>4.9</span></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, formatPrice } = useShop();
  const [product, setProduct] = useState(null);
  const [viewers] = useState(Math.floor(Math.random() * 20) + 5);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) setProduct(found);
    window.scrollTo(0, 0);
  }, [id, products]);

  if (!product) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Product...</div>;

  const fakeReviews = [
    { name: "Ahmed Al-Maktoum", loc: "Dubai", comment: "The quality is absolute top-tier. Shipping to Marina was within 12 hours. Wallahi best store!", rating: 5 },
    { name: "Sarah Rashid", loc: "Abu Dhabi", comment: "Perfect for my minimalist setup. The titanium finish is stunning. 5 stars from Abu Dhabi!", rating: 5 },
    { name: "Omar J.", loc: "Sharjah", comment: "Excellent customer service and the packaging was very premium. Highly recommended.", rating: 5 }
  ];

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
        {/* Left Gallery */}
        <div className="glass" style={{ padding: '20px', borderRadius: '20px' }}>
          <img src={product.image} style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '15px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '20px' }}>
             {[1,2,3,4].map(i => <img key={i} src={product.image} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', opacity: 0.5 }} />)}
          </div>
        </div>

        {/* Right Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold)', marginBottom: '15px' }}>
             <Star size={16} fill="var(--gold)" /> <Star size={16} fill="var(--gold)" /> <Star size={16} fill="var(--gold)" /> <Star size={16} fill="var(--gold)" /> <Star size={16} fill="var(--gold)" />
             <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>(120+ Verified Reviews)</span>
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{product.name}</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 800, letterSpacing: '2px', marginBottom: '20px' }}>{product.tag} | UAE EXCLUSIVE</p>
          
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '30px' }}>
            {formatPrice(product.price)}
            <span style={{ fontSize: '1rem', color: '#666', textDecoration: 'line-through', marginLeft: '15px' }}>{formatPrice(product.price * 1.5)}</span>
          </div>

          <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid rgba(212,175,55,0.2)' }}>
             <p style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>🔥 <strong>{viewers} people</strong> are viewing this in Dubai right now</p>
          </div>

          <p style={{ color: '#888', lineHeight: '1.8', marginBottom: '40px' }}>{product.desc} Engineered with precision for the modern lifestyle. Experience the future of minimalist tech today.</p>

          <button className="btn-gold" style={{ width: '100%', padding: '20px', fontSize: '1rem', marginBottom: '20px' }} onClick={() => addToCart(product)}>ADD TO BAG — {formatPrice(product.price)}</button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}><Truck size={16} color="var(--gold)"/> Free Next-Day Delivery</div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}><ShieldCheck size={16} color="var(--gold)"/> 2-Year Local Warranty</div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section style={{ marginTop: '100px' }}>
         <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>CUSTOMER VOICES</h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {fakeReviews.map((r, i) => (
              <div key={i} className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--gold)', marginBottom: '15px' }}>
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--gold)" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>"{r.comment}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontWeight: 800 }}>{r.name}</span>
                   <span style={{ fontSize: '0.75rem', background: '#111', padding: '4px 8px', borderRadius: '4px' }}>Verified in {r.loc}</span>
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
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <div className="glass" style={{ padding: '50px', borderRadius: '30px', textAlign: 'center', width: '450px' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--gold)', color: 'black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', fontSize: '1.5rem', fontWeight: 900 }}>L</div>
        <h2 style={{ color: 'var(--gold)', marginBottom: '10px', letterSpacing: '2px' }}>ADMIN AUTHENTICATION</h2>
        <input 
          type="password" 
          placeholder="Enter Master Passcode" 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ width: '100%', padding: '18px', background: '#111', border: '1px solid #222', color: 'white', marginBottom: '20px', borderRadius: '8px', textAlign: 'center' }} 
        />
        <button className="btn-gold" onClick={() => pass === 'admin123' ? setAuth(true) : alert('Invalid')} style={{ width: '100%', borderRadius: '8px' }}>ACCESS DASHBOARD</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      <aside style={{ width: '300px', background: '#050505', borderRight: '1px solid #1a1a1a', padding: '50px 30px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '50px' }}>LUMINA UAE HQ</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button style={{ background: '#111', border: 'none', color: 'var(--gold)', textAlign: 'left', padding: '15px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}><LayoutDashboard size={18}/> Dashboard</button>
          <button style={{ background: 'none', border: 'none', color: '#666', textAlign: 'left', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}><ShoppingCart size={18}/> Orders</button>
          <button style={{ background: 'none', border: 'none', color: '#666', textAlign: 'left', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}><Package size={18}/> Products</button>
        </div>
        <button style={{ marginTop: 'auto', position: 'absolute', bottom: '50px', background: 'none', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setAuth(false)}><LogOut size={18}/> Secure Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '50px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
           <div><h2 style={{ fontSize: '2rem' }}>Analytics Overview</h2><p style={{ color: '#666' }}>Live market performance in United Arab Emirates</p></div>
           <div style={{ background: '#111', padding: '10px 20px', borderRadius: '30px', fontSize: '0.8rem', border: '1px solid #222' }}>🟢 MARKET LIVE</div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '50px' }}>
          <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
             <span style={{ color: '#666', fontSize: '0.8rem' }}>Total Sales</span>
             <h3 style={{ fontSize: '1.8rem', margin: '5px 0' }}>AED 142,500</h3>
          </div>
          <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
             <span style={{ color: '#666', fontSize: '0.8rem' }}>Pending Orders</span>
             <h3 style={{ fontSize: '1.8rem', margin: '5px 0' }}>18</h3>
          </div>
          <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
             <span style={{ color: '#666', fontSize: '0.8rem' }}>Active Viewers</span>
             <h3 style={{ fontSize: '1.8rem', margin: '5px 0' }}>1,240</h3>
          </div>
        </div>

        <div className="glass" style={{ padding: '30px', borderRadius: '25px' }}>
           <h3>Inventory Tracking</h3>
           <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '30px' }}>
              <thead style={{ color: '#666', fontSize: '0.85rem' }}>
                <tr><th style={{ paddingBottom: '20px' }}>Product</th><th style={{ paddingBottom: '20px' }}>Price</th><th style={{ paddingBottom: '20px' }}>Status</th></tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{ padding: '15px 0' }}>{p.name}</td>
                    <td style={{ fontWeight: 800, color: 'var(--gold)' }}>{formatPrice(p.price)}</td>
                    <td><span style={{ padding: '4px 10px', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.7rem', borderRadius: '4px' }}>In Stock</span></td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </main>
    </div>
  );
};

const Checkout = () => {
  const { cart, formatPrice } = useShop();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = 25;
  const total = subtotal + shipping;

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '60px' }}>
        <div>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>UAE SECURE CHECKOUT</h2>
           <div className="glass" style={{ padding: '40px', borderRadius: '20px' }}>
              <div style={{ marginBottom: '30px' }}>
                 <h4 style={{ marginBottom: '20px', color: 'var(--gold)' }}>SHIPPING DETAILS</h4>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <input placeholder="First Name" style={{ padding: '18px', background: '#050505', border: '1px solid #222', color: 'white', borderRadius: '8px' }} />
                    <input placeholder="Last Name" style={{ padding: '18px', background: '#050505', border: '1px solid #222', color: 'white', borderRadius: '8px' }} />
                 </div>
                 <select style={{ width: '100%', padding: '18px', background: '#050505', border: '1px solid #222', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>
                    <option>Select Emirate</option>
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                 </select>
                 <input placeholder="Mobile Phone (+971)" style={{ width: '100%', padding: '18px', background: '#050505', border: '1px solid #222', color: 'white', borderRadius: '8px', marginBottom: '20px' }} />
                 <input placeholder="Full Address / Villa / Apartment" style={{ width: '100%', padding: '18px', background: '#050505', border: '1px solid #222', color: 'white', borderRadius: '8px' }} />
              </div>
              <button className="btn-gold" style={{ width: '100%', padding: '20px' }} onClick={() => alert('Order Placed!')}>COMPLETE ORDER (COD)</button>
           </div>
        </div>
        <div className="glass" style={{ padding: '40px', borderRadius: '20px', height: 'fit-content' }}>
           <h3 style={{ marginBottom: '30px' }}>Summary</h3>
           {cart.map(item => (
             <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>{item.name} x{item.qty}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
             </div>
           ))}
           <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: 'var(--gold)' }}>{formatPrice(total)}</span>
           </div>
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
      {!isAdmin && <Navbar onCartOpen={() => setCartOpen(true)} />}
      
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000 }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} style={{ position: 'fixed', top: 0, right: 0, width: '450px', background: '#050505', height: '100%', padding: '50px', zIndex: 1001, borderLeft: '1px solid #1a1a1a' }}>
              <h2 style={{ marginBottom: '50px' }}>YOUR BAG</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                     <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                     <div style={{ flex: 1 }}><h4>{item.name}</h4><div style={{ color: 'var(--gold)' }}>{formatPrice(item.price)}</div></div>
                     <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#444' }}><X size={20}/></button>
                  </div>
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: '50px', left: '50px', right: '50px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.2rem', fontWeight: 800 }}><span>Total</span><span>{formatPrice(total)}</span></div>
                 <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>CHECKOUT NOW</Link>
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
        <footer style={{ padding: '100px 0', background: '#050505', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
          <div className="container">
             <h2 style={{ color: 'var(--gold)', letterSpacing: '4px' }}>LUMINA UAE</h2>
             <p className="arabic" style={{ opacity: 0.6, marginTop: '10px' }}>دبي | أبو ظبي | الشارقة</p>
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
