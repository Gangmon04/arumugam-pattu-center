import { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  LogIn, 
  Search, 
  Phone, 
  MapPin, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  X,
  Image as ImageIcon 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  // Check if passcode is saved in local storage
  useEffect(() => {
    const savedPasscode = localStorage.getItem('admin_passcode');
    if (savedPasscode) {
      verifyAndFetch(savedPasscode);
    }
  }, []);

  const verifyAndFetch = async (codeToVerify) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${codeToVerify}`
        }
      });
      
      const data = await res.json();
      
      if (res.status === 401) {
        setError('Invalid Admin Passcode. Please try again.');
        localStorage.removeItem('admin_passcode');
        setIsAuthenticated(false);
      } else if (!res.ok) {
        setError(data.error || 'Server error occurred.');
      } else {
        setLeads(data.leads || []);
        setIsAuthenticated(true);
        localStorage.setItem('admin_passcode', codeToVerify);
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the API. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passcode) return;
    verifyAndFetch(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_passcode');
    setPasscode('');
    setIsAuthenticated(false);
    setLeads([]);
  };

  // Filter leads based on query and status selection
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery) ||
      lead.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="app-container admin-page-wrapper">
        <Navbar />
        <div className="admin-login-container">
          <div className="admin-login-card">
            <div className="admin-login-icon-wrapper">
              <ShieldAlert size={48} />
            </div>
            <h2>Admin Portal</h2>
            <p>Access restricted. Please enter the administrator passcode to view customer leads.</p>
            
            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Enter passcode" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required 
                />
              </div>
              {error && <span className="login-error-text"><AlertCircle size={14} /> {error}</span>}
              <button type="submit" className="btn-admin-login" disabled={loading}>
                {loading ? 'Authenticating...' : <><LogIn size={18} /> Enter Portal</>}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="app-container admin-page-wrapper">
      <Navbar />
      
      <div className="admin-dashboard-panel">
        <div className="admin-dashboard-header">
          <div>
            <h1>Customer Leads</h1>
            <p>Manage and track your incoming old pattu saree pickup requests.</p>
          </div>
          <div className="admin-header-actions">
            <button className="btn-refresh" onClick={() => verifyAndFetch(localStorage.getItem('admin_passcode'))} title="Refresh data" disabled={loading}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
            </button>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="admin-dashboard-toolbar">
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon-field" />
            <input 
              type="text" 
              placeholder="Search by name, phone, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group-wrapper">
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Leads</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="leads-table-container">
          {filteredLeads.length === 0 ? (
            <div className="no-leads-state">
              <CheckCircle2 size={40} className="no-leads-icon" />
              <h3>No leads found</h3>
              <p>Try refreshing or adjusting your filters.</p>
            </div>
          ) : (
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Customer Name</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Saree Details</th>
                  <th>Saree Photo</th>
                  <th>Pickup Option</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  let parsedCoords = null;
                  if (lead.coordinates) {
                    try {
                      parsedCoords = typeof lead.coordinates === 'string' 
                        ? JSON.parse(lead.coordinates) 
                        : lead.coordinates;
                    } catch (e) {
                      console.error("Coords parsing error", e);
                    }
                  }

                  const sareePhoto = lead.sareeImageUrl || lead.saree_image_url;

                  return (
                    <tr key={lead.id}>
                      <td className="col-date">
                        {new Date(lead.created_at || lead.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}<br/>
                        <span className="lead-time">
                          {new Date(lead.created_at || lead.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                      <td className="col-name">{lead.name}</td>
                      <td className="col-contact">
                        <a href={`tel:${lead.phone}`} className="lead-link">
                          <Phone size={14} /> {lead.phone}
                        </a>
                      </td>
                      <td className="col-location">
                        {lead.location}
                        {parsedCoords && (
                          <a 
                            href={`https://maps.google.com/?q=${parsedCoords.lat},${parsedCoords.lng}`}
                            target="_blank"
                            rel="noreferrer"
                            className="map-link-btn"
                            title="View location on map"
                          >
                            <MapPin size={14} /> Map
                          </a>
                        )}
                      </td>
                      <td className="col-saree">{lead.saree_type || lead.sareeType}</td>
                      <td className="col-photo">
                        {sareePhoto ? (
                          <button 
                            type="button" 
                            className="btn-saree-photo-thumb"
                            onClick={() => setActivePhotoModal({
                              url: sareePhoto,
                              name: lead.name,
                              type: lead.saree_type || lead.sareeType
                            })}
                            title="Click to view full photo"
                          >
                            <img 
                              src={sareePhoto} 
                              alt="Saree thumbnail" 
                              className="saree-table-thumbnail"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentElement.innerHTML = '<span class="photo-badge-fallback">View Photo</span>';
                              }}
                            />
                            <span className="photo-view-text">View</span>
                          </button>
                        ) : (
                          <span className="no-photo-badge">No photo</span>
                        )}
                      </td>
                      <td className="col-time">{lead.pickup_time || lead.pickupTime}</td>
                      <td className="col-status">
                        <span className={`status-badge ${lead.status?.toLowerCase() || 'pending'}`}>
                          {lead.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {activePhotoModal && (
        <div className="admin-photo-modal-backdrop" onClick={() => setActivePhotoModal(null)}>
          <div className="admin-photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-top-bar">
              <div className="modal-header-info">
                <h4>{activePhotoModal.name}</h4>
                <span>{activePhotoModal.type}</span>
              </div>
              <div className="modal-top-actions">
                <a 
                  href={activePhotoModal.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-modal-action"
                  title="Open full image in new tab"
                >
                  <ExternalLink size={16} /> Open Full
                </a>
                <button 
                  type="button" 
                  className="btn-modal-close"
                  onClick={() => setActivePhotoModal(null)}
                  title="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="admin-modal-image-box">
              <img 
                src={activePhotoModal.url} 
                alt="Full resolution saree" 
                className="admin-modal-full-img"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
