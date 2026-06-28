import { useState } from 'react';
import { MapPin, UploadCloud, Calendar, CheckCircle2 } from 'lucide-react';
import siteData from '../data/siteData.json';
import '../styles/ContactForm.css';

export default function Contact() {
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          alert("Unable to retrieve your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const locationLink = coords ? `\n- *Map Link:* https://maps.google.com/?q=${coords.lat},${coords.lng}` : '';

    const message = `Hello Arumugam Pattu Center! I would like to schedule a free pickup.
    
*Booking Details:*
- *Name:* ${data.customerName}
- *Phone:* ${data.phone}
- *Location:* ${data.location}${locationLink}
- *Saree Type:* ${data.sareeType}
- *Preferred Time:* ${data.pickupTime}

Please confirm my booking.`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `https://api.whatsapp.com/send?phone=${siteData.whatsapp}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${siteData.whatsapp}&text=${encodeURIComponent(message)}`;

    setBookingStatus('submitting');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setBookingStatus('success');
      e.target.reset();
      setSelectedFile(null);
      setTimeout(() => setBookingStatus(''), 5000);
    }, 800);
  };

  return (
    <div className="booking-panel">
      <h3 className="panel-title-sm">BOOK YOUR FREE PICKUP NOW</h3>
      
      {bookingStatus === 'success' ? (
        <div className="booking-success booking-success-container">
          <CheckCircle2 size={48} color="var(--primary-color)" className="booking-success-icon" />
          <h4 className="booking-success-title">Pickup Scheduled Successfully!</h4>
          <p className="booking-success-desc">Our executive will contact you shortly to confirm the exact time.</p>
        </div>
      ) : (
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="customerName" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="Enter phone number" required />
            </div>
            <div className="form-group">
              <label>Location</label>
              <div className="location-input-group">
                <input type="text" name="location" placeholder="Enter your area" required className="location-input" />
                <button type="button" onClick={getLocation} className="location-btn-action" title="Share Live Location">
                  <MapPin size={18} />
                </button>
              </div>
              {coords && <span className="location-success-text">Live location captured ✓</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Saree Type</label>
              <select name="sareeType" required>
                <option value="">Select Saree Type</option>
                <option value="Kanchipuram Silk">Kanchipuram Silk</option>
                <option value="Banarasi Silk">Banarasi Silk</option>
                <option value="Mysore Silk">Mysore Silk</option>
                <option value="Other Pattu Saree">Other Pattu Saree</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Pickup Time</label>
              <select name="pickupTime" required>
                <option value="">Select Time</option>
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
              </select>
            </div>
            <div className="form-group upload-group">
              <label>Upload Saree Images</label>
              <label className="upload-box-sm upload-box-sm-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden-input"
                  onChange={(e) => setSelectedFile(e.target.files[0])} 
                />
                <UploadCloud size={20} className="upload-icon" />
                <span className="upload-text-truncate">
                  {selectedFile ? selectedFile.name : 'Upload Images'}
                </span>
              </label>
            </div>
          </div>
          <button className="btn-schedule" type="submit" disabled={bookingStatus === 'submitting'}>
            {bookingStatus === 'submitting' ? 'Scheduling...' : <><Calendar size={18} /> Schedule Pickup</>}
          </button>
        </form>
      )}
    </div>
  );
}
