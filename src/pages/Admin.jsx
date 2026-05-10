import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackagePlus, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Globe, 
  BellRing,
  ArrowLeft,
  PlusCircle,
  CheckCircle,
  Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './Admin.css';

// Fake data for the charts
const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5500 },
  { name: 'Thu', sales: 4780 },
  { name: 'Fri', sales: 8900 },
  { name: 'Sat', sales: 12400 },
  { name: 'Sun', sales: 9800 },
];

const countryData = [
  { name: 'USA', value: 55 },
  { name: 'UAE', value: 25 },
  { name: 'Pakistan', value: 15 },
  { name: 'Europe', value: 5 },
];

const COLORS = ['#ffffff', '#a3a3a3', '#525252', '#262626'];

const AdminDashboard = () => {
  const { addCustomProduct } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // overview or addProduct
  
  // State for Add Product logic
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', category: 'Tech Accessories', tag: 'New Entry', image: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return alert("Missing fields!");
    addCustomProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      tag: formData.tag,
      image: formData.image
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', price: '', category: 'Tech Accessories', tag: 'New Entry', image: '' });
      setActiveTab('overview');
    }, 1500);
  };

  // ---- RENDER COMPONENT: OVERVIEW ----
  const renderOverview = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="dashboard-header">
        <h1>Analytics Hub</h1>
        <div className="btn-outline" style={{padding: '0.5rem 1rem', fontSize: '0.75rem'}}>Last 7 Days</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">Total Revenue <TrendingUp size={16} /></div>
          <div className="stat-value">$48,352.00</div>
          <div className="stat-trend">+14.2% from last week</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">Active Users <Users size={16} /></div>
          <div className="stat-value">1,284</div>
          <div className="stat-trend">Live now viewing shop</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">Total Product Clicks <ShoppingBag size={16} /></div>
          <div className="stat-value">9,430</div>
          <div className="stat-trend">+23.5% clicks rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">Email Subscriptions <BellRing size={16} /></div>
          <div className="stat-value">439</div>
          <div className="stat-trend">Push notifications set</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <h3>Gross Sales Trends ($)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#555" fontSize={12} />
                <YAxis stroke="#555" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Visits by Region</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={countryData} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{marginTop: '1rem'}}>
            {countryData.map((c, i) => (
              <div key={c.name} style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'#aaa', marginBottom:'0.4rem'}}>
                <span><span style={{display:'inline-block', width:8, height:8, background:COLORS[i], marginRight:6}}></span>{c.name}</span>
                <span>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="charts-row" style={{gridTemplateColumns: '1fr 1fr'}}>
        <div className="chart-container">
          <h3>Recent Order Log</h3>
          <div className="feed-list">
            <div className="feed-item">
              <div className="feed-avatar">AB</div>
              <div className="feed-details">
                <div className="feed-action">Ahmed B. purchased **MagSafe Station**</div>
                <div className="feed-meta">Dubai, UAE • Just now</div>
              </div>
              <div style={{color:'#10b981', fontSize:'0.8rem'}}>+$59.99</div>
            </div>
            <div className="feed-item">
              <div className="feed-avatar" style={{background:'#fff', color:'#000'}}>JD</div>
              <div className="feed-details">
                <div className="feed-action">John D. purchased **Aura Humidifier**</div>
                <div className="feed-meta">New York, USA • 15 mins ago</div>
              </div>
              <div style={{color:'#10b981', fontSize:'0.8rem'}}>+$74.99</div>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h3>Top Performing Clicks</h3>
          <div className="feed-list">
             <div style={{display:'flex', justifyContent:'space-between', padding:'0.8rem 0', borderBottom:'1px solid #222'}}>
               <span style={{fontSize:'0.85rem'}}>MagSafe 3-in-1 Station</span>
               <span style={{fontSize:'0.85rem', color:'#fff'}}>2,402 Clicks</span>
             </div>
             <div style={{display:'flex', justifyContent:'space-between', padding:'0.8rem 0'}}>
               <span style={{fontSize:'0.85rem'}}>Anti-Gravity Aura Humidifier</span>
               <span style={{fontSize:'0.85rem', color:'#fff'}}>1,905 Clicks</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ---- RENDER COMPONENT: ADD PRODUCT ----
  const renderAddProduct = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="dashboard-header">
        <h1>Create New Product Listing</h1>
      </div>
      <div className="admin-form glass" style={{padding: '2rem', maxWidth: '800px'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div className="form-row">
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Price (USD)</label>
                <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Badge Label</label>
                <input type="text" value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Product Cover Image</label>
              <div className={`image-dropzone ${formData.image ? 'has-img' : ''}`}>
                {formData.image ? <img src={formData.image} alt="Preview" className="preview-thumbnail" /> : (
                  <div className="placeholder"><Upload size={24} /><span>Drop source file here</span></div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
            <button type="submit" className="btn-premium publish-btn" disabled={success}>
              {success ? <><CheckCircle size={18} /> Published Listing</> : <><PlusCircle size={18} /> Sync To Store</>}
            </button>
          </form>
      </div>
    </motion.div>
  );

  return (
    <div className="admin-layout">
      {/* Left Sidebar Navigation */}
      <div className="admin-sidebar">
        <div className="sidebar-logo">LUMINA HQ</div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button className={`nav-item ${activeTab === 'addProduct' ? 'active' : ''}`} onClick={() => setActiveTab('addProduct')}>
            <PackagePlus size={18} /> Add Inventory
          </button>
          <button className="nav-item">
            <Globe size={18} /> Global Map
          </button>
          <button className="nav-item">
            <BellRing size={18} /> Email Hub
          </button>
        </nav>
        <button onClick={() => navigate('/')} className="nav-item" style={{borderTop: '1px solid #222', paddingTop: '1.5rem'}}>
          <ArrowLeft size={18} /> Exit Dashboard
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="admin-main">
        {activeTab === 'overview' ? renderOverview() : renderAddProduct()}
      </div>
    </div>
  );
};

export default AdminDashboard;
