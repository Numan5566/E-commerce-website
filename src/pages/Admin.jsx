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

/* ─── Add / Edit Product Page (Shopify Style) ──────────────── */
const ProductModal = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState(product || {
    name: '', category: '', price: '', buyPrice: '',
    tag: '', description: '', supplier: '', stock: '', image: '',
    comparePrice: '', status: 'Active', vendor: 'None', type: 'None'
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price || 0), buyPrice: parseFloat(form.buyPrice || 0), stock: parseInt(form.stock || 0) });
  };

  return (
    <div className="sp-page-overlay">
      <div className="sp-page">
        <div className="sp-header">
          <div className="sp-header-left">
            <button className="sp-back-btn" onClick={onClose}><ArrowLeft size={20}/></button>
            <h2>{product ? 'Edit product' : 'Add product'}</h2>
          </div>
          <div className="sp-header-right">
            <button className="sp-btn-discard" onClick={onClose}>Discard</button>
            <button className="sp-btn-save" onClick={handleSubmit}>Save</button>
          </div>
        </div>

        <div className="sp-content">
          <div className="sp-main-col">
            
            {/* Title & Description */}
            <div className="sp-card">
              <div className="sp-form-group">
                <label>Title</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Short sleeve t-shirt" />
              </div>
              <div className="sp-form-group" style={{marginTop: '1.5rem'}}>
                <label>Description</label>
                <div className="sp-rte">
                  <div className="sp-rte-toolbar">
                    <button><Edit2 size={14}/></button>
                    <select><option>Paragraph</option></select>
                    <button className="bold">B</button>
                    <button className="italic">I</button>
                    <button className="underline">U</button>
                    <button>A</button>
                  </div>
                  <textarea rows="8" value={form.description} onChange={e => set('description', e.target.value)}></textarea>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="sp-card">
              <h3>Media</h3>
              <div className="sp-upload-zone">
                <div className="sp-upload-content">
                   <button className="sp-upload-btn">Upload new</button>
                   <span className="sp-upload-text">Select existing</span>
                </div>
                <p className="sp-upload-hint">Accepts images, videos, or 3D models</p>
                {form.image && <div style={{marginTop:'1rem'}}><img src={form.image} height="80" alt="preview"/></div>}
                <input type="text" style={{marginTop:'1rem'}} placeholder="Or enter image URL..." value={form.image} onChange={e => set('image', e.target.value)} className="sp-input"/>
              </div>
            </div>

            {/* Category */}
            <div className="sp-card">
              <h3>Category</h3>
              <select className="sp-input" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Choose a product category</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            {/* Price */}
            <div className="sp-card">
              <h3>Price</h3>
              <div className="sp-grid-2">
                <div className="sp-form-group">
                  <label>Price</label>
                  <div className="sp-input-with-prefix">
                    <span className="prefix">Rs</span>
                    <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0.00" />
                  </div>
                </div>
                <div className="sp-form-group">
                  <label>Compare-at price</label>
                  <div className="sp-input-with-prefix">
                    <span className="prefix">Rs</span>
                    <input type="number" value={form.comparePrice} onChange={e => set('comparePrice', e.target.value)} placeholder="0.00" />
                  </div>
                </div>
              </div>
              <div className="sp-checkbox-row">
                <input type="checkbox" id="charge_tax" defaultChecked />
                <label htmlFor="charge_tax">Charge tax on this product</label>
              </div>
              <div className="sp-divider"></div>
              <div className="sp-grid-3">
                <div className="sp-form-group">
                  <label>Cost per item</label>
                  <div className="sp-input-with-prefix">
                    <span className="prefix">Rs</span>
                    <input type="number" value={form.buyPrice} onChange={e => set('buyPrice', e.target.value)} placeholder="0.00" />
                  </div>
                </div>
                <div className="sp-form-group">
                  <label>Profit</label>
                  <input className="sp-input disabled" value={form.price && form.buyPrice ? `Rs ${(form.price - form.buyPrice).toFixed(2)}` : '--'} disabled />
                </div>
                <div className="sp-form-group">
                  <label>Margin</label>
                  <input className="sp-input disabled" value={form.price && form.buyPrice ? `${Math.round(((form.price - form.buyPrice)/form.price)*100)}%` : '--'} disabled />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="sp-card">
              <div className="sp-card-header">
                <h3>Inventory</h3>
                <div className="sp-toggle-wrap">
                  <label>Inventory tracked</label>
                  <input type="checkbox" className="sp-toggle" defaultChecked />
                </div>
              </div>
              <div className="sp-grid-2" style={{marginTop: '1.5rem'}}>
                 <div className="sp-form-group">
                    <label>Shop location</label>
                    <input type="number" className="sp-input" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="0" />
                 </div>
              </div>
              <div className="sp-filter-row" style={{marginTop: '1.5rem'}}>
                 <span>SKU</span> <span>Barcode</span> <span>Sell when out of stock <span className="sp-badge">Off</span></span>
              </div>
            </div>

            {/* Shipping */}
            <div className="sp-card">
              <div className="sp-card-header">
                <h3>Shipping</h3>
                <div className="sp-toggle-wrap">
                  <label>Physical product</label>
                  <input type="checkbox" className="sp-toggle" defaultChecked />
                </div>
              </div>
              <div className="sp-grid-2" style={{marginTop: '1.5rem'}}>
                 <div className="sp-form-group">
                    <label>Weight</label>
                    <div className="sp-input-with-suffix">
                       <input type="number" placeholder="0.0" />
                       <span className="suffix">kg</span>
                    </div>
                 </div>
              </div>
              <div className="sp-filter-row" style={{marginTop: '1.5rem'}}>
                 <span>Country of origin</span> <span>HS Code</span>
              </div>
            </div>

            {/* Variants */}
            <div className="sp-card">
              <h3>Variants</h3>
              <p className="sp-link-text" style={{marginTop: '0.5rem'}}>+ Add options like size or color</p>
            </div>

            {/* Search engine listing */}
            <div className="sp-card">
               <div className="sp-card-header">
                  <h3>Search engine listing</h3>
                  <button className="sp-btn-icon"><Edit2 size={14}/></button>
               </div>
               <p style={{color: '#666', fontSize: '0.85rem', marginTop: '0.5rem'}}>Add a title and description to see how this product might appear in a search engine listing</p>
            </div>

          </div>

          <div className="sp-side-col">
            {/* Status */}
            <div className="sp-card">
              <h3>Status</h3>
              <select className="sp-input" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Publishing */}
            <div className="sp-card">
              <div className="sp-card-header">
                <h3>Publishing</h3>
              </div>
              <p style={{fontSize: '0.85rem', color: '#333', marginTop: '1rem', display: 'flex', alignItems:'center', gap:'8px'}}>
                <Globe2 size={14} color="#666"/> All channels
              </p>
            </div>

            {/* Product Organization */}
            <div className="sp-card">
              <h3>Product organization</h3>
              <div className="sp-form-group" style={{marginTop: '1.5rem'}}>
                <label>Type</label>
                <select className="sp-input" value={form.type} onChange={e => set('type', e.target.value)}>
                  <option value="None">None</option>
                </select>
              </div>
              <div className="sp-form-group" style={{marginTop: '1rem'}}>
                <label>Vendor</label>
                <select className="sp-input" value={form.vendor} onChange={e => set('vendor', e.target.value)}>
                  <option value="None">None</option>
                </select>
              </div>
              <div className="sp-form-group" style={{marginTop: '1rem'}}>
                <label>Collections</label>
                <div className="sp-input-tag">+ Add collections</div>
              </div>
              <div className="sp-form-group" style={{marginTop: '1rem'}}>
                <label>Tags</label>
                <div className="sp-input-tag">+ Add tags</div>
              </div>
            </div>

            {/* Theme template */}
            <div className="sp-card">
               <h3>Theme template</h3>
               <select className="sp-input" style={{marginTop: '1rem'}}>
                  <option>Default product</option>
               </select>
            </div>

          </div>
        </div>
      </div>
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
