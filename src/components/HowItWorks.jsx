import { Camera, Search, Truck, HandCoins } from 'lucide-react';

export default function HowItWorks() {
  return (
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
  );
}
