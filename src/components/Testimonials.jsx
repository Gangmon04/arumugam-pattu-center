import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const reviews = [
    { name: 'Priya, Alwarpet', review: 'Very genuine and transparent service. Got the best price for my old pattu saree.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Nithya, Nungambakkam', review: 'Free doorstep pickup and instant payment. Highly recommended!', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { name: 'Aishwarya, Besant Nagar', review: 'Professional and quick service. Trusted buyers in Chennai.', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
    { name: 'Divya, Kilpauk', review: 'I was surprised by how much I got for my grandmother\u2019s old silk. Truly the best in the market!', avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
    { name: 'Saraswathi, West Mambalam', review: 'The valuation process was completely transparent. They explained the zari quality clearly before quoting.', avatar: 'https://randomuser.me/api/portraits/women/48.jpg' },
    { name: 'Ananya, Thiruvanmiyur', review: 'Excellent customer service. They came to my house within hours and gave me instant cash. Very convenient.', avatar: 'https://randomuser.me/api/portraits/women/49.jpg' }
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
              <div className="stars">★★★★★</div>
              <p className="review-text">"{r.review}"</p>
              <div className="review-author">
                <img src={r.avatar} alt={r.name} className="author-avatar" />
                <span>— {r.name}</span>
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

