import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/assets/images/logo.png" alt="Arumugam Pattu Center" className="logo-img" />
      </div>
      
      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link></li>
        <li><Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>HOW IT WORKS</Link></li>
        <li><Link to="/why-us" onClick={() => setMobileMenuOpen(false)}>WHY US</Link></li>
        <li><Link to="/saree-types" onClick={() => setMobileMenuOpen(false)}>SAREE TYPES</Link></li>
        <li><Link to="/reviews" onClick={() => setMobileMenuOpen(false)}>REVIEWS</Link></li>
        <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link></li>
      </ul>
    </nav>
  );
}
