import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";

// Lazy-load secondary routes only
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CampusTourPage = lazy(() => import("./pages/CampusTourPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AcademicsPage = lazy(() => import("./pages/AcademicsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=65&w=1200";

function RouteFallback() {
  return (
    <div className="min-h-screen bg-[#001830] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-white/15 border-t-[#E4E454] animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/campus-tour" element={<CampusTourPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;