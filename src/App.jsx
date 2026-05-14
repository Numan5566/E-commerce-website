import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { 
  ShoppingBag, User, Search, X, 
  Truck, ShieldCheck, Star, CheckCircle, Heart,
  Instagram, Facebook, MessageCircle, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';

/* ─── SHARED COMPONENTS ─── */

const Header = ({ onCartOpen }) => {
  const { cart } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  
  const announcements = [
    "FREE WORLDWIDE SHIPPING ON ORDERS OVER AED 500",
    "NEW EID COLLECTION: SHOP THE LATEST DROPS",
    "24H EXPRESS DELIVERY IN DUBAI & ABU DHABI"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const interval = setInterval(() => setAnnouncementIdx(p => (p + 1) % announcements.length), 4000);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? '#fff' : 'rgba(255,255,255,0.95)', borderBottom: '1px solid #eee', transition: 'all 0.3s' }}>
      <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '8px 0', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', overflow: 'hidden' }}>
        {announcements[announcementIdx]}
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '15px 40px' }}>
        <div style={{ display: 'flex', gap: '25px', fontSize: '0.75rem', fontWeight: 800 }}>
          <Link to="/" style={{ color: '#000' }}>WATCHES</Link>
          <Link to="/" style={{ color: '#000' }}>PERFUMES</Link>
          <Link to="/" style={{ color: '#000' }}>ACCESSORIES</Link>
        </div>
        
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '8px', color: '#000', textAlign: 'center', marginLeft: '40px' }}>
          MINIMALIST
        </Link>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Search size={18} color="#000" />
          <Link to="/admin"><User size={18} color="#000" /></Link>
          <button onClick={onCartOpen} style={{ background: 'none', border: 'none', color: '#000', position: 'relative', cursor: 'pointer' }}>
            <ShoppingBag size={20} />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -8, right: -10, background: '#000', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

/* ─── PAGES ─── */

const Home = () => {
  const { products, formatPrice } = useShop();
  
  const categories = [
    { name: "Mens Collection", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
    { name: "Womens Series", img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80" },
    { name: "Luxury Fragrance", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80" }
  ];

  return (
    <div style={{ paddingTop: '0' }}>
      {/* Hero */}
      <section style={{ height: '90vh', background: 'url("https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1600&q=80") center/cover no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, textShadow: '0 10px 30px rgba(0,0,0,0.3)', marginBottom: '30px' }}>ELEVATED <br/>ESSENTIALS</h1>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button className="btn-black">Shop Watches</button>
            <button className="btn-black" style={{ background: '#fff', color: '#000' }}>Shop Fragrance</button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container" style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {categories.map((cat, i) => (
          <div key={i} style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
            <img src={cat.img} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>{cat.name}</h3>
              <Link to="/" style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'underline' }}>SHOP NOW</Link>
            </div>
          </div>
        ))}
      </section>

      {/* Product List */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem' }}>TRENDING IN UAE</h2>
          <div style={{ width: '50px', height: '2px', background: '#000', margin: '20px auto' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card">
              <Link to={`/product/${p.id}`}>
                <div style={{ background: '#F8F8F8', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <img src={p.image} alt={p.name} style={{ width: '85%', height: '85%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px' }}><span className="badge-new">{p.tag}</span></div>
                </div>
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                   <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '8px' }}>{p.name}</h3>
                   <div style={{ fontWeight: 900 }}>{formatPrice(p.price)}</div>
                   <div style={{ display: 'flex', justifyContent: 'center', color: '#D4AF37', marginTop: '5px' }}>
                      <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                   </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: '#F4F4F4', padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
           <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>JOIN THE MINIMALIST CLUB</h2>
           <p style={{ color: '#666', marginBottom: '40px' }}>Subscribe for 10% off your first UAE order and exclusive early access.</p>
           <div style={{ display: 'flex', gap: '10px' }}>
             <input placeholder="Email Address" style={{ flex: 1, padding: '15px', border: '1px solid #ddd' }} />
             <button className="btn-black">JOIN</button>
           </div>
        </div>
      </section>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, formatPrice } = useShop();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div style={{ paddingTop: '200px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }}>
        <div style={{ background: '#F8F8F8', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }} />
        </div>
        <div>
           <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '3px' }}>{product.tag}</span>
           <h1 style={{ fontSize: '2.5rem', margin: '15px 0', fontWeight: 900 }}>{product.name}</h1>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900 }}>{formatPrice(product.price)}</div>
              <span style={{ color: '#10B981', fontWeight: 700, fontSize: '0.85rem' }}>✓ IN STOCK & READY TO SHIP</span>
           </div>
           
           <p style={{ color: '#444', lineHeight: '1.8', marginBottom: '40px' }}>{product.desc}</p>
           <button className="btn-black" style={{ width: '100%', padding: '20px', fontSize: '0.9rem' }} onClick={() => addToCart(product)}>ADD TO SHOPPING BAG</button>
           
           <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '15px' }}><Truck size={24}/> <div><strong>Next-Day Delivery</strong><br/><span style={{ fontSize: '0.75rem', color: '#888' }}>Dubai, Abu Dhabi, Sharjah</span></div></div>
              <div style={{ display: 'flex', gap: '15px' }}><ShieldCheck size={24}/> <div><strong>Local Warranty</strong><br/><span style={{ fontSize: '0.75rem', color: '#888' }}>2 Years Official UAE</span></div></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const { products, formatPrice } = useShop();

  if (!auth) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F4F4' }}>
      <div style={{ padding: '60px', background: '#fff', textAlign: 'center', width: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '10px', letterSpacing: '5px' }}>MINIMALIST</h2>
        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '40px' }}>ADMINISTRATION PORTAL</p>
        <input type="password" placeholder="Master Key" value={pass} onChange={(e) => setPass(e.target.value)} style={{ width: '100%', padding: '18px', background: '#F8F8F8', border: '1px solid #EEE', marginBottom: '20px', textAlign: 'center' }} />
        <button className="btn-black" onClick={() => pass === 'admin123' ? setAuth(true) : alert('Denied')} style={{ width: '100%' }}>ACCESS</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fff' }}>
      <aside style={{ width: '300px', borderRight: '1px solid #EEE', padding: '50px 30px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '3px', marginBottom: '60px' }}>MINIMALIST HQ</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <button style={{ background: '#000', color: '#fff', padding: '15px', textAlign: 'left', fontWeight: 700, border: 'none' }}>DASHBOARD</button>
           <button style={{ background: 'none', color: '#888', padding: '15px', textAlign: 'left', fontWeight: 700, border: 'none' }}>ORDERS</button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '50px' }}>
         <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>UAE PERFORMANCE</h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ padding: '30px', background: '#F8F8F8' }}><span>Revenue</span><h3 style={{ fontSize: '2rem' }}>AED 24,500</h3></div>
            <div style={{ padding: '30px', background: '#F8F8F8' }}><span>Orders</span><h3 style={{ fontSize: '2rem' }}>42</h3></div>
            <div style={{ padding: '30px', background: '#F8F8F8' }}><span>Market</span><h3 style={{ fontSize: '2rem' }}>DUBAI</h3></div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px' }}>
        <div>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>SECURE CHECKOUT</h2>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <input placeholder="First Name" style={{ padding: '18px', border: '1px solid #EEE', background: '#F8F8F8' }} />
              <input placeholder="Last Name" style={{ padding: '18px', border: '1px solid #EEE', background: '#F8F8F8' }} />
           </div>
           <select style={{ width: '100%', padding: '18px', border: '1px solid #EEE', background: '#F8F8F8', marginBottom: '20px' }}>
              <option>Select Emirate</option><option>Dubai</option><option>Abu Dhabi</option>
           </select>
           <input placeholder="Mobile Phone" style={{ width: '100%', padding: '18px', border: '1px solid #EEE', background: '#F8F8F8', marginBottom: '20px' }} />
           <input placeholder="Delivery Address" style={{ width: '100%', padding: '18px', border: '1px solid #EEE', background: '#F8F8F8', marginBottom: '40px' }} />
           <button className="btn-black" style={{ width: '100%', padding: '20px' }} onClick={() => alert('Order Placed!')}>COMPLETE ORDER (COD)</button>
        </div>
        <div style={{ padding: '40px', background: '#F8F8F8' }}>
           <h3>SUMMARY</h3>
           {cart.map(i => <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}><span>{i.name} x{i.qty}</span><span>{formatPrice(i.price * i.qty)}</span></div>)}
           <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.2rem' }}><span>TOTAL</span><span>{formatPrice(total)}</span></div>
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
      
      {/* WhatsApp Button */}
      {!isAdmin && (
        <a href="https://wa.me/971501234567" target="_blank" style={{ position: 'fixed', bottom: '30px', right: '30px', background: '#25D366', color: '#fff', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <MessageCircle size={32} />
        </a>
      )}

      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ width: '450px', background: '#fff', position: 'relative', padding: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '2px' }}>SHOPPING BAG</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={32}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', height: 'calc(100% - 250px)', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '20px' }}>
                   <img src={item.image} style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#F8F8F8' }} />
                   <div style={{ flex: 1 }}><h4 style={{ fontSize: '0.9rem' }}>{item.name}</h4><div style={{ fontWeight: 900, marginTop: '5px' }}>{formatPrice(item.price)}</div></div>
                   <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#888' }}><X size={18}/></button>
                </div>
              ))}
              {cart.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '100px' }}>BAG IS EMPTY</p>}
            </div>
            <div style={{ position: 'absolute', bottom: '50px', left: '50px', right: '50px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontWeight: 900, fontSize: '1.2rem' }}><span>TOTAL</span><span>{formatPrice(total)}</span></div>
               <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-black" style={{ width: '100%', textAlign: 'center', display: 'block' }}>CHECKOUT NOW</Link>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {!isAdmin && (
        <footer style={{ padding: '100px 0', borderTop: '1px solid #EEE', textAlign: 'center', background: '#F8F8F8' }}>
          <div className="container">
             <h2 style={{ letterSpacing: '8px', marginBottom: '10px', fontWeight: 900 }}>MINIMALIST</h2>
             <p className="arabic" style={{ opacity: 0.5, marginBottom: '40px' }}>دبي - الإمارات العربية المتحدة</p>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '0.8rem', fontWeight: 800 }}>
                <Link to="/">PRIVACY</Link><Link to="/">TERMS</Link><Link to="/">CONTACT</Link><Link to="/">ABOUT</Link>
             </div>
             <div style={{ marginTop: '50px', color: '#888', fontSize: '0.7rem' }}>© 2024 MINIMALIST LUXURY RETAIL LLC. ALL RIGHTS RESERVED.</div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}
