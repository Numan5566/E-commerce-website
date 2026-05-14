import React, { useState, useRef } from 'react';
import {
  Plus, ArrowLeft, Lock, ExternalLink,
  TrendingUp, BarChart3, Eye,
  Activity, FileText, Layers, Settings, Search, Package, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Admin.css';

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

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('admin_auth') === 'true');
  const [passInput, setPassInput] = useState('');
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('admin_password') || 'admin123');
  const [loginStep, setLoginStep] = useState('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPassForm, setNewPassForm] = useState({ p1: '', p2: '' });
  const [activeTab, setActiveTab] = useState('settings');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === adminPassword) { 
      setIsLoggedIn(true); 
      localStorage.setItem('admin_auth', 'true'); 
    } else alert('Incorrect password.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassForm.p1 !== newPassForm.p2) return alert('Passwords do not match');
    setAdminPassword(newPassForm.p1);
    localStorage.setItem('admin_password', newPassForm.p1);
    alert('Password updated successfully! Please login.');
    setLoginStep('login');
    setPassInput('');
  };

  if (!isLoggedIn) return (
    <div className="admin-login-page">
      <motion.div className="admin-login-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="admin-login-logo">
          <div className="admin-logo-icon">L</div>
          <h1>Lumina HQ</h1>
          <p>{loginStep === 'login' ? 'Admin Control Panel' : 'Account Recovery'}</p>
        </div>
        {loginStep === 'login' && (
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="sp-form-group">
              <label>Password</label>
              <input type="password" value={passInput} onChange={e => setPassInput(e.target.value)} placeholder="Enter password..." autoFocus className="sp-input" />
            </div>
            <div style={{textAlign: 'right', marginBottom: '1.5rem'}}>
              <span style={{color: '#7c6af7', fontSize: '0.85rem', cursor: 'pointer'}} onClick={() => setLoginStep('forgot')}>Forgot password?</span>
            </div>
            <button type="submit" className="btn-save" style={{ width: '100%', justifyContent: 'center' }}><Lock size={16} /> Access Panel</button>
          </form>
        )}
        {loginStep === 'forgot' && (
          <div className="admin-login-form">
            <div className="sp-form-group">
               <label>Email</label>
               <input className="sp-input" placeholder="e.g. admin@example.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
            </div>
            <button className="btn-save" style={{width: '100%', marginTop: '1rem'}} onClick={() => setLoginStep('otp')}>Send Code</button>
            <button className="btn-ghost-sm" style={{width: '100%', marginTop: '0.8rem', border: 'none'}} onClick={() => setLoginStep('login')}>Back</button>
          </div>
        )}
        {loginStep === 'otp' && (
          <div className="admin-login-form">
            <div className="sp-form-group"><label>OTP (Try 123456)</label><input className="sp-input" value={otpInput} onChange={e => setOtpInput(e.target.value)} /></div>
            <button className="btn-save" style={{width: '100%', marginTop: '1rem'}} onClick={() => setLoginStep('reset')}>Verify</button>
          </div>
        )}
        {loginStep === 'reset' && (
          <form onSubmit={handleResetPassword} className="admin-login-form">
            <div className="sp-form-group"><label>New Password</label><input type="password" className="sp-input" value={newPassForm.p1} onChange={e => setNewPassForm({...newPassForm, p1: e.target.value})} /></div>
            <button type="submit" className="btn-save" style={{width: '100%', marginTop: '1.5rem'}}>Update</button>
          </form>
        )}
      </motion.div>
    </div>
  );

  const renderSettings = () => {
    const [settForm, setSettForm] = useState({ old: '', n1: '', n2: '' });
    const [showSecret, setShowSecret] = useState(false);
    const [copied, setCopied] = useState('');

    const handleUpdate = (e) => {
      e.preventDefault();
      if (settForm.old !== adminPassword) return alert('Current password incorrect');
      if (settForm.n1 !== settForm.n2) return alert('New passwords do not match');
      setAdminPassword(settForm.n1);
      localStorage.setItem('admin_password', settForm.n1);
      alert('Password updated successfully!');
      setSettForm({ old: '', n1: '', n2: '' });
    };

    const copyToClipboard = (text, key) => {
      navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    };

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="settings-content">
        <div className="page-header-group"><h1>Settings</h1></div>
        <div className="settings-grid">
          <div className="settings-main-col">
            <div className="sp-card dev-card">
              <div className="sp-card-header"><h3>Credentials</h3><a href="#" className="docs-link">Docs <ExternalLink size={14} /></a></div>
              <div className="dev-field">
                <label>Client ID</label>
                <div className="dev-input-group">
                  <input readOnly value="95078e37c1eb69f001212ec2f412a4b6" />
                  <button className="dev-icon-btn" onClick={() => copyToClipboard('95078e37c1eb69f001212ec2f412a4b6', 'client')}>
                    {copied === 'client' ? <span className="copied-text">Copied!</span> : <Package size={16} />}
                  </button>
                </div>
              </div>
              <div className="dev-field" style={{marginTop: '1.5rem'}}>
                <label>Secret</label>
                <div className="dev-input-group">
                  <input type={showSecret ? 'text' : 'password'} readOnly value="********************************" />
                  <button className="dev-icon-btn" onClick={() => setShowSecret(!showSecret)}><Eye size={16} /></button>
                  <button className="dev-icon-btn" onClick={() => copyToClipboard('********************************', 'secret')}>
                    {copied === 'secret' ? <span className="copied-text">Copied!</span> : <Package size={16} />}
                  </button>
                  <button className="dev-btn-danger">Rotate</button>
                </div>
              </div>
            </div>
            <div className="sp-card dev-card"><h3>App automation token</h3><p className="dev-desc">Enable continuous integration and deployment.</p><button className="sp-btn-discard">Create token</button></div>
            <div className="sp-card dev-card"><h3>Contact information</h3><div className="dev-field"><label>API email</label><input readOnly value="luminaminimal@gmail.com" className="sp-input" /></div></div>
            <div className="sp-card dev-card"><h3>Google Cloud Pub/Sub</h3><p className="dev-desc">Recommended for high volume webhooks.</p><input readOnly value="delivery@shopify-pubsub-webhooks.iam.gserviceaccount.com" className="sp-input" /></div>
            <div className="sp-card dev-card"><h3>App icon</h3><div className="dev-upload-section"><div className="dev-upload-box"><Plus size={20} /></div><button className="sp-btn-discard" style={{marginLeft: 'auto'}}>Upload icon</button></div></div>
          </div>
          <div className="settings-side-col">
            <div className="sp-card">
              <h3>Change Password</h3>
              <form onSubmit={handleUpdate} className="admin-login-form">
                <div className="sp-form-group"><label>Current</label><input type="password" className="sp-input" value={settForm.old} onChange={e => setSettForm({...settForm, old: e.target.value})} /></div>
                <div className="sp-form-group" style={{marginTop: '1rem'}}><label>New</label><input type="password" className="sp-input" value={settForm.n1} onChange={e => setSettForm({...settForm, n1: e.target.value})} /></div>
                <button type="submit" className="btn-save" style={{marginTop: '1.5rem', width: '100%'}}>Update</button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderLogs = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header-group"><h1>Logs</h1></div>
      <div className="sp-card" style={{padding: 0}}>
         <table className="admin-table">
            <thead><tr><th>Timestamp</th><th>Level</th><th>Message</th></tr></thead>
            <tbody>
               <tr><td className="text-muted">2026-05-14 20:50:12</td><td><span className="sp-badge active">INFO</span></td><td>System ready</td></tr>
            </tbody>
         </table>
      </div>
    </motion.div>
  );

  const renderMonitoring = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header-group"><h1>Monitoring</h1></div>
      <div className="stats-grid">
         <StatCard icon={<TrendingUp size={20}/>} label="Uptime" value="99.99%" color="rgba(72,187,120,0.15)" />
         <StatCard icon={<BarChart3 size={20}/>} label="Requests" value="1.2k" color="rgba(124,106,247,0.15)" />
      </div>
    </motion.div>
  );

  const renderVersions = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header-group"><h1>Versions</h1></div>
      <div className="sp-card">
         <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0'}}>
            <div><div className="fw-bold">v2.4.0</div><div className="text-muted">Current</div></div>
            <span className="sp-badge active">Active</span>
         </div>
      </div>
    </motion.div>
  );

  const getContent = () => {
    switch (activeTab) {
      case 'monitoring': return renderMonitoring();
      case 'logs': return renderLogs();
      case 'versions': return renderVersions();
      case 'settings': return renderSettings();
      default: return renderSettings();
    }
  };

  const navItems = [
    { id: 'monitoring', label: 'Monitoring', icon: <Activity size={17} /> },
    { id: 'logs', label: 'Logs', icon: <FileText size={17} /> },
    { id: 'versions', label: 'Versions', icon: <Layers size={17} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={17} /> },
  ];

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">L</div>
          <div><div className="sidebar-brand-name">Lumina HQ</div><div className="sidebar-plan">Admin Panel</div></div>
        </div>
        <div className="sidebar-search"><Search size={14} /><span>Search</span></div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              {item.icon}<span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={() => { localStorage.removeItem('admin_auth'); setIsLoggedIn(false); }}><Lock size={16} /> Logout</button>
        </div>
      </div>
      <div className="admin-main"><AnimatePresence mode="wait">{getContent()}</AnimatePresence></div>
    </div>
  );
};

export default AdminDashboard;
