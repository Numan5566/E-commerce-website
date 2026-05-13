import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import {
  Home as HomeIcon, Inbox, Tag, Users, BarChart3, Store,
  ChevronDown, Plus, ArrowLeft, Edit2, Lock, Truck,
  Globe2, MoreHorizontal, Search, Trash2, ExternalLink,
  TrendingUp, ShoppingCart, DollarSign, Package, Eye,
  X, Save, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Admin.css';

const salesData = [
  {n:'Mon', s:4500}, {n:'Tue', s:3800}, {n:'Wed', s:6200},
  {n:'Thu', s:5100}, {n:'Fri', s:9200}, {n:'Sat', s:14100}, {n:'Sun', s:11800}
];

const INITIAL_ORDERS = [
  {
    id:'#1012', customer:'Muhammad Numan', email:'numannaeem134@gmail.com',
    phone:'+92 3259773687', address:'69-H New AL. Jalil Garden',
    city:'Lahore', province:'Punjab', country:'Pakistan',
    total:6400, status:'pending', date:'May 13, 2026',
    items:[{name:"Anti-Gravity Humidifier", qty:2, price:3200, variant:"Default"}],
    ip:'202.163.123.9', payment:'Cash on Delivery (COD)', fulfillment:'Unfulfilled'
  },
  {
    id:'#1011', customer:'Sarah Johnson', email:'sarah.j@gmail.com',
    phone:'+1 212 555 0198', address:'123 Broadway, Apt 4B',
    city:'New York', province:'NY', country:'USA',
    total:134.98, status:'delivered', date:'May 12, 2026',
    items:[{name:"MagSafe 3-in-1 PowerStation", qty:1, price:134.98, variant:"Default"}],
    ip:'192.15.88.4', payment:'Credit Card', fulfillment:'Fulfilled'
  },
  {
    id:'#1010', customer:'Layla Hassan', email:'layla.h@gmail.com',
    phone:'+971 55 234 5678', address:'Sheikh Zayed Rd, DIFC',
    city:'Dubai', province:'Dubai', country:'UAE',
    total:224.97, status:'processing', date:'May 11, 2026',
    items:[{name:"Smart LED Desk Lamp Pro", qty:3, price:74.99, variant:"White"}],
    ip:'89.41.121.33', payment:'Credit Card', fulfillment:'Unfulfilled'
  },
];

/* ─── Stat Card ─────────────────────────────── */
const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="stat-card">
    <div className="stat-card-icon" style={{ background: color }}>{icon}</div>
    <div className="stat-card-body">
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  </div>
);

/* ─── Add / Edit Product Modal ──────────────── */
const ProductModal = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState(product || {
    name: '', category: '', price: '', buyPrice: '',
    tag: '', description: '', supplier: '', stock: '', image: ''
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price), buyPrice: parseFloat(form.buyPrice || 0), stock: parseInt(form.stock || 0) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label>Product Title *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. MagSafe PowerStation" required />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Charging Tech" required />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Sell Price (USD) *</label>
              <input type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} placeholder="59.99" required />
            </div>
            <div className="form-group">
              <label>Buy / Cost Price (USD)</label>
              <input type="number" step="0.01" value={form.buyPrice} onChange={e => set('buyPrice', e.target.value)} placeholder="15.00" />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Stock Qty</label>
              <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="100" />
            </div>
            <div className="form-group">
              <label>Product Tag</label>
              <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="🔥 Best Seller" />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
            {form.image && <img src={form.image} alt="preview" className="img-preview" onError={e => e.target.style.display='none'} />}
          </div>

          <div className="form-group">
            <label>AliExpress / Supplier Link</label>
            <input value={form.supplier} onChange={e => set('supplier', e.target.value)} placeholder="https://www.aliexpress.com/item/..." />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short product description..." />
          </div>

          {form.price && form.buyPrice && (
            <div className="margin-preview">
              <span>💰 Est. Margin: <strong style={{ color: '#48bb78' }}>
                {Math.round(((form.price - form.buyPrice) / form.price) * 100)}%
              </strong></span>
              <span>Profit/unit: <strong style={{ color: '#48bb78' }}>
                ${(form.price - form.buyPrice).toFixed(2)}
              </strong></span>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save"><Save size={15} /> Save Product</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

/* ─── MAIN ADMIN COMPONENT ──────────────────── */
const AdminDashboard = () => {
  const { addCustomProduct, products, deleteProduct, updateProduct } = useShop();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_auth') === 'true');
  const [passInput, setPassInput] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQ, setSearchQ] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === 'admin123') { setIsLoggedIn(true); localStorage.setItem('admin_auth', 'true'); }
    else alert('Wrong password. Hint: admin123');
  };

  const handleSaveProduct = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addCustomProduct(data);
    }
    setShowModal(false);
    setEditingProduct(null);
    setActiveTab('products');
  };

  const openEdit = (p) => { setEditingProduct(p); setShowModal(true); };
  const openAdd = () => { setEditingProduct(null); setShowModal(true); };

  const navigate = tab => { setActiveTab(tab); setViewingOrder(null); };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const profitEst = products.reduce((s, p) => s + ((p.price - (p.buyPrice || 0)) * (p.stock || 0)), 0);

  /* ── LOGIN SCREEN ── */
  if (!isLoggedIn) return (
    <div className="admin-login-page">
      <motion.div className="admin-login-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="admin-login-logo">
          <div className="admin-logo-icon">L</div>
          <h1>Lumina HQ</h1>
          <p>Admin Control Panel</p>
        </div>
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={passInput} onChange={e => setPassInput(e.target.value)} placeholder="Enter admin password..." autoFocus />
          </div>
          <button type="submit" className="btn-save" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
            <Lock size={16} /> Access Panel
          </button>
        </form>
        <p className="login-hint">Demo: admin123</p>
      </motion.div>
    </div>
  );

  /* ── DASHBOARD ── */
  const renderHome = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header-group">
        <div>
          <h1>Dashboard</h1>
          <p className="page-sub">Welcome back! Here's your store overview.</p>
        </div>
        <button className="btn-save" onClick={openAdd}><Plus size={16} /> Add Product</button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard icon={<DollarSign size={20}/>} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} sub="↑ 23% this week" color="rgba(72,187,120,0.15)" />
        <StatCard icon={<ShoppingCart size={20}/>} label="Total Orders" value={orders.length} sub={`${orders.filter(o=>o.status==='pending').length} pending`} color="rgba(124,106,247,0.15)" />
        <StatCard icon={<Package size={20}/>} label="Products" value={products.length} sub="Active listings" color="rgba(6,182,212,0.15)" />
        <StatCard icon={<TrendingUp size={20}/>} label="Est. Inventory Value" value={`$${profitEst.toLocaleString(undefined,{maximumFractionDigits:0})}`} sub="Based on margins" color="rgba(245,158,11,0.15)" />
      </div>

      {/* Chart */}
      <div className="dashboard-card">
        <div className="card-title">Weekly Sales</div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c6af7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7c6af7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
              <XAxis dataKey="n" stroke="#555" tick={{ fontSize: 12 }} />
              <YAxis stroke="#555" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#12121e', border: '1px solid #2a2a40', borderRadius: 8, color: '#fff' }} />
              <Area type="monotone" dataKey="s" stroke="#7c6af7" fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="dashboard-card" style={{ padding: 0 }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="card-title" style={{ marginBottom: 0 }}>Recent Orders</div>
          <button className="btn-ghost-sm" onClick={() => navigate('orders')}>View All</button>
        </div>
        <table className="admin-table">
          <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.slice(0,3).map(o => (
              <tr key={o.id} onClick={() => { setViewingOrder(o); navigate('orders'); }} style={{ cursor: 'pointer' }}>
                <td><span className="order-id">{o.id}</span></td>
                <td>{o.customer}</td>
                <td className="fw-bold">${o.total.toLocaleString()}</td>
                <td><span className={`status-pill ${o.status}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  /* ── ORDERS ── */
  const renderOrders = () => {
    if (viewingOrder) return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-header-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="back-btn" onClick={() => setViewingOrder(null)}><ArrowLeft size={16} /> Orders</button>
            <h1>{viewingOrder.id}</h1>
            <span className={`status-pill ${viewingOrder.status}`}>{viewingOrder.status}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-ghost-sm">Print</button>
            <button className="btn-ghost-sm">Edit</button>
            <button className="btn-save" style={{ fontSize: '0.8rem' }}>Mark Fulfilled</button>
          </div>
        </div>
        <p className="page-sub" style={{ marginBottom: '1.5rem' }}>{viewingOrder.date} · {viewingOrder.payment}</p>

        <div className="details-layout">
          <div>
            <div className="dashboard-card">
              <div className="card-title">Items ({viewingOrder.items.length})</div>
              {viewingOrder.items.map((item, i) => (
                <div key={i} className="order-item-row">
                  <div className="order-item-thumb">📦</div>
                  <div style={{ flex: 1 }}>
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.78rem' }}>{item.variant}</div>
                  </div>
                  <div className="text-right">
                    <div>${item.price.toFixed(2)} × {item.qty}</div>
                    <div className="fw-bold">${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              <div className="order-total-row">
                <span>Total</span>
                <span className="fw-bold">${viewingOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="dashboard-card">
              <div className="card-title">Customer</div>
              <div className="detail-line"><span className="text-muted">Name</span><span>{viewingOrder.customer}</span></div>
              <div className="detail-line"><span className="text-muted">Email</span><span>{viewingOrder.email}</span></div>
              <div className="detail-line"><span className="text-muted">Phone</span><span>{viewingOrder.phone}</span></div>
              <div className="detail-line"><span className="text-muted">City</span><span>{viewingOrder.city}, {viewingOrder.country}</span></div>
              <div className="detail-line"><span className="text-muted">Address</span><span>{viewingOrder.address}</span></div>
              <div className="detail-line"><span className="text-muted">IP</span><span style={{ color: '#555', fontSize: '0.75rem' }}>{viewingOrder.ip}</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-header-group">
          <h1>Orders <span className="count-badge">{orders.length}</span></h1>
        </div>
        <div className="dashboard-card" style={{ padding: 0 }}>
          <div className="table-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Pending</button>
            <button className="filter-btn">Processing</button>
            <button className="filter-btn">Delivered</button>
          </div>
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Total</th><th>Payment</th><th>Fulfillment</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} onClick={() => setViewingOrder(o)} style={{ cursor: 'pointer' }}>
                  <td><span className="order-id">{o.id}</span></td>
                  <td className="text-muted">{o.date}</td>
                  <td><div className="fw-bold">{o.customer}</div><div className="text-muted" style={{ fontSize: '0.75rem' }}>{o.city}, {o.country}</div></td>
                  <td className="fw-bold">${o.total.toLocaleString()}</td>
                  <td><span className={`status-pill ${o.status}`}>{o.status}</span></td>
                  <td><span className={`status-pill ${o.fulfillment === 'Fulfilled' ? 'delivered' : 'pending'}`}>{o.fulfillment}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  /* ── PRODUCTS ── */
  const renderProducts = () => {
    const filtered = products.filter(p => p.name?.toLowerCase().includes(searchQ.toLowerCase()));
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-header-group">
          <h1>Products <span className="count-badge">{products.length}</span></h1>
          <button className="btn-save" onClick={openAdd}><Plus size={16} /> Add Product</button>
        </div>

        {/* Search */}
        <div className="search-bar">
          <Search size={16} />
          <input placeholder="Search products..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
        </div>

        <div className="products-admin-grid">
          {filtered.map(p => {
            const margin = p.buyPrice ? Math.round(((p.price - p.buyPrice) / p.price) * 100) : null;
            return (
              <div key={p.id} className="product-admin-card">
                <div className="prod-card-img">
                  {p.image ? <img src={p.image} alt={p.name} /> : <Package size={32} color="#555" />}
                </div>
                <div className="prod-card-body">
                  <div className="prod-card-tag">{p.tag || p.category}</div>
                  <div className="prod-card-name">{p.name}</div>
                  <div className="prod-card-prices">
                    <span className="prod-sell-price">${p.price}</span>
                    {p.buyPrice && <span className="prod-buy-price">Cost: ${p.buyPrice}</span>}
                    {margin && <span className="prod-margin">{margin}% margin</span>}
                  </div>
                  {p.stock !== undefined && (
                    <div className="prod-stock">
                      <div className="stock-bar-wrap">
                        <div className="stock-bar" style={{ width: `${Math.min((p.stock / 100) * 100, 100)}%`, background: p.stock < 20 ? '#f43f5e' : '#48bb78' }} />
                      </div>
                      <span>{p.stock} in stock</span>
                    </div>
                  )}
                  <div className="prod-card-actions">
                    {p.supplier && (
                      <a href={p.supplier} target="_blank" rel="noreferrer" className="btn-source" title="View Supplier">
                        <ExternalLink size={13} /> Supplier
                      </a>
                    )}
                    <button className="btn-edit-sm" onClick={() => openEdit(p)}><Edit2 size={13} /></button>
                    <button className="btn-del-sm" onClick={() => { if(window.confirm('Delete?')) deleteProduct(p.id); }}><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  /* ── CUSTOMERS ── */
  const renderCustomers = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header-group">
        <h1>Customers <span className="count-badge">{orders.length}</span></h1>
      </div>
      <div className="dashboard-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr><th>Customer</th><th>Location</th><th>Orders</th><th>Spent</th><th>Payment</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id + 'c'}>
                <td>
                  <div className="customer-row">
                    <div className="cust-avatar">{o.customer[0]}</div>
                    <div>
                      <div className="fw-bold">{o.customer}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{o.email}</div>
                    </div>
                  </div>
                </td>
                <td className="text-muted">{o.city}, {o.country}</td>
                <td>1 order</td>
                <td className="fw-bold">${o.total.toLocaleString()}</td>
                <td><span className={`status-pill ${o.status}`}>{o.payment}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const getContent = () => {
    if (viewingOrder && activeTab === 'orders') return renderOrders();
    switch (activeTab) {
      case 'home': return renderHome();
      case 'orders': return renderOrders();
      case 'products': return renderProducts();
      case 'customers': return renderCustomers();
      case 'store': return <Home />;
      default: return renderHome();
    }
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: <HomeIcon size={17} /> },
    { id: 'orders', label: 'Orders', icon: <Inbox size={17} />, badge: orders.filter(o => o.status === 'pending').length },
    { id: 'products', label: 'Products', icon: <Tag size={17} />, badge: products.length },
    { id: 'customers', label: 'Customers', icon: <Users size={17} /> },
    { id: 'store', label: 'Online Store', icon: <Store size={17} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">L</div>
          <div>
            <div className="sidebar-brand-name">Lumina Minimal</div>
            <div className="sidebar-plan">Admin Panel</div>
          </div>
        </div>

        <div className="sidebar-search">
          <Search size={14} />
          <span>Search</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge > 0 && <span className="sidebar-count">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="nav-item logout-btn"
            onClick={() => { localStorage.removeItem('admin_auth'); setIsLoggedIn(false); }}
          >
            <Lock size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="admin-main" style={{ padding: activeTab === 'store' ? 0 : '2rem 2.5rem' }}>
        <AnimatePresence mode="wait">{getContent()}</AnimatePresence>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && (
          <ProductModal
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => { setShowModal(false); setEditingProduct(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
