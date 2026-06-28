import Navbar from '../components/Navbar';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

export default function HowItWorksPage() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-section-padding">
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
}
