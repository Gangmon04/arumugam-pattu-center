import { useState } from 'react';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'How is the price of my saree calculated?', a: 'We evaluate based on the purity and weight of the silver/gold zari, age of the saree, and current market bullion rates. Our experts test the zari safely in front of you.' },
    { q: 'Do you offer free doorstep pickup?', a: 'Yes! We offer 100% free doorstep pickup across all areas in Chennai. Our executive will come to your home at your preferred time.' },
    { q: 'Is instant cash payment available?', a: 'Absolutely. Once the valuation is done and you agree to the price, we provide instant payment via Cash, GPay, or Bank Transfer immediately on the spot.' },
    { q: 'Do you buy damaged or very old sarees?', a: 'Yes, we buy silk sarees in any condition! Even if the silk is completely torn or damaged, we pay you for the pure zari content present in the borders and pallu.' },
    { q: 'How much time does the valuation take?', a: 'The valuation process takes just 5-10 minutes per saree. We use advanced, non-destructive testing methods to give you an accurate quote instantly.' }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="faq-panel">
      <h3 className="panel-title-sm">FREQUENTLY ASKED QUESTIONS</h3>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item-container ${openFaq === i ? 'open' : ''}`} key={i}>
            <div className="faq-item" onClick={() => toggleFaq(i)}>
              <span>{faq.q}</span>
              <span className="plus">{openFaq === i ? '−' : '+'}</span>
            </div>
            {openFaq === i && (
              <div className="faq-answer">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
