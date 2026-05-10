import React, { useState } from 'react';
import { useShop, regions } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { 
  Home as HomeIcon, 
  Inbox, 
  Tag, 
  Users, 
  Megaphone, 
  Percent, 
  Image as ImageIcon, 
  Globe2, 
  BarChart3, 
  Store, 
  ChevronDown,
  Plus,
  ArrowLeft,
  MoreHorizontal,
  Printer,
  Edit2,
  Lock,
  Truck,
  Check,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Admin.css';

// Analytics Mock
const salesData = [{n:'Mon', s:4500}, {n:'Tue', s:3800}, {n:'Wed', s:6200}, {n:'Thu', s:5100}, {n:'Fri', s:9200}, {n:'Sat', s:14100}, {n:'Sun', s:11800}];

// Expanded Order Data with complete schema for cloning screenshot view
const INITIAL_ORDERS = [
  { 
    id: '#1012', customer: 'Muhammad Numan', email: 'numannaeem134@gmail.com', phone: '+92 3259773687', 
    address: '69-H New AL. Jalil Garden', city: 'Lahore', province: 'Punjab', country: 'Pakistan', 
    total: 6400.00, status: 'pending', date: 'April 28, 2026', items: [{name: "Girl's Rexine Shoulder Bag", qty: 2, price: 3200, variant: "Brown"}],
    ip: '202.163.123.9', payment: 'Cash on Delivery (COD)', fulfillment: 'Unfulfilled'
  },
  { 
    id: '#1011', customer: 'Sarah John', email: 'sarah.j@gmail.com', phone: '+1 212 555 0198', 
    address: '123 Broadway, Apt 4B', city: 'New York', province: 'NY', country: 'USA', 
    total: 134.98, status: 'delivered', date: 'April 27, 2026', items: [{name: "Anti-Gravity Humidifier", qty: 1, price: 134.98, variant: "Default"}],
    ip: '192.15.88.4', payment: 'Credit Card', fulfillment: 'Fulfilled'
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { addCustomProduct, products, setRegion } = useShop();
  
  // AUTH / NAVIGATION STATE
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_auth') === 'true');
  const [passInput, setPassInput] = useState('');
  const [activeTab, setActiveTab] = useState('home'); 
  
  // DATA STATE
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [viewingOrder, setViewingOrder] = useState(null); // For the 2-column view state
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleOpenStore = () => {
    setRegion(regions.find(r => r.code === 'US'));
    setViewingOrder(null);
    setActiveTab('store');
  };

  // Auth Check Logic
  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === 'admin123') { setIsLoggedIn(true); localStorage.setItem('admin_auth', 'true'); } 
    else alert("Incorrect. Hint: admin123");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 style={{letterSpacing: '3px', marginBottom: '1.5rem'}}>LUMINA HQ</h2>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Password" value={passInput} onChange={(e)=>setPassInput(e.target.value)} autoFocus />
            <button type="submit" className="btn-premium" style={{width:'100%'}}>Access Control</button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================
  // 1. SCREENSHOT REPLICA: ORDER DETAILS VIEW
  // ============================================
  const renderOrderDetails = (order) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Breadcrumb Top Belt */}
      <div className="order-header-belt">
        <h1>
          <button onClick={() => setViewingOrder(null)} style={{background:'none', border:'none', color:'#fff', cursor:'pointer'}}><ArrowLeft size={20}/></button>
          {order.id}
          <span className="status-pill pending">Payment pending</span>
          <span className="status-pill" style={{background:'#333'}}>Unfulfilled</span>
        </h1>
        <div className="btn-secondary-group">
          <button className="btn-sub-action">Restock</button>
          <button className="btn-sub-action">Edit</button>
          <button className="btn-sub-action">Print <ChevronDown size={12}/></button>
          <button className="btn-sub-action">More actions <ChevronDown size={12}/></button>
        </div>
      </div>
      <div style={{fontSize: '0.75rem', color: '#666', marginTop: '8px'}}>{order.date} from Lumina Form via Direct</div>

      {/* Split 2-Column Body Layout */}
      <div className="details-layout">
        {/* LEFT MAIN SECTION */}
        <div className="details-main-col">
          {/* 1. Unfulfilled Card */}
          <div className="dashboard-card">
            <div className="card-section-header">
              <div style={{display:'flex', gap:'10px'}}>
                <span style={{background: '#ffd700', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem'}}>Unfulfilled ({order.items.length})</span>
                <span style={{color:'#888', fontSize: '0.85rem'}}><Globe2 size={14} /> Shop location</span>
              </div>
              <MoreHorizontal size={16} color="#666" />
            </div>
            <div style={{fontSize:'0.85rem', margin: '1rem 0', display:'flex', alignItems:'center', gap:'8px'}}>
              <Truck size={16} color="#666" /> Free shipping
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="info-item-row" style={{paddingTop: '1rem', borderTop: '1px solid #262626'}}>
                <div style={{display:'flex', gap: '1rem'}}>
                  <div className="mini-thumb" style={{background: '#333', display:'flex', alignItems:'center', justifyContent:'center', color:'#999'}}>📦</div>
                  <div>
                    <div style={{fontWeight: 600}}>{item.name}</div>
                    <div style={{fontSize: '0.75rem', color: '#666'}}>{item.variant}</div>
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <span>Rs {(item.price).toLocaleString()} × {item.qty}</span>
                  <span style={{marginLeft: '2rem', fontWeight: 600}}>Rs {(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem'}}>
              <button className="btn-premium" style={{fontSize:'0.8rem'}}>Mark as fulfilled <ChevronDown size={14}/></button>
            </div>
          </div>

          {/* 2. Payment Pending Card */}
          <div className="dashboard-card">
            <div className="card-section-header">
              <span style={{background:'rgba(245,158,11,0.15)', color:'#f59e0b', padding: '4px 10px', borderRadius: '4px', fontSize:'0.75rem'}}>Payment pending</span>
              <MoreHorizontal size={16} color="#666" />
            </div>
            <div style={{background:'rgba(245,158,11,0.05)', borderLeft: '3px solid #f59e0b', padding: '1rem', fontSize:'0.8rem', color:'#cca352', margin: '1rem 0'}}>
              {order.payment} is still processing this payment. Wait for payment success before fulfillment.
            </div>
            
            <div style={{marginTop: '1rem'}}>
              <div className="info-item-row"><span style={{color:'#888'}}>Subtotal</span><span>{order.items.length} items</span><span>Rs {(order.total).toLocaleString()}</span></div>
              <div className="info-item-row"><span style={{color:'#888'}}>Shipping</span><span>Free shipping</span><span>Rs 0.00</span></div>
              <div className="total-row info-item-row"><span>Total</span><span></span><span>Rs {(order.total).toLocaleString()}</span></div>
              <div className="info-item-row" style={{borderTop:'none', color:'#888'}}><span>Paid</span><span>Rs 0.00</span></div>
              <div className="info-item-row" style={{borderTop:'none', fontWeight:600}}><span>Balance</span><span>Rs {(order.total).toLocaleString()}</span></div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem'}}>
              <button className="btn-sub-action">Send invoice</button>
              <button className="btn-premium" style={{fontSize:'0.8rem', background: '#333'}}>Mark as paid</button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR SECTION */}
        <div className="details-side-col">
          <div className="dashboard-card">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: '1rem'}}>
              <div style={{fontWeight: 600, fontSize: '0.85rem'}}>Notes</div>
              <Edit2 size={14} color="#666" />
            </div>
            <div style={{color: '#666', fontSize: '0.85rem'}}>No notes from customer</div>
          </div>

          <div className="dashboard-card">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: '1.5rem'}}>
              <div style={{fontWeight: 600, fontSize: '0.85rem'}}>Additional details</div>
              <Edit2 size={14} color="#666" />
            </div>
            <div className="side-info-line"><div className="side-info-label">Full Name</div><div>{order.customer}</div></div>
            <div className="side-info-line"><div className="side-info-label">Phone number</div><div>{order.phone}</div></div>
            <div className="side-info-line"><div className="side-info-label">Address</div><div>{order.address}</div></div>
            <div className="side-info-line"><div className="side-info-label">City</div><div>{order.city}</div></div>
            <div className="side-info-line"><div className="side-info-label">Province</div><div>{order.province}</div></div>
            <div className="side-info-line"><div className="side-info-label">Email</div><div>{order.email}</div></div>
            <div className="side-info-line"><div className="side-info-label">Subscribe Status</div><div style={{color:'#666'}}>off</div></div>
            <div className="side-info-line"><div className="side-info-label">IP address</div><div style={{color:'#666'}}>{order.ip}</div></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ============================================
  // 2. HOME / DASHBOARD VIEW
  // ============================================
  const renderHome = () => (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
      <div className="page-header-group"><h1>Total Sales</h1></div>
      <div className="dashboard-card" style={{height: 350}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}><defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fff" stopOpacity={0.1}/><stop offset="95%" stopColor="#fff" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#222"/><XAxis dataKey="n" stroke="#555"/><Tooltip contentStyle={{background:'#000', border:'1px solid #333'}}/><Area type="monotone" dataKey="s" stroke="#fff" fill="url(#grad)" strokeWidth={2}/></AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: '1.5rem'}}>
        <div className="dashboard-card">
          <div style={{color: '#888', fontSize: '0.8rem'}}>Sessions</div>
          <div style={{fontSize:'1.8rem', fontWeight:700}}>1,240</div>
        </div>
        <div className="dashboard-card">
          <div style={{color: '#888', fontSize: '0.8rem'}}>Online store conversion rate</div>
          <div style={{fontSize:'1.8rem', fontWeight:700}}>2.8%</div>
        </div>
        <div className="dashboard-card">
          <div style={{color: '#888', fontSize: '0.8rem'}}>Total orders</div>
          <div style={{fontSize:'1.8rem', fontWeight:700}}>{orders.length}</div>
        </div>
      </div>
    </motion.div>
  );

  // ============================================
  // 3. ORDERS TABLE LIST
  // ============================================
  const renderOrdersList = () => (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
      <div className="page-header-group"><h1>Orders</h1></div>
      <div className="dashboard-card" style={{padding:0}}>
        <div style={{padding: '1rem', display:'flex', gap:'10px', borderBottom: '1px solid #262626'}}><button className="btn-sub-action">All</button><button className="btn-sub-action">Unfulfilled</button><button className="btn-sub-action">Unpaid</button></div>
        <table className="admin-table">
          <thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Total</th><th>Payment status</th><th>Fulfillment status</th><th>Items</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{cursor:'pointer'}} onClick={() => setViewingOrder(o)}>
                <td style={{fontWeight:600, color:'#fff'}}>{o.id}</td>
                <td>{o.date}</td>
                <td>{o.customer}</td>
                <td>Rs {o.total.toLocaleString()}</td>
                <td><span className={`status-pill ${o.status}`}>{o.status}</span></td>
                <td><span style={{color:'#888'}}>{o.fulfillment}</span></td>
                <td>{o.items.length} items</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  // ============================================
  // 4. PRODUCTS MANAGEMENT
  // ============================================
  const renderProducts = () => {
    if (isAddingProduct) {
      return (
        <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}}>
          <div className="page-header-group">
             <button onClick={()=>setIsAddingProduct(false)} style={{background:'none', border:'none', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}><ArrowLeft size={16}/> Back</button>
             <h1>Add product</h1>
          </div>
          <div className="dashboard-card" style={{maxWidth: 600}}>
             <form onSubmit={(e)=>{e.preventDefault(); setIsAddingProduct(false); alert("Product pushed!")}}>
               <div style={{marginBottom: '1rem'}}><label style={{display:'block', fontSize:'0.8rem', marginBottom:'5px'}}>Title</label><input style={{width:'100%', padding:'0.8rem', background:'#111', border:'1px solid #333', color:'#fff', borderRadius:'4px'}} required placeholder="Short sleeve t-shirt"/></div>
               <div style={{marginBottom: '1rem'}}><label style={{display:'block', fontSize:'0.8rem', marginBottom:'5px'}}>Price (USD)</label><input type="number" style={{width:'100%', padding:'0.8rem', background:'#111', border:'1px solid #333', color:'#fff', borderRadius:'4px'}} required/></div>
               <button className="btn-premium" type="submit" style={{width:'100%'}}>Save Product</button>
             </form>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="page-header-group">
          <h1>Products</h1>
          <button onClick={() => setIsAddingProduct(true)} className="btn-premium" style={{fontSize:'0.8rem', padding:'0.5rem 1rem'}}><Plus size={16}/> Add product</button>
        </div>
        <div className="dashboard-card" style={{padding:0}}>
          <table className="admin-table">
            <thead><tr><th>Product</th><th>Status</th><th>Inventory</th><th>Type</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    {p.image && <img src={p.image} className="mini-thumb" alt="Thumb"/>}
                    <span style={{fontWeight:600, color:'#fff'}}>{p.name}</span>
                  </td>
                  <td><span style={{background:'#2b3d2b', color:'#48bb78', padding:'2px 8px', borderRadius:'12px', fontSize:'0.7rem'}}>Active</span></td>
                  <td>Available</td>
                  <td>{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  // ============================================
  // 5. CUSTOMERS VIEW
  // ============================================
  const renderCustomers = () => (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
       <div className="page-header-group"><h1>Customers</h1></div>
       <div className="dashboard-card" style={{padding:0}}>
         <table className="admin-table">
           <thead><tr><th>Customer name</th><th>Email subscription</th><th>Location</th><th>Orders</th></tr></thead>
           <tbody>
             {orders.map(o => (
               <tr key={o.id + 'cust'}>
                 <td><div style={{fontWeight:600, color:'#fff'}}>{o.customer}</div><div style={{color:'#666', fontSize:'0.8rem'}}>{o.city}, {o.country}</div></td>
                 <td><span style={{color:'#666'}}>Subscribed</span></td>
                 <td>{o.country}</td>
                 <td>1 order</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    </motion.div>
  );

  // ============================================
  // DUMMY PLACEHOLDER VIEWS FOR NEW TABS
  // ============================================
  const renderPlaceholder = (title, subtitle) => (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}>
       <div className="page-header-group"><h1>{title}</h1></div>
       <div className="dashboard-card" style={{textAlign:'center', padding:'4rem'}}>
         <div style={{fontSize: '3rem', opacity: 0.2, marginBottom: '1rem'}}>📦</div>
         <h3>{subtitle}</h3>
         <p style={{color:'#666', marginTop:'10px'}}>Feature is currently propagating across active sales channels.</p>
       </div>
    </motion.div>
  );

  // ============================================
  // MASTER ROUTING BLOCK
  // ============================================
  const getActiveContent = () => {
    if (viewingOrder) return renderOrderDetails(viewingOrder);
    
    switch (activeTab) {
      case 'home': return renderHome();
      case 'orders': return renderOrdersList();
      case 'products': return renderProducts();
      case 'customers': return renderCustomers();
      case 'analytics': return renderPlaceholder("Analytics", "Detailed traffic and behavior data will pop here.");
      case 'marketing': return renderPlaceholder("Marketing", "Create campaigns and target emails.");
      case 'discounts': return renderPlaceholder("Discounts", "Manage coupon codes and deal engines.");
      case 'content': return renderPlaceholder("Content", "Edit meta pages and rich content grids.");
      case 'markets': return renderPlaceholder("Markets", "Control multi-market settings.");
      case 'store': return <Home />;
      default: return renderHome();
    }
  };


  return (
    <div className="admin-layout">
      {/* THE EXACT SHOPIFY SIDEBAR REPLICA */}
      <div className="admin-sidebar">
        {/* Profile Hub */}
        <div style={{display:'flex', gap:'8px', alignItems:'center', padding:'0.5rem', marginBottom:'0.5rem'}}>
          <div style={{background:'#333', width:32, height:32, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold'}}>L</div>
          <div style={{fontWeight:600, fontSize:'0.85rem'}}>Lumina HQ <ChevronDown size={12} style={{marginLeft:'5px', color:'#888'}}/></div>
        </div>

        {/* Search Bar Simulated */}
        <div style={{background:'#252525', borderRadius:6, padding:'6px 10px', display:'flex', alignItems:'center', gap:'8px', marginBottom:'1rem', fontSize:'0.8rem', color:'#888'}}>
          <Search size={14}/> Search
        </div>

        <nav style={{display:'flex', flexDirection:'column', gap: '2px'}}>
          <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => {setActiveTab('home'); setViewingOrder(null);}}><HomeIcon size={18}/> Home</button>
          <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => {setActiveTab('orders'); setViewingOrder(null);}}><Inbox size={18}/> Orders <span className="sidebar-count">{orders.length}</span></button>
          <button className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => {setActiveTab('products'); setViewingOrder(null);}}><Tag size={18}/> Products</button>
          <button className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => {setActiveTab('customers'); setViewingOrder(null);}}><Users size={18}/> Customers</button>
          <button className={`nav-item ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => {setActiveTab('marketing'); setViewingOrder(null);}}><Megaphone size={18}/> Marketing</button>
          <button className={`nav-item ${activeTab === 'discounts' ? 'active' : ''}`} onClick={() => {setActiveTab('discounts'); setViewingOrder(null);}}><Percent size={18}/> Discounts</button>
          <button className={`nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => {setActiveTab('content'); setViewingOrder(null);}}><ImageIcon size={18}/> Content</button>
          <button className={`nav-item ${activeTab === 'markets' ? 'active' : ''}`} onClick={() => {setActiveTab('markets'); setViewingOrder(null);}}><Globe2 size={18}/> Markets</button>
          <button className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => {setActiveTab('analytics'); setViewingOrder(null);}}><BarChart3 size={18}/> Analytics</button>
        </nav>

        <div className="sidebar-section-label"><span>Sales channels</span> <ChevronDown size={12}/></div>
        <button className={`nav-item ${activeTab === 'store' ? 'active' : ''}`} onClick={handleOpenStore}><Store size={18}/> Online Store</button>

        <div style={{marginTop:'auto', borderTop:'1px solid #262626', paddingTop:'1rem'}}>
          <button className="nav-item" onClick={() => {localStorage.removeItem('admin_auth'); setIsLoggedIn(false);}} style={{color:'#ff6b6b'}}><Lock size={16}/> Logout Terminal</button>
        </div>
      </div>

      {/* DYNAMIC MAIN VIEWPORT */}
      <div className="admin-main" style={{padding: activeTab === 'store' ? 0 : '2rem 3rem'}}>
        <AnimatePresence mode="wait">
          {getActiveContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
