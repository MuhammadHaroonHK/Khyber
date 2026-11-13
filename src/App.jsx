// src/App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages so only the visited route is downloaded & executed
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CampusTourPage = lazy(() => import("./pages/CampusTourPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AcademicsPage = lazy(() => import("./pages/AcademicsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function PageFallback() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#0068A8] border-t-[#E4E454] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/campus-tour" element={<CampusTourPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;