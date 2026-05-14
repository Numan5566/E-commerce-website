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
    <div className="mega-menu" onMouseEnter={(e) => e.stopPropagation()}>
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
        <span>🎁 FREE GIFT WRAPPING | luminaminimal.com</span>
        <ChevronRight size={14} />
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', alignItems: 'center', padding: '15px 0' }}>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px' }}>
          {["MENS", "WOMENS", "JEWELLERY", "LEATHER GOODS"].map(cat => (
            <div key={cat} onMouseEnter={() => setActiveMenu(cat)} style={{ padding: '10px 0', cursor: 'pointer' }}>
              <Link to="/" style={{ color: activeMenu === cat ? '#888' : '#000', textDecoration: 'none' }}>{cat}</Link>
            </div>
          ))}
        </div>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={() => setActiveMenu(null)}>
          <div style={{ textAlign: 'center' }}>
             <div style={{ border: '3px solid #000', width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>L</span>
             </div>
             <div style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '3px' }}>LUMINA MINIMAL</div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', alignItems: 'center', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '1px' }}>
          <Link to="/" style={{ color: '#000' }}>BRAND</Link>
          <Link to="/reviews" style={{ color: '#000' }}>REVIEWS</Link>
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

/* ─── PAGES ─── */

const Home = () => {
  const { products, formatPrice, addToCart } = useShop();
  
  return (
    <div style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ height: '90vh', background: 'url("https://images.unsplash.com/photo-1627123424574-724758594e93?w=1600&q=80") center/cover no-repeat', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container" style={{ paddingLeft: '80px' }}>
          <h2 className="arabic" style={{ fontSize: '3.5rem', color: '#fff', fontWeight: 400, opacity: 0.9, marginBottom: '0' }}>مجموعة العيد</h2>
          <h1 style={{ fontSize: '5.5rem', fontWeight: 900, color: '#fff', letterSpacing: '10px', marginTop: '-10px', textTransform: 'uppercase' }}>LUMINA LUXE</h1>
          <Link to="/" style={{ 
            display: 'inline-block', marginTop: '30px', padding: '18px 60px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50px', color: '#fff', fontWeight: 800, letterSpacing: '3px', fontSize: '0.9rem', textDecoration: 'none'
          }}>SHOP NOW</Link>
        </div>
      </section>

      {/* Feature Slider Section */}
      <section className="container" style={{ padding: '80px 0' }}>
         <div className="feature-section">
            <div className="feature-img-wrap">
               <img src="https://images.unsplash.com/photo-1584917033904-47e08ef7d37b?w=800&q=80" alt="Feature" />
            </div>
            <div>
               <h2 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '1px' }}>ALYAZIA HANDBAG / BLACK & TAN</h2>
               <div style={{ fontSize: '1.8rem', fontWeight: 900, margin: '20px 0' }}>2,050.00 د.إ</div>
               <div style={{ display: 'flex', gap: '5px', color: '#D4AF37', marginBottom: '30px' }}>
                  <Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>4.92 | 330 REVIEWS</span>
               </div>
               <button className="btn-black" style={{ width: '100%', padding: '20px', marginBottom: '15px' }}>VIEW PRODUCT</button>
               <button className="btn-minimalist-green" style={{ width: '100%', padding: '20px' }}>ADD TO CART</button>
            </div>
         </div>
      </section>

      {/* Review Section (Screenshot 1) */}
      <section className="review-section">
         <div className="container">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '5px' }}>OVER 9,000+ FIVE-STAR REVIEWS</h2>
            <div className="review-grid">
               {[
                  { name: "MAITHA", text: "Love the quality ❤️ This is my second purchase from Lumina, and I am honestly so happy again! The service is amazing.", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
                  { name: "MOONSTAR", text: "Amazing. Perfect quality and amazing design. Aisha Almar was right on time, and the quality is just perfect.", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
                  { name: "SADAF", text: "I'll definitely be coming back for the new collection 🖤. The service is amazing, delivery was right on time.", img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400" }
               ].map((r, i) => (
                  <div key={i} className="review-card">
                     <img src={r.img} className="review-img" />
                     <div className="review-content">
                        <h4>{r.name}</h4>
                        <p>{r.text}</p>
                        <div style={{ display: 'flex', color: '#D4AF37' }}>
                           <Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/>
                           <span style={{ color: '#888', fontSize: '0.7rem', marginLeft: '5px' }}>(48)</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <Link to="/reviews" className="btn-black" style={{ display: 'inline-block', marginTop: '50px', borderRadius: '50px', padding: '18px 60px', textDecoration: 'none' }}>VIEW ALL REVIEWS</Link>
         </div>
      </section>

      {/* Womens Collection */}
      <section className="container" style={{ padding: '80px 0' }}>
         <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '4px' }}>WOMENS COLLECTION</h2>
         <div className="collection-grid">
            {["HANDBAGS | NEW", "LINKS", "DANA", "DAISY", "JOORY WATCH"].map((c, i) => (
               <Link key={i} to="/" className="collection-item">
                  <img src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=${i}`} alt={c} />
                  <span>{c}</span>
               </Link>
            ))}
         </div>
      </section>

      {/* Mens Collection */}
      <section className="container" style={{ padding: '80px 0' }}>
         <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '4px' }}>MENS COLLECTION</h2>
         <div className="collection-grid">
            {["VINTAGE CHRONO", "SKELETON", "TRAVEL POUCH", "HERITAGE", "FASTBACK"].map((c, i) => (
               <Link key={i} to="/" className="collection-item">
                  <img src={`https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=${i}`} alt={c} />
                  <span>{c}</span>
               </Link>
            ))}
         </div>
      </section>
    </div>
  );
};

const ReviewsPage = () => {
   const reviews = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      name: `CUSTOMER ${i + 1}`,
      text: "Absolutely amazing quality! I am so happy with my purchase. The packaging was beautiful and delivery was fast in UAE.",
      stars: 5
   }));

   return (
      <div style={{ paddingTop: '150px', paddingBottom: '100px' }}>
         <div className="container">
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '60px' }}>9,000+ FIVE-STAR REVIEWS</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
               {reviews.map(r => (
                  <div key={r.id} style={{ background: '#FDF9F3', padding: '30px', borderRadius: '10px' }}>
                     <div style={{ display: 'flex', color: '#D4AF37', marginBottom: '15px' }}>
                        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                     </div>
                     <h4 style={{ fontSize: '0.8rem', fontWeight: 800 }}>{r.name}</h4>
                     <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '10px', lineHeight: '1.6' }}>{r.text}</p>
                     <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '15px' }}>Verified Purchase from UAE ✅</div>
                  </div>
               ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
               <p style={{ color: '#888' }}>Showing 50 of 9,102 reviews</p>
               <button className="btn-black" style={{ marginTop: '20px' }}>LOAD MORE</button>
            </div>
         </div>
      </div>
   );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { products, formatPrice } = useShop();
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  return (
    <div className="container" style={{ paddingTop: '180px', paddingBottom: '120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px' }}>
        <div style={{ background: '#fff', padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={product.image} style={{ width: '100%', height: 'auto', maxHeight: '650px', objectFit: 'contain' }} /></div>
        <div>
           <span className="tagline">{product.tag}</span>
           <h1 className="product-title" style={{ fontSize: '2rem' }}>{product.name}</h1>
           <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '30px 0' }}>{formatPrice(product.price)}</div>
           <button className="btn-minimalist-green" style={{ width: '100%', padding: '24px' }}>ADD TO CART</button>
        </div>
      </div>
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
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/reviews" element={<ReviewsPage />} />
         <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      {!isAdmin && <footer style={{ padding: '150px 0', textAlign: 'center', background: '#fff', borderTop: '1px solid #eee' }}><div className="container"><h2 style={{ letterSpacing: '15px', marginBottom: '80px', fontWeight: 900 }}>LUMINA MINIMAL</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', textAlign: 'left' }}><div><h4>SHOP</h4></div><div><h4>SUPPORT</h4></div><div><h4>LEGAL</h4></div><div><h4>SOCIAL</h4></div></div></div></footer>}
    </div>
  );
};

export default function App() {
  return (<ShopProvider><Router><AppContent /></Router></ShopProvider>);
}
