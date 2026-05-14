import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { 
  ShoppingBag, User, Search, X, 
  Truck, ShieldCheck, Star, CheckCircle, Heart,
  MessageCircle, ArrowRight, ChevronDown, ChevronUp, CreditCard, ChevronLeft, ChevronRight, Award, Users, Gem
} from 'lucide-react';

/* ─── SHARED COMPONENTS ─── */

const MegaMenu = ({ type }) => {
  const contents = {
    MENS: {
      links: ["WATCHES", "LEATHER GOODS", "BEST SELLERS", "GIFT SETS", "SHOP BY COLLECTION"],
      featured: [
        { name: "WATCHES", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
        { name: "LEATHER", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80" }
      ]
    },
    WOMENS: {
      links: ["WATCHES", "JEWELLERY", "HANDBAGS", "GIFT SETS", "PERSONALIZED", "BEST SELLERS"],
      icons: [
        { name: "PETITE", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
        { name: "HERITAGE", img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=200&q=80" },
        { name: "CLASSIC", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80" }
      ]
    },
    JEWELLERY: {
      links: ["JEWELLERY", "NECKLACES", "EARRINGS", "BRACELETS", "RINGS", "BEST SELLERS"],
      featured: [
        { name: "JEWELLERY", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" }
      ]
    }
  };

  const data = contents[type] || contents.MENS;

  return (
    <div className="mega-menu" onMouseEnter={(e) => e.stopPropagation()} style={{ background: '#fff' }}>
       <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '80px' }}>
          <div className="menu-list">
             {data.links.map((l, i) => (
               <Link key={i} to="/" className="menu-link">
                 {l} {(i < 2) && <span className="menu-badge">NEW</span>}
               </Link>
             ))}
             <Link to="/" className="menu-link" style={{ marginTop: '30px', textDecoration: 'underline' }}>SHOP ALL ›</Link>
          </div>
          <div className="menu-grid">
             {data.icons ? (
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                 {data.icons.map((item, i) => (
                   <div key={i} className="category-icon-item">
                     <img src={item.img} alt={item.name} />
                     <span>{item.name}</span>
                   </div>
                 ))}
               </div>
             ) : (
               <div style={{ display: 'flex', gap: '40px' }}>
                 {data.featured.map((item, i) => (
                   <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden', height: '350px' }}>
                      <img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'flex-end', padding: '30px' }}>
                         <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>{item.name}</h3>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

const Header = ({ onCartOpen }) => {
  const { cart } = useShop();
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <header 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#fff', borderBottom: '1px solid #eee' }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '10px 0', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <ChevronLeft size={14} />
        <span>🎁 FREE GIFT WRAPPING | PERSONALIZE YOUR GIFTS</span>
        <ChevronRight size={14} />
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', alignItems: 'center', padding: '15px 0' }}>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px' }}>
          {["MENS", "WOMENS", "JEWELLERY", "LEATHER GOODS"].map(cat => (
            <div key={cat} onMouseEnter={() => setActiveMenu(cat)} style={{ padding: '10px 0', cursor: 'pointer' }}>
              <Link to="/" style={{ color: activeMenu === cat ? '#888' : '#000', textDecoration: 'none' }}>{cat}</Link>
            </div>
          ))}
        </div>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 40px' }} onMouseEnter={() => setActiveMenu(null)}>
          <div style={{ border: '3px solid #000', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <span style={{ fontSize: '1.8rem', fontWeight: 900, transform: 'scaleX(1.4)' }}>N</span>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', alignItems: 'center', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '1px' }}>
          <Link to="/" style={{ color: '#000' }}>BRAND</Link>
          <Link to="/" style={{ color: '#000' }}>REWARDS</Link>
          <Link to="/" style={{ color: '#000' }}>ACCOUNT</Link>
          <button onClick={onCartOpen} style={{ background: 'none', border: 'none', color: '#000', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 800 }}>CART</span>
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -8, background: '#000', color: '#fff', borderRadius: '50%', width: 15, height: 15, fontSize: '0.55rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>}
          </button>
          <Search size={18} color="#000" strokeWidth={1.5} />
        </div>
      </div>

      {activeMenu && (activeMenu === 'MENS' || activeMenu === 'WOMENS' || activeMenu === 'JEWELLERY') && (
        <MegaMenu key={activeMenu} type={activeMenu} />
      )}
    </header>
  );
};

const Marquee = () => {
  const items = [
    { i: <Heart size={14}/>, t: "HANDCRAFTED IN UAE" },
    { i: <Star size={14}/>, t: "9,000+ FIVE-STAR REVIEWS" },
    { i: <Award size={14}/>, t: "AWARD WINNING BRAND" },
    { i: <Truck size={14}/>, t: "FAST & FREE SHIPPING" },
    { i: <Users size={14}/>, t: "60,000+ HAPPY CUSTOMERS" },
    { i: <Gem size={14}/>, t: "PREMIUM GIFT PACKAGING" }
  ];
  return (
    <div className="marquee-container" style={{ background: '#000', color: '#fff' }}>
      <div className="marquee-content">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">{item.i} {item.t}</div>
        ))}
      </div>
    </div>
  );
};

/* ─── PAGES ─── */

const Home = () => {
  const { products, formatPrice } = useShop();
  const [gender, setGender] = useState('WOMENS');
  
  const filteredProducts = products.filter(p => p.gender === gender);

  return (
    <div style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ height: '90vh', background: 'url("https://images.unsplash.com/photo-1627123424574-724758594e93?w=1600&q=80") center/cover no-repeat', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container" style={{ paddingLeft: '80px' }}>
          <h2 className="arabic" style={{ fontSize: '3.5rem', color: '#fff', fontWeight: 400, opacity: 0.9, marginBottom: '0' }}>مجموعة العيد</h2>
          <h1 style={{ fontSize: '5.5rem', fontWeight: 900, color: '#fff', letterSpacing: '10px', marginTop: '-10px', textTransform: 'uppercase' }}>EID COLLECTION</h1>
          <Link to="/" style={{ 
            display: 'inline-block', marginTop: '30px', padding: '18px 60px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50px', color: '#fff', fontWeight: 800, letterSpacing: '3px', fontSize: '0.9rem', textDecoration: 'none'
          }}>SHOP NOW</Link>
        </div>
      </section>

      <Marquee />

      {/* Best Sellers */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '3px' }}>BEST SELLERS</h2>
        </div>
        <div className="toggle-wrap">
           <button className={`toggle-btn ${gender === 'WOMENS' ? 'active' : 'inactive'}`} onClick={() => setGender('WOMENS')}>WOMENS</button>
           <button className={`toggle-btn ${gender === 'MENS' ? 'active' : 'inactive'}`} onClick={() => setGender('MENS')}>MENS</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {filteredProducts.map(p => (
            <div key={p.id} className="product-card">
              <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                <div className="product-card-img-wrap" style={{ background: '#fff' }}>
                  <img src={p.image} alt={p.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '30px 0', textAlign: 'center' }}>
                   <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px' }}><div className="color-dot" style={{ background: '#000' }}></div><div className="color-dot" style={{ background: '#4a3225' }}></div></div>
                   <div style={{ marginBottom: '15px' }}><span style={{ background: '#000', color: '#fff', padding: '4px 15px', fontSize: '0.6rem', fontWeight: 900 }}>{p.tag}</span></div>
                   <h3 style={{ fontSize: '0.85rem', margin: '5px 0', letterSpacing: '1px', fontWeight: 800 }}>{p.name}</h3>
                   <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatPrice(p.price)}</div>
                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', color: '#D4AF37', marginTop: '10px' }}><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><span style={{ color: '#888', fontSize: '0.7rem' }}>(50)</span></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Section (From Screenshot) */}
      <section style={{ padding: '80px 0', background: '#FDF9F3' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '2px' }}>FIND YOUR PERFECT GIFT</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
             <div className="gift-banner">
                <div>
                   <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>BUILD YOUR</span>
                   <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '10px 0' }}>OWN BUNDLE</h2>
                   <button className="btn-black" style={{ marginTop: '20px', borderRadius: '50px', padding: '15px 40px' }}>CREATE NOW</button>
                </div>
                <img src="https://images.unsplash.com/photo-1584917033904-47e08ef7d37b?w=400&q=80" alt="Bundle" />
             </div>
             <div className="gift-banner" style={{ background: 'linear-gradient(to right, #D6C4B0, #FDF9F3)' }}>
                <div>
                   <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>HANDPICKED</span>
                   <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '10px 0' }}>GIFT SETS</h2>
                   <button className="btn-black" style={{ marginTop: '20px', borderRadius: '50px', padding: '15px 40px' }}>SHOP NOW</button>
                </div>
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" alt="Sets" />
             </div>
          </div>
        </div>
      </section>

      {/* In The Press (Logos) */}
      <section style={{ padding: '80px 0', background: '#fff', textAlign: 'center' }}>
         <div className="container">
            <h4 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '5px', marginBottom: '40px' }}>NUMAN IN THE PRESS</h4>
            <div className="press-marquee">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg" alt="CNN" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/The_National_Logo.svg" alt="The National" style={{ filter: 'invert(1)' }} />
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Cosmopolitan_logo.svg" alt="Cosmo" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Khaleej_Times_Logo.svg" alt="Khaleej Times" />
            </div>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '40px', letterSpacing: '2px' }}>TRUSTED BY OVER 60,000+ CUSTOMERS</p>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#D4AF37', marginTop: '15px' }}><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/> <span style={{ color: '#888', marginLeft: '10px', fontSize: '0.8rem' }}>4.92 | 9,000+ REVIEWS</span></div>
         </div>
      </section>
    </div>
  );
};

/* ─── REST OF THE COMPONENTS ─── */
const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, formatPrice } = useShop();
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  return (
    <div className="container" style={{ paddingTop: '180px', paddingBottom: '120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'start' }}>
        <div style={{ display: 'flex', gap: '25px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '85px' }}>
              {[1,2].map(i => <div key={i} style={{ width: '100%', height: '100px', background: '#fff', padding: '10px', border: i === 1 ? '1px solid #000' : '1px solid #eee' }}><img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>)}
           </div>
           <div style={{ flex: 1, background: '#fff', padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={product.image} style={{ width: '100%', height: 'auto', maxHeight: '650px', objectFit: 'contain' }} /></div>
        </div>
        <div>
           <span className="tagline">{product.tag}</span>
           <h1 className="product-title" style={{ fontSize: '2rem' }}>{product.name}</h1>
           <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '30px 0' }}>{formatPrice(product.price)}</div>
           <button className="btn-minimalist-green" style={{ width: '100%', padding: '24px' }} onClick={() => addToCart(product)}><ShoppingBag size={20} strokeWidth={2} /> ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  if (!auth) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F9F9' }}><div style={{ padding: '80px', background: '#fff', textAlign: 'center', width: '500px' }}><h2 style={{ letterSpacing: '10px' }}>NUMAN</h2><input type="password" placeholder="ADMIN CODE" value={pass} onChange={(e) => setPass(e.target.value)} style={{ width: '100%', padding: '20px', margin: '40px 0', textAlign: 'center' }} /><button className="btn-black" style={{ width: '100%' }} onClick={() => pass === 'admin123' ? setAuth(true) : alert('NO')}>LOGIN</button></div></div>;
  return <div style={{ padding: '100px' }}><h2>DASHBOARD</h2></div>;
};

const Checkout = () => {
  const { cart, formatPrice } = useShop();
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) + 25;
  return (
    <div className="container" style={{ paddingTop: '220px' }}>
      <h2>CHECKOUT</h2>
      <button className="btn-minimalist-green" style={{ marginTop: '40px' }}>PLACE ORDER ({formatPrice(total)})</button>
    </div>
  );
};

const AppContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const { cart, formatPrice } = useShop();
  return (
    <div className="app-container">
      {!isAdmin && <Header onCartOpen={() => setCartOpen(true)} />}
      {!isAdmin && <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: '40px', right: '40px', background: '#25D366', color: '#fff', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}><MessageCircle size={38} /></a>}
      {cartOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 4000, display: 'flex', justifyContent: 'flex-end' }}><div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} /><div style={{ width: '500px', background: '#fff', padding: '60px' }}><h2>YOUR BAG</h2><div style={{ marginTop: '50px' }}>{cart.map(i => <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}><span>{i.name}</span><strong>{formatPrice(i.price)}</strong></div>)}</div><Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-minimalist-green" style={{ position: 'absolute', bottom: '60px', left: '60px', right: '60px', textAlign: 'center', textDecoration: 'none' }}>CHECKOUT</Link></div></div>}
      <Routes><Route path="/" element={<Home />} /><Route path="/product/:id" element={<ProductDetails />} /><Route path="/admin" element={<Admin />} /><Route path="/checkout" element={<Checkout />} /></Routes>
      {!isAdmin && <footer style={{ padding: '150px 0', borderTop: '2px solid #EEE', textAlign: 'center', background: '#fff' }}><div className="container"><h2 style={{ letterSpacing: '15px', marginBottom: '80px', fontWeight: 900 }}>NUMAN</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', textAlign: 'left' }}><div><h4>SHOP</h4></div><div><h4>SUPPORT</h4></div><div><h4>LEGAL</h4></div><div><h4>SOCIAL</h4></div></div></div></footer>}
    </div>
  );
};

export default function App() {
  return (<ShopProvider><Router><AppContent /></Router></ShopProvider>);
}
