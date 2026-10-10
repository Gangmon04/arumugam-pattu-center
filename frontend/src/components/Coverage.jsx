import { useState } from 'react';
import { ArrowRight, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import siteData from '../data/siteData.json';
import '../styles/Coverage.css';
import '../styles/SplitSections.css';

export default function Coverage() {
  const [activeBranch, setActiveBranch] = useState(0);
  const location = siteData.locations[activeBranch];

  return (
    <section className="split-section" id="coverage">
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

      {/* Coverage & Store Locations */}
      <div className="coverage-panel">
        <h3 className="panel-title-sm">OUR SERVICE COVERAGE<br />WE SERVE ALL OVER CHENNAI</h3>
        
        {/* Branch Toggle Tabs */}
        <div className="coverage-branch-tabs">
          {siteData.locations.map((loc, idx) => (
            <button
              key={loc.id}
              type="button"
              className={`coverage-tab-btn ${activeBranch === idx ? 'active' : ''}`}
              onClick={() => setActiveBranch(idx)}
            >
              <MapPin size={15} />
              <span>{loc.area}</span>
            </button>
          ))}
        </div>

        {/* Live Interactive Google Map */}
        <div className="coverage-map-frame-wrapper">
          <iframe
            src={location.embedUrl}
            title={`Map - ${location.name}`}
            className="coverage-iframe"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Address & Directions */}
        <div className="coverage-branch-meta">
          <div className="coverage-address-text">
            <strong>{location.name}:</strong> {location.address}
          </div>
          <a
            href={location.mapLink}
            target="_blank"
            rel="noreferrer"
            className="coverage-directions-link"
            title={`Get Directions to ${location.name}`}
          >
            <ExternalLink size={13} /> Get Directions
          </a>
        </div>

        {/* Doorstep Pickup Badge */}
        <div className="coverage-doorstep-badge">
          <CheckCircle2 size={16} className="loc-icon" />
          <span>Free Doorstep Pickup Across All Areas in Chennai</span>
        </div>
      </div>
    </section>
  );
}
