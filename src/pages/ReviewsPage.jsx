import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Star, MessageSquare, Award, ShieldCheck, MessageCircle, Phone, Quote } from 'lucide-react';
import siteData from '../data/siteData.json';
import '../styles/ReviewsPage.css';

export default function ReviewsPage() {
  const kpis = [
    { 
      icon: <img src="/assets/icons/icon_customers.png" alt="Customers" className="reviews-kpi-icon-img" />, 
      value: '5,000+', 
      label: 'Happy Customers' 
    },
    { 
      icon: <img src="/assets/icons/icon_rating.png" alt="Rating" className="reviews-kpi-icon-img" />, 
      value: '4.9 / 5', 
      label: 'Average Rating' 
    },
    { 
      icon: <img src="/assets/icons/icon_reviews.png" alt="Reviews" className="reviews-kpi-icon-img" />, 
      value: '1,200+', 
      label: 'Reviews' 
    },
    { 
      icon: <img src="/assets/icons/icon_trust.png" alt="Trust" className="reviews-kpi-icon-img" />, 
      value: '40+', 
      label: 'Years of Trust' 
    }
  ];

  const reviews = [
    { 
      name: 'Priya, T. Nagar', 
      review: 'Very good experience with Arumugam Pattu Center. They gave the best price for my kanchipuram sarees. Pickup was on time and payment was instant.', 
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      image: '/assets/images/kanchi.png'
    },
    { 
      name: 'Meenakshi, Anna Nagar', 
      review: 'Excellent service! The team was very polite and professional. Got a fair price for my bridal sarees. Highly recommended.', 
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      image: '/assets/images/bridal.png'
    },
    { 
      name: 'Lakshmi, Vadapalani', 
      review: 'Free doorstep pickup service is very convenient. They evaluated the sarees transparently and paid instantly. Very satisfied!', 
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
      image: '/assets/images/temple.png'
    },
    { 
      name: 'Revathi, Mylapore', 
      review: 'I had old silk sarees which I thought were of no use. But they took everything and gave a good price. Thank you!', 
      avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
      image: '/assets/images/designer.png'
    },
    { 
      name: 'Sangeetha, Velachery', 
      review: 'Trustworthy and reliable. This is my second time selling sarees to them. Always a smooth and pleasant experience.', 
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
      image: '/assets/images/antique.png'
    },
    { 
      name: 'Kavitha, Tambaram', 
      review: 'The best place to sell old pattu sarees. Polite staff, quick evaluation and instant payment. Highly recommend!', 
      avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
      image: '/assets/images/old_saree.png'
    }
  ];

  const openWhatsAppChat = (e) => {
    e.preventDefault();
    const phone = siteData.whatsapp;
    const text = 'Hello Arumugam Pattu Center! I have an inquiry regarding my old pattu saree.';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const url = isMobile 
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
      
    window.open(url, '_blank');
  };

  return (
    <div className="app-container reviews-page-wrapper">
      <Navbar />

      <div className="reviews-header-panel">
        <h2 className="panel-title reviews-panel-title">WHAT OUR CUSTOMERS SAY</h2>
        <p className="reviews-panel-subtitle">
          Thousands of happy customers who trusted us and got the best value for their precious sarees.
        </p>

        <div className="reviews-kpi-container">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="reviews-kpi-item">
              <div className="reviews-kpi-content">
                <div className="reviews-kpi-icon-box">
                  {kpi.icon}
                </div>
                <div className="reviews-kpi-text-left">
                  <h3 className="reviews-kpi-value">{kpi.value}</h3>
                  <span className="reviews-kpi-label">{kpi.label}</span>
                </div>
              </div>
              {idx < kpis.length - 1 && (
                <div className="reviews-kpi-divider"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-main-section">
        <div className="reviews-section-header">
          <h3 className="reviews-section-title">CUSTOMER REVIEWS</h3>
          <div className="title-ornament reviews-section-ornament"></div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid-container">
          {reviews.map((r, i) => (
            <div key={i} className="reviews-grid-card">
              <div className="reviews-card-stars">
                ★★★★★
              </div>
              <p className="reviews-card-text">
                {r.review}
              </p>
              
              <div className="reviews-card-image-box">
                <img src={r.image} alt="Saree preview" className="reviews-card-image" />
              </div>

              <div className="reviews-card-footer">
                <div className="reviews-card-author-box">
                  <img src={r.avatar} alt={r.name} className="reviews-card-avatar" />
                  <span className="reviews-card-author-name">{r.name}</span>
                </div>
                <Quote size={20} color="var(--primary-color)" className="reviews-card-quote-icon" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="reviews-cta-banner">
          <div className="reviews-cta-left">
            <img src="/assets/icons/shield_exact.jpg" alt="Trust Shield" className="reviews-cta-shield" />
            <div>
              <h3 className="reviews-cta-title">Your Trust, Our Motivation</h3>
              <p className="reviews-cta-desc">We are proud to serve thousands of customers<br/>with honesty, transparency and the best value.</p>
            </div>
          </div>
          
          <div className="reviews-cta-buttons">
            <button onClick={openWhatsAppChat} className="reviews-cta-btn-primary">
              <svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" className="whatsapp-btn-icon">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </button>
            <a href={`tel:${siteData.phones[0].replace(/\s+/g, '')}`} className="reviews-cta-btn-outline">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>

        {/* Google Rating */}
        <div className="google-rating-banner">
          
          <img src="/assets/icons/wreath_left_exact.jpg" alt="Wreath Left" className="google-rating-wreath" />

          <div className="google-rating-center">
            <div className="google-rating-logo">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="google-rating-logo-icon">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            
            <h3 className="google-rating-title">Rated 4.9/5 by Our Customers on Google</h3>
            
            <div className="google-rating-stars-container">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#C59B27" xmlns="http://www.w3.org/2000/svg" className="google-star-icon">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            
            <span className="google-rating-subtitle">Based on 1,200+ reviews</span>
          </div>

          <img src="/assets/icons/wreath_left_highres.png" alt="Wreath Right" className="google-rating-wreath" />

        </div>
      </div>

      <Footer />
    </div>
  );
}
