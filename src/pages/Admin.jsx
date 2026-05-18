import React, { useState, useEffect } from 'react';
import {
  Plus, LayoutDashboard, ShoppingCart, 
  Package, Users, Settings, LogOut,
  TrendingUp, MapPin, 
  Search, Filter, MoreVertical,

  CheckCircle, Clock, AlertCircle,
  BarChart3, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import './Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('admin_auth') === 'true');
  const [passInput, setPassInput] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, formatPrice, deleteProduct, updateProduct, addCustomProduct } = useShop();

  // Mock Orders for US Market
  const [orders] = useState([
    { id: '#US-9021', customer: 'Jonathan K.', city: 'New York', total: 125, status: 'Delivered', date: '2026-05-14' },
    { id: '#US-9022', customer: 'Sarah M.', city: 'Los Angeles', total: 85, status: 'Processing', date: '2026-05-14' },
    { id: '#US-9023', customer: 'Michael R.', city: 'Austin', total: 320, status: 'Shipped', date: '2026-05-13' },
    { id: '#US-9024', customer: 'Emma W.', city: 'Miami', total: 45, status: 'Delivered', date: '2026-05-13' },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_auth', 'true');
    } else alert('Access Denied');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isLoggedIn) return (
    <div className="admin-login-v3">
      <motion.div className="login-card-v3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="login-header-v3">
          <div className="login-logo-v3">L</div>
          <h1>Lumina US Admin</h1>
          <p>Secure Enterprise Portal</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group-v3">
            <label>Master Password</label>
            <input type="password" placeholder="••••••••" value={passInput} onChange={e => setPassInput(e.target.value)} autoFocus />
          </div>
          <button type="submit" className="login-btn-v3">Authenticate Access</button>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="admin-root-v3">
      {/* ─── SIDEBAR ─── */}
      <aside className="admin-sidebar-v3">
        <div className="sidebar-head-v3">
          <div className="sidebar-logo-v3">L</div>
          <div>
            <h3>Lumina HQ</h3>
            <span>US Division</span>
          </div>
        </div>

        <nav className="sidebar-nav-v3">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={18} /> Orders
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            <Package size={18} /> Inventory
          </button>
          <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>
            <Users size={18} /> Customers
          </button>
          <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={18} /> Analytics
          </button>
        </nav>

        <div className="sidebar-foot-v3">
          <button onClick={handleLogout} className="logout-btn-v3">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="admin-main-v3">
        <header className="main-header-v3">
          <div className="header-search-v3">
            <Search size={18} />
            <input type="text" placeholder="Search orders, products, customers..." />
          </div>
          <div className="header-actions-v3">
             <div className="region-badge-v3"><Globe size={14}/> US MARKET LIVE</div>
             <div className="admin-user-v3">Admin User</div>
          </div>
        </header>

        <div className="admin-content-v3">
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="stats-grid-v3">
                <div className="stat-v3">
                  <div className="stat-icon-v3" style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37' }}><TrendingUp size={24}/></div>
                  <div className="stat-info-v3">
                    <label>Daily Sales</label>
                    <h3>{formatPrice(12450)}</h3>
                    <span className="trend-up">+12.5% from yesterday</span>
                  </div>
                </div>
                <div className="stat-v3">
                  <div className="stat-icon-v3" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}><ShoppingCart size={24}/></div>
                  <div className="stat-info-v3">
                    <label>Active Orders</label>
                    <h3>18</h3>
                    <span className="trend-up">4 pending New York</span>
                  </div>
                </div>
                <div className="stat-v3">
                  <div className="stat-icon-v3" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}><Package size={24}/></div>
                  <div className="stat-info-v3">
                    <label>In Stock</label>
                    <h3>142</h3>
                    <span>Across 8 categories</span>
                  </div>
                </div>
                <div className="stat-v3">
                  <div className="stat-icon-v3" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}><MapPin size={24}/></div>
                  <div className="stat-info-v3">
                    <label>Top Region</label>
                    <h3>New York</h3>
                    <span>45% of total sales</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid-v3">
                <div className="card-v3 orders-card">
                  <div className="card-header-v3">
                    <h3>Recent US Orders</h3>
                    <button className="btn-v3">View All</button>
                  </div>
                  <table className="table-v3">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Location</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className="fw-800">{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.city}</td>
                          <td className="fw-700">{formatPrice(order.total)}</td>
                          <td>
                            <span className={`badge-v3 ${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card-v3 inventory-summary">
                   <div className="card-header-v3">
                     <h3>Inventory Alerts</h3>
                   </div>
                   <div className="alert-list-v3">
                     <div className="alert-item-v3">
                       <AlertCircle size={16} color="#ef4444" />
                       <div>
                         <p>PowerStation Pro is Low Stock</p>
                         <span>Only 3 units left in NY warehouse</span>
                       </div>
                     </div>
                     <div className="alert-item-v3">
                       <CheckCircle size={16} color="#10b981" />
                       <div>
                         <p>Restock Successful</p>
                         <span>Titanium Chargers updated</span>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <div className="card-v3">
              <div className="card-header-v3">
                <h2>All Orders</h2>
                <div className="table-filters">
                   <button className="btn-outline-v3"><Filter size={14}/> Filter</button>
                </div>
              </div>
              <table className="table-v3">
                 <thead>
                   <tr>
                     <th>Order ID</th>
                     <th>Date</th>
                     <th>Customer</th>
                     <th>City</th>
                     <th>Amount</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {orders.map(order => (
                     <tr key={order.id}>
                       <td>{order.id}</td>
                       <td>{order.date}</td>
                       <td>{order.customer}</td>
                       <td>{order.city}</td>
                       <td>{formatPrice(order.total)}</td>
                       <td><span className={`badge-v3 ${order.status.toLowerCase()}`}>{order.status}</span></td>
                       <td><button className="icon-btn-v3"><MoreVertical size={16}/></button></td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="card-v3">
              <div className="card-header-v3">
                <h2>Product Catalog</h2>
                <button className="btn-primary-v3"><Plus size={16}/> Add New Product</button>
              </div>
              <div className="product-admin-grid">
                {products.map(p => (
                  <div key={p.id} className="product-admin-item">
                     <img src={p.image} alt={p.name} />
                     <div className="pai-info">
                       <h4>{p.name}</h4>
                       <p>{formatPrice(p.price)}</p>
                       <div className="pai-actions">
                         <button className="btn-sm-outline">Edit</button>
                         <button className="btn-sm-danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
