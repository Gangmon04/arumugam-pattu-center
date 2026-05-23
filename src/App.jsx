import { useState } from 'react';
import { Camera, Search, Truck, HandCoins, BadgeCheck, Clock, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, UploadCloud, MapPin, Mail, Phone, Calendar, ArrowRight, Star, Menu, X } from 'lucide-react';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');
  const [reviewIdx, setReviewIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [coords, setCoords] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openWhatsAppChat = (e) => {
    e.preventDefault();
    const phone = '918072575135';
    const text = 'Hello Arumugam Pattu Center! I have an inquiry regarding my old pattu saree.';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const url = isMobile 
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
      
    window.open(url, '_blank');
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          alert("Unable to retrieve your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const locationLink = coords ? `\n- *Map Link:* https://maps.google.com/?q=${coords.lat},${coords.lng}` : '';

    const message = `Hello Arumugam Pattu Center! I would like to schedule a free pickup.
    
*Booking Details:*
- *Name:* ${data.customerName}
- *Phone:* ${data.phone}
- *Location:* ${data.location}${locationLink}
- *Saree Type:* ${data.sareeType}
- *Preferred Time:* ${data.pickupTime}

Please confirm my booking.`;

    const whatsappUrl = `https://wa.me/8072575135?text=${encodeURIComponent(message)}`;

    setBookingStatus('submitting');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setBookingStatus('success');
      e.target.reset();
      setSelectedFile(null);
      setTimeout(() => setBookingStatus(''), 5000);
    }, 800);
  };

  const reviews = [
    { name: 'Priya, Alwarpet', review: 'Very genuine and transparent service. Got the best price for my old pattu saree.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Nithya, Nungambakkam', review: 'Free doorstep pickup and instant payment. Highly recommended!', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { name: 'Aishwarya, Besant Nagar', review: 'Professional and quick service. Trusted buyers in Chennai.', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
    { name: 'Divya, Kilpauk', review: 'I was surprised by how much I got for my grandmother’s old silk. Truly the best in the market!', avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
    { name: 'Saraswathi, West Mambalam', review: 'The valuation process was completely transparent. They explained the zari quality clearly before quoting.', avatar: 'https://randomuser.me/api/portraits/women/48.jpg' },
    { name: 'Ananya, Thiruvanmiyur', review: 'Excellent customer service. They came to my house within hours and gave me instant cash. Very convenient.', avatar: 'https://randomuser.me/api/portraits/women/49.jpg' }
  ];

  const nextReviews = () => {
    setReviewIdx((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
  };

  const prevReviews = () => {
    setReviewIdx((prev) => (prev - 3 < 0 ? Math.max(0, reviews.length - 3) : prev - 3));
  };

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

  const getText = (en, ta) => (lang === 'en' ? en : ta);

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src="/download (2).png" alt="Arumugam Pattu Center" className="logo-img" />
        </div>
        
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>HOME</a></li>
          <li><a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>HOW IT WORKS</a></li>
          <li><a href="#why-us" onClick={() => setMobileMenuOpen(false)}>WHY US</a></li>
          <li><a href="#saree-types" onClick={() => setMobileMenuOpen(false)}>SAREE TYPES</a></li>
          <li><a href="#reviews" onClick={() => setMobileMenuOpen(false)}>REVIEWS</a></li>
          <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</a></li>
        </ul>
        {/* <div className="nav-actions">
          <button className="btn-sell-now">Sell Now</button>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
          </div>
        </div> */}
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="hero-left">
          <img src="/images/hero_saree_lavender.png" alt="Pattu Saree" className="hero-image" />
        </div>
        <div className="hero-right">
          <h1 className="hero-title">
            Sell Your <br />
            <span>Old Pattu Sarees</span> <br />
            at Best Price
          </h1>
          <p className="hero-subtitle">
            Chennai's most trusted destination for buying old silk sarees. Get the best value with free doorstep pickup and instant cash.
          </p>
          <div className="hero-buttons">
            <a href="tel:+918072575135" className="btn-primary-dark" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Phone size={18} /> Call Now
            </a>
            <a href="#contact" className="btn-outline-dark" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Calendar size={18} /> Book Free Pickup
            </a>
          </div>
          <div className="trust-banner">
            <div className="trust-stat">
              <ShieldCheck className="trust-icon" />
              <div>
                <h4>40+</h4>
                <p>Years Experience</p>
              </div>
            </div>
            <div className="trust-stat">
              <HandCoins className="trust-icon" />
              <div>
                <h4>5,000+</h4>
                <p>Sarees Purchased</p>
              </div>
            </div>
            <div className="trust-stat">
              <Star className="trust-icon" />
              <div>
                <h4>4.9★</h4>
                <p>Google Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS & WHY CHOOSE US */}
      <section className="split-section" id="how-it-works">
        {/* How It Works */}
        <div className="how-it-works-panel">
          <div className="section-title-wrapper">
            <h3 className="panel-title">HOW IT WORKS</h3>
            <div className="title-ornament"></div>
          </div>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-icon-circle"><Camera size={24} /></div>
              <div className="step-number">1</div>
              <h4>Upload Photos</h4>
              <p>Upload clear photos of your saree</p>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-icon-circle"><Search size={24} /></div>
              <div className="step-number">2</div>
              <h4>Get Instant Quote</h4>
              <p>We evaluate and give best price instantly</p>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-icon-circle"><Truck size={24} /></div>
              <div className="step-number">3</div>
              <h4>Free Pickup</h4>
              <p>We pickup your saree from your doorstep</p>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-icon-circle"><HandCoins size={24} /></div>
              <div className="step-number">4</div>
              <h4>Instant Cash</h4>
              <p>Get instant cash on the spot</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-us-panel" id="why-us">
          <div className="section-title-wrapper">
            <h3 className="panel-title">WHY CHOOSE US</h3>
            <div className="title-ornament"></div>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <BadgeCheck className="feature-icon" />
              <div>
                <h4>Best Market Price</h4>
                <p>We offer the highest price in Chennai</p>
              </div>
            </div>
            <div className="feature-item">
              <Clock className="feature-icon" />
              <div>
                <h4>Same Day Pickup</h4>
                <p>Quick and convenient doorstep service</p>
              </div>
            </div>
            <div className="feature-item">
              <HandCoins className="feature-icon" />
              <div>
                <h4>Instant Payment</h4>
                <p>Get instant cash without any delays</p>
              </div>
            </div>
            <div className="feature-item">
              <ShieldCheck className="feature-icon" />
              <div>
                <h4>Trusted Since 1980</h4>
                <p>40+ years of trust and expertise</p>
              </div>
            </div>
            <div className="feature-item">
              <Search className="feature-icon" />
              <div>
                <h4>Expert Zari Evaluation</h4>
                <p>Pure zari experts for accurate valuation</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle2 className="feature-icon" />
              <div>
                <h4>Safe & Transparent</h4>
                <p>100% safe and transparent process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAREE TYPES WE BUY */}
      <section className="saree-types-section" id="saree-types">
        <div className="section-title-wrapper">
          <h2 className="panel-title">SAREE TYPES WE BUY</h2>
          <div className="title-ornament"></div>
        </div>
        <div className="saree-grid">
          {[
            { img: 'kanchi.png', title: 'Pure Kanchipuram Silk Sarees' },
            { img: 'bridal.png', title: 'Bridal Pattu Sarees' },
            { img: 'antique.png', title: 'Antique Zari Sarees' },
            { img: 'temple.png', title: 'Temple Border Sarees' },
            { img: 'designer.png', title: 'Designer Silk Sarees' },
            { img: 'damaged.png', title: 'Old / Damaged Silk Sarees' }
          ].map((saree, idx) => (
            <div className="saree-card" key={idx}>
              <img src={`/images/${saree.img}`} alt={saree.title} className="saree-card-img" />
              <div className="saree-card-banner">{saree.title}</div>
            </div>
          ))}
        </div>
      </section>



      {/* CUSTOMER REVIEWS */}
      <section className="reviews-section" id="reviews">
        <div className="section-title-wrapper">
          <h2 className="panel-title">WHAT OUR CUSTOMERS SAY</h2>
          <div className="title-ornament"></div>
        </div>
        <div className="reviews-carousel">
          <button className="nav-arrow" onClick={prevReviews}><ChevronLeft /></button>
          <div className="reviews-grid">
            {reviews.slice(reviewIdx, reviewIdx + 3).map((r, i) => (
              <div className="review-card" key={reviewIdx + i}>
                <div className="stars">★★★★★</div>
                <p className="review-text">"{r.review}"</p>
                <div className="review-author">
                  <img src={r.avatar} alt={r.name} className="author-avatar" />
                  <span>— {r.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-arrow" onClick={nextReviews}><ChevronRight /></button>
        </div>
        <div className="carousel-dots">
          {[0, 1].map((dotIndex) => (
            <span 
              key={dotIndex} 
              className={`dot ${reviewIdx === dotIndex * 3 ? 'active' : ''}`}
              onClick={() => setReviewIdx(dotIndex * 3)}
            ></span>
          ))}
        </div>
      </section>

      {/* UNUSED SAREE & COVERAGE */}
      <section className="split-section">
        {/* Unused Saree */}
        <div className="unused-saree-panel">
          <h3 className="panel-title-sm">YOUR UNUSED SAREE<br />CAN BECOME INSTANT CASH</h3>
          <div className="unused-visual">
            <div className="visual-card">
              <img src="/images/old_saree.png" alt="Old Saree" />
              <div className="visual-label">OLD SAREE</div>
            </div>
            <ArrowRight size={32} className="visual-arrow" />
            <div className="visual-card">
              <img src="/images/instant_cash.png" alt="Instant Cash" />
              <div className="visual-label cash-label">INSTANT CASH</div>
            </div>
          </div>
          <p className="unused-desc">Don't let your precious sarees stay unused.<br />We give them the value they deserve!</p>
        </div>

        {/* Coverage */}
        <div className="coverage-panel">
          <h3 className="panel-title-sm">OUR SERVICE COVERAGE<br />WE SERVE ALL OVER CHENNAI</h3>
          <div className="coverage-content">
            <img src="/images/map.png" alt="Chennai Map" className="map-img" />
            <div className="coverage-locations">
              {['T Nagar', 'Adyar', 'Anna Nagar', 'Porur', 'Velachery', 'Ambattur', 'Tambaram', 'Chromepet'].map(loc => (
                <div className="loc-chip" key={loc}>
                  <CheckCircle2 size={14} className="loc-icon" /> {loc}
                </div>
              ))}
              <div className="loc-chip more">And Many More Areas...</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & BOOKING */}
      <section className="split-section" id="contact">
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
        <div className="booking-panel">
          <h3 className="panel-title-sm">BOOK YOUR FREE PICKUP NOW</h3>
          
          {bookingStatus === 'success' ? (
            <div className="booking-success" style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-cream)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={48} color="var(--primary-color)" style={{ marginBottom: '16px' }} />
              <h4 style={{ color: 'var(--text-dark)', marginBottom: '8px', fontSize: '1.2rem' }}>Pickup Scheduled Successfully!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Our executive will contact you shortly to confirm the exact time.</p>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="customerName" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="Enter phone number" required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <input type="text" name="location" placeholder="Enter your area" required style={{ flex: 1, minWidth: 0 }} />
                    <button type="button" onClick={getLocation} style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '0 16px', borderRadius: '4px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Share Live Location">
                      <MapPin size={18} />
                    </button>
                  </div>
                  {coords && <span style={{ color: 'var(--primary-color)', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>Live location captured ✓</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Saree Type</label>
                  <select name="sareeType" required>
                    <option value="">Select Saree Type</option>
                    <option value="Kanchipuram Silk">Kanchipuram Silk</option>
                    <option value="Banarasi Silk">Banarasi Silk</option>
                    <option value="Mysore Silk">Mysore Silk</option>
                    <option value="Other Pattu Saree">Other Pattu Saree</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Pickup Time</label>
                  <select name="pickupTime" required>
                    <option value="">Select Time</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
                <div className="form-group upload-group">
                  <label>Upload Saree Images</label>
                  <label className="upload-box-sm" style={{ cursor: 'pointer' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => setSelectedFile(e.target.files[0])} 
                    />
                    <UploadCloud size={20} style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedFile ? selectedFile.name : 'Upload Images'}
                    </span>
                  </label>
                </div>
              </div>
              <button className="btn-schedule" type="submit" disabled={bookingStatus === 'submitting'}>
                {bookingStatus === 'submitting' ? 'Scheduling...' : <><Calendar size={18} /> Schedule Pickup</>}
              </button>
            </form>
          )}
        </div>
      </section>


      {/* WHATSAPP FLOAT */}
      <button 
        onClick={openWhatsAppChat}
        className="whatsapp-float"
        style={{ cursor: 'pointer', border: 'none' }}
      >
        <img src="/download (2).png" alt="wa" style={{width: '24px', filter: 'brightness(0) invert(1)'}} />
        <span>WhatsApp Us</span>
      </button>
    </div>
  );
}

export default App;
