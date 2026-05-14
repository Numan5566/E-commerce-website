import React from 'react';
import './Pages.css';

const FAQ = () => {
  const faqs = [
    { q: "What is your return policy?", a: "We offer a 100-day hassle-free return policy. If you're not satisfied, return the product for a full refund." },
    { q: "Do you ship worldwide?", a: "Yes! We ship globally. Free standard shipping applies to all orders over $50." },
    { q: "How long does delivery take?", a: "US domestic orders take 3-5 business days. International orders typically take 7-14 business days." },
    { q: "Are your products under warranty?", a: "Absolutely. All Lumina products come with a lifetime warranty against manufacturing defects." }
  ];

  return (
    <div className="page-container container narrow-page">
      <div className="page-header center">
        <h1 className="page-title">Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services.</p>
      </div>
      
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
