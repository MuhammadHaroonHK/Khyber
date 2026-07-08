// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Importing the new Page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CampusTourPage from './pages/CampusTourPage';
import GalleryPage from './pages/GalleryPage';
import AcademicsPage from './pages/AcademicsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/campus-tour" element={<CampusTourPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;