import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/">
          <img src="/assets/images/logo.png" alt="Arumugam Pattu Center" className="logo-img" />
        </NavLink>
      </div>
      
      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>HOME</NavLink></li>
        <li><NavLink to="/reviews" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>REVIEWS</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>CONTACT</NavLink></li>
      </ul>
    </nav>
  );
}
