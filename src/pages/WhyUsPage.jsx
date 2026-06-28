import Navbar from '../components/Navbar';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

export default function WhyUsPage() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-section-padding">
        <WhyChooseUs />
      </div>
      <Footer />
    </div>
  );
}
