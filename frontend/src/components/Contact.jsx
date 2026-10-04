import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  Truck, 
  Scale, 
  CreditCard, 
  ShieldCheck,
  UploadCloud,
  X,
  Image as ImageIcon,
  AlertCircle,
  Camera
} from 'lucide-react';
import siteData from '../data/siteData.json';
import '../styles/ContactForm.css';

export default function Contact() {
  const [bookingStatus, setBookingStatus] = useState('');
  const [coords, setCoords] = useState(null);
  const [locationVal, setLocationVal] = useState('');
  const [locLoading, setLocLoading] = useState(false);

  const [sareeType, setSareeType] = useState('');
  const [sareeDropdownOpen, setSareeDropdownOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState('');
  const [pickupDropdownOpen, setPickupDropdownOpen] = useState(false);
  const [notes, setNotes] = useState('');

  // Saree photo upload state
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isHeic, setIsHeic] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [photoUploadFailed, setPhotoUploadFailed] = useState(false);
  const fileInputRef = useRef(null);

  const sareeRef = useRef(null);
  const pickupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sareeRef.current && !sareeRef.current.contains(event.target)) {
        setSareeDropdownOpen(false);
      }
      if (pickupRef.current && !pickupRef.current.contains(event.target)) {
        setPickupDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup object preview URL when photo changes or component unmounts
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  // Client-side image optimization helper to avoid Vercel 4.5MB payload limits
  const compressImageIfNeeded = async (file) => {
    if (!file) return file;
    // Keep HEIC or files under 1.5MB untouched
    if (file.type === 'image/heic' || file.type === 'image/heif' || file.size <= 1.5 * 1024 * 1024) {
      return file;
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1600;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob && blob.size < file.size) {
                const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            0.85
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError('');

    // Maximum 10 MB limit
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setPhotoError('Photo size exceeds 10 MB. Please choose a smaller photo.');
      return;
    }

    const isHeicFile = 
      file.type === 'image/heic' || 
      file.type === 'image/heif' || 
      /\.(heic|heif)$/i.test(file.name);

    const isValidImage = 
      isHeicFile || 
      /^image\/(jpeg|png|webp|jpg)$/i.test(file.type) || 
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isValidImage) {
      setPhotoError('Unsupported file format. Please choose a JPEG, PNG, WEBP, or HEIC photo.');
      return;
    }

    // Revoke previous preview URL if any
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoFile(file);
    setIsHeic(isHeicFile);

    if (!isHeicFile) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview(null);
    setIsHeic(false);
    setPhotoError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLocLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationVal('Shared Live Location');
          setLocLoading(false);
        },
        (error) => {
          setLocLoading(false);
          alert('Unable to retrieve your live location. Please type your area manually.');
        },
        { timeout: 10000 }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please enter your location manually.');
    }
  };

  const resetFormState = () => {
    setCoords(null);
    setLocationVal('');
    setSareeType('');
    setPickupTime('');
    setNotes('');
    handleRemovePhoto();
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!sareeType) {
      alert('Please select a Saree Type.');
      return;
    }
    if (!pickupTime) {
      alert('Please select a Preferred Pickup Time.');
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setBookingStatus('submitting');
    setPhotoUploadFailed(false);

    try {
      // 1. Submit customer booking details as clean JSON
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: data.customerName,
          phone: data.phone,
          location: data.location || locationVal,
          sareeType: sareeType,
          pickupTime: pickupTime,
          notes: notes || undefined,
          coords: coords ? JSON.stringify(coords) : undefined,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || resData.error || 'Failed to submit pickup request');
      }

      const bookingId = resData.data?.id || resData.data?.booking?.id || resData.id;
      let photoUploadedSuccessfully = false;

      // 2. If customer selected a saree photo, upload to Cloudinary via memory buffer
      if (photoFile && bookingId) {
        try {
          const fileToUpload = await compressImageIfNeeded(photoFile);
          const photoPayload = new FormData();
          photoPayload.append('photo', fileToUpload);

          const photoRes = await fetch(`/api/bookings/${bookingId}/photo`, {
            method: 'POST',
            body: photoPayload,
          });

          const photoJson = await photoRes.json();
          if (photoRes.ok && photoJson.success) {
            photoUploadedSuccessfully = true;
          } else {
            console.warn('Photo upload error from cloud service:', photoJson.message);
            setPhotoUploadFailed(true);
          }
        } catch (photoUploadErr) {
          console.warn('Network issue during photo upload. Booking is still safe:', photoUploadErr);
          setPhotoUploadFailed(true);
        }
      }

      // 3. Compose WhatsApp summary text
      const notesStatus = notes ? `\n- *Notes:* ${notes}` : '';
      const locationLink = coords ? `\n- *Map Link:* https://maps.google.com/?q=${coords.lat},${coords.lng}` : '';
      const photoStatus = photoFile 
        ? (photoUploadedSuccessfully ? `\n- *Saree Photo:* Uploaded to portal` : `\n- *Saree Photo:* (Will share on WhatsApp)`)
        : '';

      const message = `Hello Arumugam Pattu Center! I would like to schedule a free pickup.

*Booking Details:*
- *Name:* ${data.customerName}
- *Phone:* ${data.phone}
- *Location:* ${data.location || locationVal}${locationLink}
- *Saree Type:* ${sareeType}
- *Preferred Time:* ${pickupTime}${photoStatus}${notesStatus}

Please confirm my booking.`;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const whatsappUrl = isMobile
        ? `https://api.whatsapp.com/send?phone=${siteData.whatsapp}&text=${encodeURIComponent(message)}`
        : `https://web.whatsapp.com/send?phone=${siteData.whatsapp}&text=${encodeURIComponent(message)}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setBookingStatus('success');
        resetFormState();
        setTimeout(() => {
          setBookingStatus('');
          setPhotoUploadFailed(false);
        }, 10000);
      }, 500);

    } catch (err) {
      console.error('Booking submission error:', err);
      alert(err.message || 'Server error occurred while submitting your booking.');
      setBookingStatus('');
    }
  };

  return (
    <div className="pickup-form-card" id="pickup-form">
      <div className="pickup-card-header">
        <h3 className="pickup-card-title">BOOK YOUR FREE PICKUP</h3>
        <p className="pickup-card-subtitle">Fill in your details and our team will contact you shortly.</p>
      </div>

      {bookingStatus === 'success' ? (
        <div className="booking-success-box">
          <CheckCircle2 size={48} className="booking-success-icon" />
          <h4 className="booking-success-heading">Pickup Scheduled Successfully!</h4>
          <p className="booking-success-text">
            Our executive will contact you shortly via call or WhatsApp to confirm your slot.
          </p>

          {photoUploadFailed && (
            <div className="photo-upload-partial-warning">
              <AlertCircle size={20} className="partial-warning-icon" />
              <span>
                <strong>Note:</strong> Your pickup request is safely confirmed. However, the saree photo could not be uploaded due to a temporary network issue. You can still share your photo directly with us on WhatsApp!
              </span>
            </div>
          )}

          <button 
            type="button" 
            className="btn-book-another"
            onClick={() => setBookingStatus('')}
          >
            Book Another Pickup
          </button>
        </div>
      ) : (
        <form className="pickup-form" onSubmit={handleBookingSubmit}>
          {/* Row 1: Name & Phone */}
          <div className="form-grid-2">
            <div className="form-field">
              <label htmlFor="customerName" className="form-label">Full Name</label>
              <input 
                id="customerName"
                type="text" 
                name="customerName" 
                placeholder="Enter your name" 
                required 
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input 
                id="phone"
                type="tel" 
                name="phone" 
                placeholder="Enter phone number" 
                required 
                pattern="[0-9+ -]{10,15}"
                className="form-input"
              />
            </div>
          </div>

          {/* Row 2: Location with GPS */}
          <div className="form-field">
            <label htmlFor="location" className="form-label">Location</label>
            <div className="location-field-group">
              <input 
                id="location"
                type="text" 
                name="location" 
                placeholder="Enter your area" 
                value={locationVal}
                onChange={(e) => setLocationVal(e.target.value)}
                required={!coords} 
                autoComplete="off"
                className="form-input location-input" 
              />
              <button 
                type="button" 
                onClick={getLocation} 
                className={`location-gps-btn ${locLoading ? 'loading' : ''}`}
                title="Use Live GPS Location"
                aria-label="Use Live GPS Location"
              >
                <MapPin size={18} />
              </button>
            </div>
            {coords && (
              <span className="location-success-indicator">
                ✓ Live GPS location captured accurately
              </span>
            )}
          </div>

          {/* Row 3: Saree Type & Preferred Time */}
          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label">Saree Type</label>
              <div className="custom-select-wrapper" ref={sareeRef}>
                <div 
                  className={`select-trigger ${sareeDropdownOpen ? 'active' : ''} ${!sareeType ? 'placeholder-color' : ''}`}
                  onClick={() => setSareeDropdownOpen(!sareeDropdownOpen)}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="listbox"
                >
                  <span>{sareeType || 'Select Saree Type'}</span>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
                {sareeDropdownOpen && (
                  <ul className="select-dropdown-menu" role="listbox">
                    <li onClick={() => { setSareeType('Kanchipuram Silk'); setSareeDropdownOpen(false); }}>Kanchipuram Silk</li>
                    <li onClick={() => { setSareeType('Banarasi Silk'); setSareeDropdownOpen(false); }}>Banarasi Silk</li>
                    <li onClick={() => { setSareeType('Mysore Silk'); setSareeDropdownOpen(false); }}>Mysore Silk</li>
                    <li onClick={() => { setSareeType('Antique / Pure Zari Saree'); setSareeDropdownOpen(false); }}>Antique / Pure Zari Saree</li>
                    <li onClick={() => { setSareeType('Other Pattu Saree'); setSareeDropdownOpen(false); }}>Other Pattu Saree</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Preferred Time</label>
              <div className="custom-select-wrapper" ref={pickupRef}>
                <div 
                  className={`select-trigger ${pickupDropdownOpen ? 'active' : ''} ${!pickupTime ? 'placeholder-color' : ''}`}
                  onClick={() => setPickupDropdownOpen(!pickupDropdownOpen)}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="listbox"
                >
                  <span>{pickupTime || 'Select Preferred Time'}</span>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
                {pickupDropdownOpen && (
                  <ul className="select-dropdown-menu" role="listbox">
                    <li onClick={() => { setPickupTime('Morning (9 AM – 12 PM)'); setPickupDropdownOpen(false); }}>Morning (9 AM – 12 PM)</li>
                    <li onClick={() => { setPickupTime('Afternoon (12 PM – 4 PM)'); setPickupDropdownOpen(false); }}>Afternoon (12 PM – 4 PM)</li>
                    <li onClick={() => { setPickupTime('Evening (4 PM – 8 PM)'); setPickupDropdownOpen(false); }}>Evening (4 PM – 8 PM)</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Row 4: Optional Saree Photo Upload */}
          <div className="form-field">
            <label className="form-label">
              Upload Saree Photo <span className="label-optional">(Optional)</span>
            </label>

            {/* Hidden native input */}
            <input 
              type="file"
              id="saree-photo-input"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
              className="photo-file-hidden"
            />

            {!photoFile ? (
              <div 
                className="photo-upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
              >
                <div className="dropzone-icon-circle">
                  <Camera size={22} />
                </div>
                <div className="dropzone-text-group">
                  <span className="dropzone-title">Click to attach saree photo</span>
                  <span className="dropzone-hint">Supports JPEG, PNG, WEBP, or HEIC (Max 10 MB)</span>
                </div>
              </div>
            ) : (
              <div className="photo-attached-card">
                <div className="photo-attached-left">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Saree Preview" className="photo-preview-thumb" />
                  ) : (
                    <div className="photo-heic-badge">
                      <ImageIcon size={22} />
                      <span>HEIC</span>
                    </div>
                  )}
                  <div className="photo-attached-meta">
                    <span className="photo-attached-name" title={photoFile.name}>{photoFile.name}</span>
                    <span className="photo-attached-size">{(photoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                </div>

                <div className="photo-attached-actions">
                  <button 
                    type="button" 
                    className="btn-change-photo"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change
                  </button>
                  <button 
                    type="button" 
                    className="btn-remove-photo"
                    onClick={handleRemovePhoto}
                    title="Remove Photo"
                    aria-label="Remove Photo"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {photoError && (
              <span className="photo-error-banner">
                <AlertCircle size={14} /> {photoError}
              </span>
            )}
          </div>

          {/* Row 5: Additional Notes */}
          <div className="form-field">
            <label htmlFor="notes" className="form-label">Additional Notes (Optional)</label>
            <textarea 
              id="notes"
              name="notes" 
              placeholder="Any additional information about your sarees" 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-submit-pickup"
            disabled={bookingStatus === 'submitting'}
          >
            {bookingStatus === 'submitting' ? (
              <span className="btn-loading-content">
                <span className="btn-spinner"></span> Scheduling Pickup...
              </span>
            ) : (
              <>
                <Calendar size={18} /> Schedule Free Pickup
              </>
            )}
          </button>

          {/* Trust Badges */}
          <div className="trust-badges-bar">
            <div className="trust-badge-item">
              <Truck size={17} className="badge-icon" />
              <span>Free Pickup</span>
            </div>
            <div className="trust-badge-item">
              <Scale size={17} className="badge-icon" />
              <span>Fair Valuation</span>
            </div>
            <div className="trust-badge-item">
              <CreditCard size={17} className="badge-icon" />
              <span>Instant Payment</span>
            </div>
            <div className="trust-badge-item">
              <ShieldCheck size={17} className="badge-icon" />
              <span>Trusted Service</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
