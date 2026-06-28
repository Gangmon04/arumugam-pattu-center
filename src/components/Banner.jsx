import { Phone, Calendar, ShieldCheck, HandCoins, Star } from 'lucide-react';
import siteData from '../data/siteData.json';
import '../styles/Banner.css';

export default function banner() {
  return (
    <section className="banner-section" id="home">
      <div className="banner-left">
        <img src="/assets/images/hero_saree_lavender.png" alt="Pattu Saree" className="banner-image" />
      </div>
      <div className="banner-right">
        <h1 className="banner-title">
          Sell Your <br />
          <span>Old Pattu Sarees</span> <br />
          at Best Price
        </h1>
        <p className="banner-subtitle">
          Chennai's most trusted destination for buying old silk sarees. Get the best value with free doorstep pickup and instant cash.
        </p>
        <div className="banner-buttons">
          <a href={`tel:${siteData.phones[0].replace(/\s+/g, '')}`} className="btn-primary-dark banner-btn">
            <Phone size={18} /> Call Now
          </a>
          <a href="#contact" className="btn-outline-dark banner-btn">
            <Calendar size={18} /> Book Free Pickup
          </a>
        </div>
        <div className="trust-banner">
          <div className="trust-stat">
            <div className="trust-stat-top">
              <ShieldCheck className="trust-icon" />
              <h4>40+</h4>
            </div>
            <p>Years Experience</p>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-top">
              <HandCoins className="trust-icon" />
              <h4>5,000+</h4>
            </div>
            <p>Sarees Purchased</p>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-top">
              <Star className="trust-icon" />
              <h4>4.9★</h4>
            </div>
            <p>Google Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
