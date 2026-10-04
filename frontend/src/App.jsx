import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import './styles/index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
