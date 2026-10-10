import { Camera, Truck, Scale, HandCoins } from 'lucide-react';

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
          <h4>Upload & Book</h4>
          <p>Share saree photos & schedule convenient pickup</p>
        </div>
        <div className="step-line"></div>
        <div className="step-item">
          <div className="step-icon-circle"><Truck size={24} /></div>
          <div className="step-number">2</div>
          <h4>Free Pickup</h4>
          <p>Our executive visits your doorstep at zero cost</p>
        </div>
        <div className="step-line"></div>
        <div className="step-item">
          <div className="step-icon-circle"><Scale size={24} /></div>
          <div className="step-number">3</div>
          <h4>On-Spot Evaluation</h4>
          <p>Transparent zari testing & valuation in front of you</p>
        </div>
        <div className="step-line"></div>
        <div className="step-item">
          <div className="step-icon-circle"><HandCoins size={24} /></div>
          <div className="step-number">4</div>
          <h4>Instant Cash</h4>
          <p>Get instant cash or UPI payment on the spot</p>
        </div>
      </div>
    </div>
  );
}
