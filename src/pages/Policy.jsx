import React from 'react';
import { useLocation } from 'react-router-dom';
import './Pages.css';

const Policy = () => {
  const { pathname } = useLocation();
  const title = pathname.includes('privacy') ? 'Privacy Policy' : pathname.includes('terms') ? 'Terms of Service' : 'About Us';

  return (
    <div className="page-container container narrow-page">
      <div className="page-header center">
        <h1 className="page-title">{title}</h1>
      </div>
      
      <div className="policy-content">
        <p>Last updated: May 14, 2026</p>
        <p>This is a standard template page for {title}. In a real production environment, you would insert your actual legal jargon or company information here.</p>
        <h3>1. Introduction</h3>
        <p>Welcome to Lumina Minimal. We value your trust and strive to provide the most transparent and premium experience possible.</p>
        <h3>2. Terms & Conditions</h3>
        <p>By using our website, you agree to these terms. All purchases are processed securely, and data is protected.</p>
      </div>
    </div>
  );
};

export default Policy;
