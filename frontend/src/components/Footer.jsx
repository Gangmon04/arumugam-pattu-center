import { Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content-wrapper">
        
        {/* 4 Columns */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Socials */}
          <div className="footer-col footer-col-brand">
            <Link to="/">
              <img src="/assets/images/logo.png" alt="Arumugam Pattu Center" className="footer-logo" />
            </Link>
            <p className="footer-brand-desc">
              Your trusted partner for old pattu saree buying with honesty and care.
            </p>
            <div className="footer-social-icons">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href={siteData.instagram} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href={`https://wa.me/${siteData.whatsapp}`} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Google */}
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Google">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contact-details">
              <div className="footer-contact-row-item footer-contact-phone-item">
                <Phone size={15} className="footer-contact-icon" />
                <div className="footer-contact-numbers">
                  {siteData.phones.map((phone, idx) => (
                    <a 
                      key={idx} 
                      href={`tel:${phone.replace(/\s+/g, '')}`} 
                      className={`footer-contact-link ${idx > 0 ? 'footer-phone-secondary' : 'footer-phone-primary'}`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="footer-contact-row-item footer-contact-email-item">
                <Mail size={15} className="footer-contact-icon" />
                <a href={`mailto:${siteData.email}`} className="footer-contact-link">{siteData.email}</a>
              </div>

              <div className="footer-contact-row-item footer-contact-hours-item">
                <Clock size={15} className="footer-contact-icon" />
                <span className="footer-contact-text">{siteData.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 Arumugam Pattu Center. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-separator">|</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
