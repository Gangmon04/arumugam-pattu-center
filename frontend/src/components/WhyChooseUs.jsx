import { BadgeCheck, Clock, HandCoins, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  return (
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
  );
}
