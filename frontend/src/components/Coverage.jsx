import { ArrowRight, CheckCircle2 } from 'lucide-react';
import '../styles/Coverage.css';
import '../styles/SplitSections.css';

export default function Coverage() {
  return (
    <section className="split-section">
      {/* Unused Saree */}
      <div className="unused-saree-panel">
        <h3 className="panel-title-sm">YOUR UNUSED SAREE<br />CAN BECOME INSTANT CASH</h3>
        <div className="unused-visual">
          <div className="visual-card">
            <img src="/assets/images/old_saree.png" alt="Old Saree" />
            <div className="visual-label">OLD SAREE</div>
          </div>
          <ArrowRight size={32} className="visual-arrow" />
          <div className="visual-card">
            <img src="/assets/images/instant_cash.png" alt="Instant Cash" />
            <div className="visual-label cash-label">INSTANT CASH</div>
          </div>
        </div>
        <p className="unused-desc">Don't let your precious sarees stay unused.<br />We give them the value they deserve!</p>
      </div>

      {/* Coverage */}
      <div className="coverage-panel">
        <h3 className="panel-title-sm">OUR SERVICE COVERAGE<br />WE SERVE ALL OVER CHENNAI</h3>
        <div className="coverage-content coverage-content-wrapper">
          <img src="/assets/images/map.png" alt="Chennai Map" className="map-img" />
          <div className="coverage-locations coverage-locations-row">
            {['Kovilambakkam', 'Madipakkam'].map(loc => (
              <div className="loc-chip loc-chip-large" key={loc}>
                <CheckCircle2 size={16} className="loc-icon" /> {loc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
