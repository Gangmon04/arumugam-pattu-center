import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Testimonials() {
  const [reviewIdx, setReviewIdx] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const updateCards = () => {
      setCardsPerPage(window.innerWidth <= 768 ? 1 : window.innerWidth <= 900 ? 2 : 3);
    };
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);

  const makeAvatar = (initials, bg) => 
    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="${encodeURIComponent(bg)}"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="%23ffffff" dominant-baseline="middle" text-anchor="middle">${initials}</text></svg>`;

  const reviews = [
    { 
      name: 'Jabakumar Isaac', 
      badge: '2 reviews · Google Review',
      date: '7 months ago',
      review: 'Excellent services(doorstep) and worth of money value that handed over to immediately. Mr. Murugan(proprietor) and his son Mr. Bharath having a deep knowledge in this field. Again best price (as compared with anyone) and less time consumption.', 
      avatar: makeAvatar('J', '#5B3E96') 
    },
    { 
      name: 'Yuvan Raja G R', 
      badge: 'Local Guide · 14 reviews',
      date: '3 months ago',
      review: 'It was a clean process and attitude right when picking the call from Arumugam actually made us to sell our dresses. The price was reasonable was all type of clothes and Bharath explained everything while taking pattu sarees and all.', 
      avatar: makeAvatar('Y', '#1A73E8') 
    },
    { 
      name: 'Shashii', 
      badge: 'Verified Customer · Google Review',
      date: '9 months ago',
      review: "Very good service they came to my house and collected didn't charge anything extra and most importantly the person who came to collect was on time very precise which i really liked there's was no excuses and he was very friendly, had high patience and very polite i really liked their service 5 star for the service", 
      avatar: makeAvatar('S', '#4C1D95') 
    },
    { 
      name: 'Haritha R', 
      badge: '2 reviews · Google Review',
      date: '8 months ago',
      review: 'I had a great experience at Arumugam Pattu Centre, a saree retailer. The prices are reasonable, which is nice. The checkout line was short, so I did not wait long. The store has a vibrant ambience that makes shopping fun. The staff were very helpful and friendly. Good management keeps everything running smoothly.', 
      avatar: makeAvatar('H', '#C2185B') 
    },
    { 
      name: 'Ganga', 
      badge: '2 reviews · Google Review',
      date: '8 months ago',
      review: 'Arumugam Pattu Centre stands out as an excellent saree retailer, offering a delightful shopping experience. Their reasonably priced sarees are complemented by helpful staff who guide you through the selection process.', 
      avatar: makeAvatar('G', '#E65100') 
    },
    { 
      name: 'Priya, T. Nagar', 
      badge: 'Verified Customer · Google Review',
      date: '10 months ago',
      review: 'Very good experience with Arumugam Pattu Center. They gave the best price for my kanchipuram sarees. Pickup was on time and payment was instant.', 
      avatar: makeAvatar('P', '#6B46C1') 
    }
  ];

  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  const nextReviews = () => {
    setReviewIdx((prev) => {
      const next = prev + cardsPerPage;
      return next >= reviews.length ? 0 : next;
    });
  };

  const prevReviews = () => {
    setReviewIdx((prev) => {
      const prevPage = prev - cardsPerPage;
      return prevPage < 0 ? Math.max(0, reviews.length - cardsPerPage) : prevPage;
    });
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-title-wrapper">
        <h2 className="panel-title">WHAT OUR CUSTOMERS SAY</h2>
        <div className="title-ornament"></div>
      </div>
      <div className="reviews-carousel">
        <button className="nav-arrow" onClick={prevReviews}><ChevronLeft /></button>
        <div className="reviews-grid">
          {reviews.slice(reviewIdx, reviewIdx + cardsPerPage).map((r, i) => (
            <div className="review-card" key={reviewIdx + i}>
              <div className="review-card-header">
                <div className="review-card-stars-wrap">
                  <GoogleIcon />
                  <div className="stars">★★★★★</div>
                </div>
                <span className="review-date">{r.date}</span>
              </div>
              <p className="review-text">"{r.review}"</p>
              <div className="review-author">
                <img src={r.avatar} alt={r.name} className="author-avatar" />
                <div className="author-info">
                  <span className="author-name">{r.name}</span>
                  <span className="author-badge">{r.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="nav-arrow" onClick={nextReviews}><ChevronRight /></button>
      </div>
      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`dot ${reviewIdx === dotIndex * cardsPerPage ? 'active' : ''}`}
            onClick={() => setReviewIdx(dotIndex * cardsPerPage)}
          ></span>
        ))}
      </div>
    </section>
  );
}

