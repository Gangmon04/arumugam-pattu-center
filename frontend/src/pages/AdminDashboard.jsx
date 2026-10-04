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
  Image as ImageIcon,
  LogOut
} from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/AdminDashboard.css';

// Sleek WhatsApp brand icon
const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
    if (!codeToVerify || !codeToVerify.trim()) {
      setError('Please enter the admin passcode.');
      setIsAuthenticated(false);
      return;
    }

    setLoading(true);
    setError('');
    const cleanPasscode = codeToVerify.trim();

    try {
      const res = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${cleanPasscode}`
        }
      });
      
      const data = await res.json();
      
      if (res.status === 401 || !res.ok) {
        setError(data.message || data.error || 'Invalid Admin Passcode. Access denied.');
        localStorage.removeItem('admin_passcode');
        setIsAuthenticated(false);
      } else {
        setLeads(data.leads || data.data || []);
        setIsAuthenticated(true);
        localStorage.setItem('admin_passcode', cleanPasscode);
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
    if (!passcode || !passcode.trim()) {
      setError('Please enter the admin passcode.');
      return;
    }
    verifyAndFetch(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_passcode');
    setPasscode('');
    setIsAuthenticated(false);
    setLeads([]);
  };

  const [updatingId, setUpdatingId] = useState(null);

  const handleToggleStatus = async (leadId, currentStatus) => {
    const isCurrentlyPending = (currentStatus || 'PENDING').toUpperCase() === 'PENDING';
    const newStatus = isCurrentlyPending ? 'COMPLETED' : 'PENDING';

    setUpdatingId(leadId);

    // Optimistic UI update
    setLeads(prevLeads =>
      prevLeads.map(lead => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );

    try {
      const activeCode = localStorage.getItem('admin_passcode') || passcode;
      const res = await fetch(`/api/bookings/${leadId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeCode?.trim()}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        console.warn('Status update not persisted to remote server');
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
    } finally {
      setUpdatingId(null);
    }
  };


  // Filter leads based on search query across all fields and case-insensitive status
  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.trim().toLowerCase();
    
    // 1. Search Query matching across name, phone, clean phone, location, saree, pickup, notes, and ID
    let matchesSearch = true;
    if (query) {
      const name = (lead.name || '').toLowerCase();
      const phone = (lead.phone || '').toLowerCase();
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const cleanQuery = query.replace(/[^0-9]/g, '');
      const location = (lead.location || '').toLowerCase();
      const saree = (lead.saree_type || lead.sareeType || '').toLowerCase();
      const pickup = (lead.pickup_time || lead.pickupTime || '').toLowerCase();
      const notes = (lead.notes || '').toLowerCase();
      const id = String(lead.id || '');

      matchesSearch = 
        name.includes(query) ||
        phone.includes(query) ||
        (cleanQuery && cleanPhone.includes(cleanQuery)) ||
        location.includes(query) ||
        saree.includes(query) ||
        pickup.includes(query) ||
        notes.includes(query) ||
        id === query;
    }
    
    // 2. Status Filter matching (case-insensitive)
    const leadStatus = (lead.status || 'PENDING').toUpperCase();
    const filterStatus = statusFilter.toUpperCase();
    const matchesStatus = filterStatus === 'ALL' || leadStatus === filterStatus;
    
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

            <div className="admin-card-footer-badge">
              Arumugam Pattu Center • Management Portal
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="app-container admin-page-wrapper">
      <Navbar />
      
      <div className="admin-dashboard-panel">
        <div className="admin-dashboard-header">
          <div className="admin-title-group">
            <h1>Customer Leads</h1>
            <p>Manage and track your incoming old pattu saree pickup requests.</p>
          </div>
          <div className="admin-header-actions-compact">
            <button 
              type="button"
              className="btn-refresh-icon" 
              onClick={() => verifyAndFetch(localStorage.getItem('admin_passcode'))} 
              title="Refresh leads" 
              aria-label="Refresh leads"
              disabled={loading}
            >
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
            </button>
            <button 
              type="button"
              className="btn-logout-compact" 
              onClick={handleLogout}
              title="Logout from admin portal"
              aria-label="Logout"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>


        {/* Filters and Search Bar */}
        <div className="admin-dashboard-toolbar">
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon-field" />
            <input 
              type="text" 
              placeholder="Search name, phone, saree, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="toolbar-right-controls">
            <span className="leads-count-badge">
              {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'}
            </span>

            <div className="filter-group-wrapper">
              <label htmlFor="admin-status-filter">Status:</label>
              <select 
                id="admin-status-filter"
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Leads</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Content: Desktop Table & Mobile Cards */}
        <div className="leads-display-wrapper">
          {filteredLeads.length === 0 ? (
            <div className="no-leads-state">
              <CheckCircle2 size={40} className="no-leads-icon" />
              <h3>No leads found</h3>
              <p>Try refreshing or adjusting your filters.</p>
            </div>
          ) : (
            <>
              {/* 1. Desktop & Tablet Table (Screens > 768px) */}
              <div className="leads-table-container">
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
                      const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
                      const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

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
                            <div className="desktop-contact-cell">
                              <a href={`tel:${lead.phone}`} className="lead-link" title="Call customer">
                                <Phone size={14} /> {lead.phone}
                              </a>
                              {cleanPhone && (
                                <a 
                                  href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20${encodeURIComponent(lead.name)},%20regarding%20your%20old%20pattu%20saree%20pickup%20request%20with%20Arumugam%20Pattu%20Center...`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="whatsapp-icon-btn"
                                  title="Chat on WhatsApp"
                                  aria-label="Chat on WhatsApp"
                                >
                                  <WhatsAppIcon size={14} />
                                </a>
                              )}
                            </div>
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
                            <button
                              type="button"
                              className={`status-badge-btn ${lead.status?.toLowerCase() || 'pending'} ${updatingId === lead.id ? 'status-updating' : ''}`}
                              onClick={() => handleToggleStatus(lead.id, lead.status)}
                              title={`Click to mark as ${(lead.status || 'PENDING').toUpperCase() === 'PENDING' ? 'COMPLETED' : 'PENDING'}`}
                              disabled={updatingId === lead.id}
                            >
                              {lead.status || 'Pending'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 2. Mobile Responsive Lead Cards (Screens <= 768px) */}
              <div className="leads-mobile-card-list">
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
                  const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
                  const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

                  return (
                    <div className="mobile-lead-card" key={`mobile-card-${lead.id}`}>
                      {/* Top Bar: Name, Status & Date */}
                      <div className="mobile-card-top">
                        <div className="mobile-card-title-group">
                          <h3 className="mobile-lead-name">{lead.name}</h3>
                          <span className="mobile-lead-timestamp">
                            {new Date(lead.created_at || lead.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })} • {new Date(lead.created_at || lead.createdAt).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`status-badge-btn ${lead.status?.toLowerCase() || 'pending'} ${updatingId === lead.id ? 'status-updating' : ''}`}
                          onClick={() => handleToggleStatus(lead.id, lead.status)}
                          title={`Click to mark as ${(lead.status || 'PENDING').toUpperCase() === 'PENDING' ? 'COMPLETED' : 'PENDING'}`}
                          disabled={updatingId === lead.id}
                        >
                          {lead.status || 'Pending'}
                        </button>
                      </div>

                      {/* Info Rows */}
                      <div className="mobile-card-rows">
                        {/* Contact Action Row */}
                        <div className="mobile-lead-row">
                          <span className="mobile-row-label">Phone:</span>
                          <div className="mobile-phone-group">
                            <a href={`tel:${lead.phone}`} className="mobile-call-pill" title="Call customer">
                              <Phone size={13} /> {lead.phone}
                            </a>
                            {cleanPhone && (
                              <a 
                                href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20${encodeURIComponent(lead.name)},%20regarding%20your%20old%20pattu%20saree%20pickup%20request%20with%20Arumugam%20Pattu%20Center...`}
                                target="_blank"
                                rel="noreferrer"
                                className="whatsapp-icon-btn"
                                title="Chat on WhatsApp"
                                aria-label="Chat on WhatsApp"
                              >
                                <WhatsAppIcon size={16} />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Location Row */}
                        <div className="mobile-lead-row">
                          <span className="mobile-row-label">Location:</span>
                          <div className="mobile-location-wrapper">
                            <span className="mobile-location-text">{lead.location}</span>
                            {parsedCoords && (
                              <a 
                                href={`https://maps.google.com/?q=${parsedCoords.lat},${parsedCoords.lng}`}
                                target="_blank"
                                rel="noreferrer"
                                className="map-link-btn mobile-map-btn"
                              >
                                <MapPin size={13} /> Map
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Saree Details */}
                        <div className="mobile-lead-row">
                          <span className="mobile-row-label">Saree:</span>
                          <span className="mobile-saree-val">{lead.saree_type || lead.sareeType}</span>
                        </div>

                        {/* Pickup Slot */}
                        <div className="mobile-lead-row">
                          <span className="mobile-row-label">Pickup:</span>
                          <span className="mobile-pickup-val">{lead.pickup_time || lead.pickupTime}</span>
                        </div>

                        {/* Customer Notes */}
                        {lead.notes && (
                          <div className="mobile-lead-row notes-row">
                            <span className="mobile-row-label">Notes:</span>
                            <span className="mobile-notes-val">{lead.notes}</span>
                          </div>
                        )}

                        {/* Photo Preview Button */}
                        <div className="mobile-lead-row photo-row">
                          <span className="mobile-row-label">Photo:</span>
                          <div className="mobile-photo-cell">
                            {sareePhoto ? (
                              <button 
                                type="button" 
                                className="mobile-photo-card-btn"
                                onClick={() => setActivePhotoModal({
                                  url: sareePhoto,
                                  name: lead.name,
                                  type: lead.saree_type || lead.sareeType
                                })}
                              >
                                <img 
                                  src={sareePhoto} 
                                  alt="Saree" 
                                  className="mobile-card-img-thumb"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                  }}
                                />
                                <div className="mobile-photo-cta-text">
                                  <ImageIcon size={14} />
                                  <span>Tap to View Photo</span>
                                </div>
                              </button>
                            ) : (
                              <span className="no-photo-badge">No photo uploaded</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
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

      {/* Minimal Clean Admin Footer */}
      <footer className="admin-portal-minimal-footer">
        <span>© {new Date().getFullYear()} Arumugam Pattu Center • Admin Management Portal</span>
      </footer>
    </div>
  );
}
