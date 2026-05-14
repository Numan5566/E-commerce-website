import React, { useState, useRef } from 'react';
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

/* ─── Custom Centered Confirm Modal ────────── */
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) => {
  if (!isOpen) return null;
  return (
    <div className="custom-modal-overlay">
      <motion.div 
        className="custom-modal-box"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="custom-modal-header">
          <h3>{title}</h3>
        </div>
        <div className="custom-modal-body">
          <p>{message}</p>
        </div>
        <div className="custom-modal-footer">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className={`btn-confirm ${type}`} onClick={onConfirm}>
            {type === 'danger' ? 'Delete' : 'Confirm'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};


/* ─── Add / Edit Product Page (Shopify Style) ──────────────── */
const ProductModal = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState(product || {
    name: '', category: '', price: '', buyPrice: '',
    tag: '', description: '', supplier: '', stock: '', image: '',
    comparePrice: '', status: 'Active', vendor: 'None', type: 'None'
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState(product?.collections || []);
  const [customVendor, setCustomVendor] = useState('');
  const [variants, setVariants] = useState(product?.variants || []);
  const [newVariantName, setNewVariantName] = useState('');
  const [colors, setColors] = useState(product?.colors || []);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  const ALL_COLLECTIONS = ['New Arrivals', 'Best Sellers', 'Trending Tech', 'Chargers & Gadgets', 'Home Essentials', 'Viral Products'];

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (t) => setTags(prev => prev.filter(x => x !== t));
  const toggleCollection = (c) => setCollections(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const addVariant = () => {
    if (!newVariantName) return;
    setVariants([...variants, { name: newVariantName, values: [] }]);
    setNewVariantName('');
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const addVariantValue = (vIndex, val) => {
    if (!val.trim()) return;
    const updated = [...variants];
    if (!updated[vIndex].values.includes(val.trim())) {
      updated[vIndex].values.push(val.trim());
      setVariants(updated);
    }
  };

  const removeVariantValue = (vIndex, val) => {
    const updated = [...variants];
    updated[vIndex].values = updated[vIndex].values.filter(v => v !== val);
    setVariants(updated);
  };

  const addColor = () => {
    if (!newColorName) return;
    setColors([...colors, { name: newColorName, hex: newColorHex }]);
    setNewColorName('');
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('image', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('image', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price || 0),
      buyPrice: parseFloat(form.buyPrice || 0),
      stock: parseInt(form.stock || 0),
      tags,
      collections,
      variants,
      colors,
      vendor: form.vendor === '__custom__' ? customVendor : form.vendor
    });
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
              {/* Hidden real file input */}
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div
                className={`sp-upload-zone ${dragging ? 'sp-dragging' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => !form.image && fileInputRef.current.click()}
                style={{ cursor: form.image ? 'default' : 'pointer' }}
              >
                {form.image ? (
                  <div className="sp-img-preview">
                    <img src={form.image} alt="Preview" />
                    <div className="sp-img-actions">
                      <button className="sp-upload-btn" onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>Replace image</button>
                      <button className="sp-remove-btn" onClick={e => { e.stopPropagation(); set('image', ''); }}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="sp-upload-icon">🖼️</div>
                    <div className="sp-upload-content">
                      <button className="sp-upload-btn" onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>Upload new</button>
                      <span className="sp-upload-text" onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>Select from files</span>
                    </div>
                    <p className="sp-upload-hint">Drag &amp; drop or click to upload. Accepts images, videos</p>
                  </>
                )}
              </div>
              {/* Optional URL fallback */}
              <div style={{marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span style={{fontSize: '0.8rem', color: '#6d7175', whiteSpace: 'nowrap'}}>Or paste URL:</span>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={form.image && form.image.startsWith('http') ? form.image : ''}
                  onChange={e => set('image', e.target.value)}
                  className="sp-input"
                  style={{flex: 1}}
                />
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
              <div className="sp-card-header">
                <h3>Variants (Size, Material, etc.)</h3>
              </div>
              
              {variants.map((v, vIndex) => (
                <div key={vIndex} className="sp-variant-item" style={{marginTop: '1.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)'}}>
                  <div className="sp-card-header" style={{marginBottom: '0.5rem'}}>
                    <span style={{fontWeight: '600', fontSize: '0.9rem'}}>{v.name}</span>
                    <button className="sp-btn-icon" onClick={() => removeVariant(vIndex)}><Trash2 size={14} color="#f43f5e"/></button>
                  </div>
                  <div className="sp-tags-wrap">
                    {v.values.map(val => (
                      <span key={val} className="sp-tag-chip">
                        {val}
                        <button onClick={() => removeVariantValue(vIndex, val)}>×</button>
                      </span>
                    ))}
                    <input 
                      className="sp-tag-input" 
                      placeholder="Add value..." 
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addVariantValue(vIndex, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="sp-form-group" style={{marginTop: '1.5rem'}}>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <input 
                    className="sp-input" 
                    placeholder="Option name (e.g. Size)" 
                    value={newVariantName}
                    onChange={e => setNewVariantName(e.target.value)}
                  />
                  <button className="sp-btn-save" onClick={addVariant} style={{whiteSpace: 'nowrap'}}>Add Variant</button>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="sp-card">
              <h3>Colors</h3>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem'}}>
                {colors.map((c, i) => (
                  <div key={i} className="sp-color-chip" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)'}}>
                    <div style={{width: '14px', height: '14px', borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.2)'}}></div>
                    <span style={{fontSize: '0.85rem'}}>{c.name}</span>
                    <button onClick={() => removeColor(i)} style={{background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '1.1rem', padding: 0, marginLeft: '0.25rem'}}>×</button>
                  </div>
                ))}
              </div>
              
              <div style={{marginTop: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                <input 
                  type="color" 
                  value={newColorHex} 
                  onChange={e => setNewColorHex(e.target.value)}
                  style={{width: '40px', height: '40px', border: 'none', background: 'none', cursor: 'pointer'}}
                />
                <input 
                  className="sp-input" 
                  placeholder="Color name (e.g. Midnight Blue)" 
                  value={newColorName}
                  onChange={e => setNewColorName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addColor()}
                />
                <button className="sp-btn-save" onClick={addColor}>Add Color</button>
              </div>
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
                  <option value="Electronics">Electronics</option>
                  <option value="Tech Accessories">Tech Accessories</option>
                  <option value="Charging">Charging</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>
              <div className="sp-form-group" style={{marginTop: '1rem'}}>
                <label>Vendor</label>
                <select className="sp-input" value={form.vendor} onChange={e => set('vendor', e.target.value)}>
                  <option value="Lumina Minimal">Lumina Minimal (Your Store)</option>
                  <option value="AliExpress">AliExpress</option>
                  <option value="Amazon">Amazon</option>
                  <option value="__custom__">+ Add Custom Vendor</option>
                </select>
                {form.vendor === '__custom__' && (
                  <input
                    className="sp-input"
                    style={{marginTop: '0.5rem'}}
                    placeholder="Type vendor name..."
                    value={customVendor}
                    onChange={e => setCustomVendor(e.target.value)}
                  />
                )}
              </div>
              <div className="sp-form-group" style={{marginTop: '1rem'}}>
                <label>Collections</label>
                <div className="sp-collection-list">
                  {ALL_COLLECTIONS.map(c => (
                    <label key={c} className={`sp-col-item ${collections.includes(c) ? 'selected' : ''}`}>
                      <input type="checkbox" checked={collections.includes(c)} onChange={() => toggleCollection(c)} />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
              <div className="sp-form-group" style={{marginTop: '1rem'}}>
                <label>Tags</label>
                <div className="sp-tags-wrap">
                  {tags.map(t => (
                    <span key={t} className="sp-tag-chip">
                      {t}
                      <button onClick={() => removeTag(t)}>×</button>
                    </span>
                  ))}
                  <input
                    className="sp-tag-input"
                    placeholder="Type tag & press Enter..."
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                  />
                </div>
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
  const [collections, setCollections] = useState([
    { id: 1, title: 'New Arrivals', products: 12, type: 'Manual' },
    { id: 2, title: 'Best Sellers', products: 8, type: 'Smart' },
    { id: 3, title: 'Trending Tech', products: 15, type: 'Manual' }
  ]);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [viewingCollection, setViewingCollection] = useState(null);
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQ, setSearchQ] = useState('');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, productId: null });
  const [productTab, setProductTab] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);

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

  const askDelete = (id) => setConfirmModal({ isOpen: true, productId: id });
  const confirmDelete = () => {
    deleteProduct(confirmModal.productId);
    setConfirmModal({ isOpen: false, productId: null });
  };

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
          <div className="sp-form-group">
            <label style={{display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem'}}>Password</label>
            <input 
              type="password" 
              value={passInput} 
              onChange={e => setPassInput(e.target.value)} 
              placeholder="Enter admin password..." 
              autoFocus 
              className="sp-input"
              style={{ width: '100%', padding: '12px 16px', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" className="btn-save" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem' }}>
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
    let filtered = products.filter(p => p.name?.toLowerCase().includes(searchQ.toLowerCase()));
    
    if (productTab === 'Active') {
      filtered = filtered.filter(p => !p.status || p.status === 'Active');
    } else if (productTab === 'Draft') {
      filtered = filtered.filter(p => p.status === 'Draft');
    } else if (productTab === 'Archived') {
      filtered = filtered.filter(p => p.status === 'Archived');
    }

    const toggleSelectAll = () => {
      if (selectedIds.length === filtered.length) setSelectedIds([]);
      else setSelectedIds(filtered.map(p => p.id));
    };

    const toggleSelect = (id) => {
      setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-header-group">
          <h1>Products <span className="count-badge">{products.length}</span></h1>
          <button className="btn-save" onClick={openAdd}><Plus size={16} /> Add Product</button>
        </div>

        {/* Top Actions & Tabs */}
        <div className="sp-table-wrapper dashboard-card" style={{padding: 0}}>
          <div className="sp-table-top-bar">
            <div className="sp-table-tabs">
              {['All', 'Active', 'Draft', 'Archived'].map(t => (
                <button 
                  key={t} 
                  className={`sp-tab ${productTab === t ? 'active' : ''}`}
                  onClick={() => setProductTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
               <div className="search-bar" style={{margin: 0, flex: 1, height: '32px', background: 'rgba(255,255,255,0.03)'}}>
                 <Search size={14} />
                 <input placeholder="Search products..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{fontSize: '0.85rem'}} />
               </div>
               <button className="btn-ghost-sm" style={{height: '32px'}}>Export</button>
               <button className="btn-ghost-sm" style={{height: '32px'}}>Import</button>
               <button className="btn-ghost-sm" style={{height: '32px'}}>More actions <ChevronDown size={14}/></button>
            </div>
          </div>

          <table className="admin-table sp-product-table">
            <thead>
              <tr>
                <th style={{width: '40px'}}>
                  <input 
                    type="checkbox" 
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Product</th>
                <th>Status</th>
                <th>Inventory</th>
                <th>Category</th>
                <th>Product type</th>
                <th>Vendor</th>
                <th style={{width: '100px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className={selectedIds.includes(p.id) ? 'selected' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                    />
                  </td>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                      <div className="sp-prod-thumb">
                        {p.image ? <img src={p.image} alt="" /> : <ImageIcon size={18} color="rgba(255,255,255,0.2)"/>}
                      </div>
                      <span className="fw-bold" style={{fontSize: '0.9rem', color: '#fff'}}>{p.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`sp-status-badge ${p.status?.toLowerCase() || 'active'}`}>{p.status || 'Active'}</span>
                  </td>
                  <td>
                    <span style={{color: (p.stock || 0) < 10 ? '#f43f5e' : '#48bb78', fontSize: '0.85rem', fontWeight: '500'}}>
                      {p.stock || 0} in stock
                    </span>
                  </td>
                  <td className="text-muted" style={{fontSize: '0.85rem'}}>{p.category || 'Uncategorized'}</td>
                  <td className="text-muted" style={{fontSize: '0.85rem'}}>{p.type || '--'}</td>
                  <td className="text-muted" style={{fontSize: '0.85rem'}}>{p.vendor || '--'}</td>
                  <td>
                    <div className="sp-action-btns">
                      <button className="action-btn edit" onClick={() => openEdit(p)} title="Edit"><Edit2 size={14}/></button>
                      <button className="action-btn delete" onClick={() => askDelete(p.id)} title="Delete"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" style={{textAlign: 'center', padding: '3rem', color: '#555'}}>No products found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  /* ── COLLECTIONS ── */
  const [newCollTitle, setNewCollTitle] = useState('');
  const [newCollType, setNewCollType] = useState('Manual');

  const handleSaveCollection = () => {
    if (!newCollTitle) return;
    const newColl = {
      id: collections.length + 1,
      title: newCollTitle,
      products: 0,
      type: newCollType
    };
    setCollections([...collections, newColl]);
    setIsAddingCollection(false);
    setNewCollTitle('');
  };

  const renderCollections = () => {
    if (isAddingCollection) return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-header-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="back-btn" onClick={() => setIsAddingCollection(false)}><ArrowLeft size={16} /> Collections</button>
            <h1>Add collection</h1>
          </div>
          <button className="btn-save" onClick={handleSaveCollection}>Save</button>
        </div>

        <div className="sp-add-product-layout">
          <div className="sp-main-col">
            <div className="sp-card">
              <div className="sp-form-group">
                <label>Title</label>
                <input 
                  className="sp-input" 
                  placeholder="e.g. Summer collection, Under $100" 
                  value={newCollTitle}
                  onChange={e => setNewCollTitle(e.target.value)}
                />
              </div>
              <div className="sp-form-group" style={{marginTop: '1.5rem'}}>
                <label>Description</label>
                <div className="sp-rte" style={{minHeight: '150px', background: 'rgba(255,255,255,0.02)', padding: '1rem'}}>
                   <p style={{color: '#555'}}>Type your collection description here...</p>
                </div>
              </div>
            </div>

            <div className="sp-card">
              <h3>Collection type</h3>
              <div style={{marginTop: '1rem'}}>
                <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem'}}>
                  <input type="radio" name="collType" checked={newCollType === 'Manual'} onChange={() => setNewCollType('Manual')} style={{marginTop: '4px'}} />
                  <div>
                    <div className="fw-bold" style={{fontSize: '0.9rem'}}>Manual</div>
                    <p className="text-muted" style={{fontSize: '0.8rem'}}>Add products to this collection one by one.</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                  <input type="radio" name="collType" checked={newCollType === 'Smart'} onChange={() => setNewCollType('Smart')} style={{marginTop: '4px'}} />
                  <div>
                    <div className="fw-bold" style={{fontSize: '0.9rem'}}>Smart</div>
                    <p className="text-muted" style={{fontSize: '0.8rem'}}>Existing and future products that match conditions will be added automatically.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sp-card">
              <div className="sp-card-header">
                <h3>Products</h3>
                <button className="btn-ghost-sm">Browse</button>
              </div>
              <div className="search-bar" style={{marginTop: '1rem', background: 'rgba(255,255,255,0.03)'}}>
                <Search size={14} />
                <input placeholder="Search products..." />
              </div>
              <div style={{textAlign: 'center', padding: '3rem', color: '#555'}}>
                <ImageIcon size={40} style={{opacity: 0.2, marginBottom: '1rem'}} />
                <p>There are no products in this collection.</p>
              </div>
            </div>
          </div>

          <div className="sp-side-col">
            <div className="sp-card">
              <div className="sp-card-header">
                <h3>Publishing</h3>
                <span style={{color: '#7c6af7', fontSize: '0.8rem', cursor: 'pointer'}}>Manage</span>
              </div>
              <div style={{marginTop: '1rem', fontSize: '0.85rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#48bb78'}}></div>
                  Online Store
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', color: '#555'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#555'}}></div>
                  Point of Sale
                </div>
              </div>
            </div>

            <div className="sp-card">
               <h3>Collection image</h3>
               <div className="sp-upload-zone" style={{height: '140px', marginTop: '1rem'}}>
                  <ImageIcon size={24} style={{opacity: 0.3}} />
                  <p style={{fontSize: '0.8rem', marginTop: '0.5rem'}}>Add image</p>
               </div>
            </div>

            <div className="sp-card">
               <h3>Theme template</h3>
               <select className="sp-input" style={{marginTop: '1rem'}}>
                  <option>Default collection</option>
               </select>
            </div>
          </div>
        </div>
      </motion.div>
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="page-header-group">
          <h1>Collections <span className="count-badge">{collections.length}</span></h1>
          <button className="btn-save" onClick={() => setIsAddingCollection(true)}>Add collection</button>
        </div>

        <div className="sp-table-wrapper dashboard-card" style={{padding: 0}}>
           <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
               <div className="search-bar" style={{margin: 0, flex: 1, height: '32px', background: 'rgba(255,255,255,0.03)'}}>
                 <Search size={14} />
                 <input placeholder="Search collections..." />
               </div>
            </div>
            <table className="admin-table">
               <thead>
                  <tr>
                    <th style={{width: '40px'}}><input type="checkbox"/></th>
                    <th style={{width: '60px'}}></th>
                    <th>Title</th>
                    <th>Products</th>
                    <th>Product conditions</th>
                  </tr>
               </thead>
               <tbody>
                  {collections.map(c => (
                    <tr key={c.id}>
                      <td><input type="checkbox"/></td>
                      <td>
                        <div className="sp-prod-thumb"><ImageIcon size={14} style={{opacity: 0.3}} /></div>
                      </td>
                      <td className="fw-bold" style={{color: '#fff'}}>{c.title}</td>
                      <td>{c.products}</td>
                      <td className="text-muted" style={{fontSize: '0.85rem'}}>{c.type === 'Manual' ? 'Manual' : 'Product title contains...'}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
        </div>
      </motion.div>
    );
  };
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
      case 'collections': return renderCollections();
      case 'customers': return renderCustomers();
      case 'store': return <Home />;
      default: return renderHome();
    }
  };

  const navItems = [
    { id: 'home', label: 'Store Overview', icon: <HomeIcon size={17} /> },
    { id: 'orders', label: 'Orders', icon: <Inbox size={17} />, badge: orders.filter(o => o.status === 'pending').length },
    { id: 'products', label: 'Products', icon: <Tag size={17} />, badge: products.length },
    { id: 'collections', label: 'Collections', icon: <BarChart3 size={17} /> },
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

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={() => confirmDelete(confirmModal.productId)}
        onCancel={() => setConfirmModal({ isOpen: false, productId: null })}
      />
    </div>
  );
};

export default AdminDashboard;
