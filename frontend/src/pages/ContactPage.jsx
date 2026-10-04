import { useState } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Store, 
  Calendar, 
  Plus, 
  Minus,
  ExternalLink
} from 'lucide-react';
import siteData from '../data/siteData.json';
import '../styles/ContactPage.css';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeBranch, setActiveBranch] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openWhatsApp = (customText) => {
    const text = customText || 'Hello Arumugam Pattu Center! I would like to enquire about selling my old pattu sarees.';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://api.whatsapp.com/send?phone=${siteData.whatsapp}&text=${encodeURIComponent(text)}`
      : `https://web.whatsapp.com/send?phone=${siteData.whatsapp}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const scrollToPickup = () => {
    const formEl = document.getElementById('pickup-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const nameInput = document.getElementById('customerName');
      if (nameInput) nameInput.focus();
    }
  };

  const scrollToLocations = () => {
    const locEl = document.getElementById('locations');
    if (locEl) {
      locEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'How is the value of my saree determined?',
      a: 'We evaluate based on the purity and weight of the silver/gold zari, age of the saree, and current market bullion rates. Our experts test the zari safely in front of you with complete transparency.'
    },
    {
      q: 'Is the pickup service free?',
      a: 'Yes, absolutely! We offer 100% free doorstep pickup across all areas in Chennai with zero inspection fees or hidden deductions, even if you decide not to sell.'
    },
    {
      q: 'Do you buy damaged or old sarees?',
      a: 'Yes, we buy silk sarees in any condition! Even if your saree is torn, stained, antique, or damaged, you get paid for the precious silver and gold zari content present in the borders and pallu.'
    },
    {
      q: 'How quickly will I be contacted after booking?',
      a: 'Our executive will call or WhatsApp you within 15 to 30 minutes of receiving your booking during business hours (9:00 AM – 8:00 PM) to confirm your convenient pickup time.'
    },
    {
      q: 'Is instant payment really available?',
      a: 'Yes! Once our expert completes the valuation and you approve the price, we initiate instant payment on the spot via Cash, UPI (GPay/PhonePe), or direct bank transfer.'
    },
    {
      q: 'Which areas do you serve?',
      a: 'We provide doorstep pickup all over Chennai including T. Nagar, Anna Nagar, Adyar, Mylapore, Velachery, Kilpauk, Nungambakkam, Tambaram, Porur, and all surrounding areas.'
    }
  ];

  return (
    <div className="app-container contact-page-wrapper">
      <Navbar />

      {/* ── 1. Hero Header: GET IN TOUCH ──────────────────────── */}
      <section className="contact-hero-banner">
        {/* Decorative corner mandalas */}
        <div className="mandala-watermark watermark-top-left" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor">
            <circle cx="100" cy="100" r="80" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="100" cy="100" r="60" strokeWidth="1"/>
            <circle cx="100" cy="100" r="40" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M100 20 Q120 70 100 100 Q80 70 100 20Z" strokeWidth="1"/>
            <path d="M100 180 Q120 130 100 100 Q80 130 100 180Z" strokeWidth="1"/>
            <path d="M20 100 Q70 120 100 100 Q70 80 20 100Z" strokeWidth="1"/>
            <path d="M180 100 Q130 120 100 100 Q130 80 180 100Z" strokeWidth="1"/>
            <circle cx="100" cy="100" r="16" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="mandala-watermark watermark-top-right" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor">
            <circle cx="100" cy="100" r="80" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="100" cy="100" r="60" strokeWidth="1"/>
            <circle cx="100" cy="100" r="40" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M100 20 Q120 70 100 100 Q80 70 100 20Z" strokeWidth="1"/>
            <path d="M100 180 Q120 130 100 100 Q80 130 100 180Z" strokeWidth="1"/>
            <path d="M20 100 Q70 120 100 100 Q70 80 20 100Z" strokeWidth="1"/>
            <path d="M180 100 Q130 120 100 100 Q130 80 180 100Z" strokeWidth="1"/>
            <circle cx="100" cy="100" r="16" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="contact-hero-content">
          <h1 className="contact-main-heading">GET IN TOUCH</h1>
          
          <div className="gold-ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line"></span>
          </div>

          <p className="contact-hero-subtitle">
            We are here to help you. Reach out to us for any queries or book your free pickup instantly.
          </p>

          <div className="contact-hero-actions">
            <a href={`tel:${siteData.phones[0].replace(/\s+/g, '')}`} className="btn-hero-call">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            
            <button onClick={() => openWhatsApp()} className="btn-hero-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Two-Column Main Content (Cards + Booking Form) ─── */}
      <section className="contact-main-grid-container">
        <div className="contact-main-grid">
          
          {/* Left Column: Contact Cards */}
          <div className="contact-cards-stack">
            
            {/* Card 1: Call Us */}
            <div className="info-card">
              <div className="info-icon-badge purple-badge">
                <Phone size={20} />
              </div>
              <div className="info-card-text">
                <h3 className="info-card-title">Call Us</h3>
                <div className="phone-numbers-list">
                  {siteData.phones.map((phone, idx) => (
                    <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="phone-number-link">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Email Us */}
            <div className="info-card">
              <div className="info-icon-badge purple-badge">
                <Mail size={20} />
              </div>
              <div className="info-card-text">
                <h3 className="info-card-title">Email Us</h3>
                <a href={`mailto:${siteData.email}`} className="info-card-description email-link">
                  {siteData.email}
                </a>
              </div>
            </div>

            {/* Card 3: Business Hours */}
            <div className="info-card">
              <div className="info-icon-badge purple-badge">
                <Clock size={20} />
              </div>
              <div className="info-card-text">
                <h3 className="info-card-title">Business Hours</h3>
                <p className="info-card-description">
                  9:00 AM – 8:00 PM <br />
                  <strong className="hours-highlight">Monday to Sunday</strong>
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: "BOOK YOUR FREE PICKUP" Card */}
          <div className="contact-form-column">
            <Contact />
          </div>

        </div>
      </section>

      {/* ── 3. Dedicated Section: OUR STORE LOCATIONS (Centered Card with Switch Branch) ── */}
      <section className="store-locations-section" id="locations">
        <div className="section-header-block">
          <h2 className="section-title-purple">OUR STORE LOCATIONS</h2>
          <div className="gold-ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line"></span>
          </div>
          <p className="section-subtitle-muted">
            Visit our branches directly for instant on-the-spot evaluation, transparent testing & instant cash payout.
          </p>
        </div>

        <div className="store-location-centered-wrapper">
          <div className="store-location-centered-card">
            
            {/* Branch Switcher Tabs */}
            <div className="branch-switch-tabs" role="tablist" aria-label="Store branches">
              {siteData.locations.map((loc, idx) => (
                <button
                  key={loc.id || idx}
                  type="button"
                  role="tab"
                  aria-selected={activeBranch === idx}
                  className={`branch-switch-btn ${activeBranch === idx ? 'active' : ''}`}
                  onClick={() => setActiveBranch(idx)}
                >
                  <Store size={16} />
                  <span>{loc.area || loc.name}</span>
                </button>
              ))}
            </div>

            {/* Active Branch Content */}
            {siteData.locations[activeBranch] && (
              <div className="active-branch-container">
                <div className="active-branch-top-bar">
                  <div className="active-branch-heading-group">
                    <div className="active-branch-badge-icon">
                      <Store size={22} />
                    </div>
                    <div className="active-branch-text">
                      <h3 className="active-branch-title">{siteData.locations[activeBranch].name}</h3>
                      <p className="active-branch-address">{siteData.locations[activeBranch].address}</p>
                    </div>
                  </div>

                  <a 
                    href={siteData.locations[activeBranch].mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-store-directions"
                    title={`Open ${siteData.locations[activeBranch].name} in Google Maps`}
                  >
                    <ExternalLink size={14} />
                    <span>Get Directions</span>
                  </a>
                </div>

                {/* Embedded Interactive Live Google Map */}
                <div className="store-branch-map-wrapper">
                  <iframe
                    src={siteData.locations[activeBranch].embedUrl}
                    title={`Google Maps - ${siteData.locations[activeBranch].name}`}
                    className="store-branch-iframe"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="store-branch-footer">
                  <div className="store-branch-timing">
                    <Clock size={15} />
                    <span>Mon – Sun: 9:00 AM – 8:00 PM</span>
                  </div>
                  <div className="store-branch-badge">
                    <span>Walk-ins Welcome</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── 4. Section: FREQUENTLY ASKED QUESTIONS ─────────────── */}
      <section className="faq-full-section">
        <div className="section-header-block">
          <h2 className="section-title-purple">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="gold-ornament-divider">
            <span className="ornament-line"></span>
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line"></span>
          </div>
        </div>

        <div className="faq-two-col-grid">
          {/* Left Column (0, 1, 2) */}
          <div className="faq-col">
            {faqs.slice(0, 3).map((faq, i) => (
              <div 
                className={`faq-accordion-card ${openFaq === i ? 'open' : ''}`} 
                key={i}
                onClick={() => toggleFaq(i)}
              >
                <div className="faq-header-row">
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle-icon">
                    {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </div>
                {openFaq === i && (
                  <div className="faq-answer-block">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column (3, 4, 5) */}
          <div className="faq-col">
            {faqs.slice(3, 6).map((faq, i) => {
              const actualIdx = i + 3;
              return (
                <div 
                  className={`faq-accordion-card ${openFaq === actualIdx ? 'open' : ''}`} 
                  key={actualIdx}
                  onClick={() => toggleFaq(actualIdx)}
                >
                  <div className="faq-header-row">
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      {openFaq === actualIdx ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </div>
                  {openFaq === actualIdx && (
                    <div className="faq-answer-block">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Section: CTA Banner ─────────────────────────────── */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <div className="cta-banner-image-wrapper">
            <img 
              src="/assets/images/cta_saree_banner.jpg" 
              alt="Rich Kanchipuram Silk Saree" 
              className="cta-banner-img" 
            />
          </div>

          <div className="cta-banner-content">
            <h3 className="cta-banner-heading">Turn Your Old Sarees Into Instant Value Today!</h3>
            <p className="cta-banner-subtitle">
              Fast valuation. Free pickup. Trusted service you can rely on.
            </p>
          </div>

          <div className="cta-banner-buttons">
            <a href={`tel:${siteData.phones[0].replace(/\s+/g, '')}`} className="btn-cta-call">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            <button onClick={scrollToPickup} className="btn-cta-pickup">
              <Calendar size={18} />
              <span>Book Free Pickup</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. Footer ─────────────────────────────────────────── */}
      <Footer />

      {/* ── Floating WhatsApp Button ──────────────────────────── */}
      <button 
        onClick={() => openWhatsApp()}
        className="whatsapp-float"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="whatsapp-icon">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </button>
    </div>
  );
}
