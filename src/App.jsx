// src/App.jsx
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
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

export const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=75&w=1400";

// Reusable Full-Screen Branded Splash Card (renders immediately at 100% opacity)
function BrandedSplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center w-20 h-20">
          <span className="absolute inset-0 rounded-full border-4 border-white/10 border-t-[#E4E454] border-r-[#0068A8] animate-spin" />
          <GraduationCap className="w-9 h-9 text-white" />
        </div>

        <div className="text-center space-y-1.5">
          <h2 className="text-white font-bold tracking-wider text-lg uppercase">
            Khyber Model College & School
          </h2>
          <p className="text-gray-400 text-xs tracking-widest uppercase">
            Shaping Future Leaders...
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const [isInitialLoading, setIsInitialLoading] = useState(isHomeRoute);

  useEffect(() => {
    if (!isHomeRoute) {
      setIsInitialLoading(false);
      return;
    }

    let isMounted = true;
    const minDisplayTime = new Promise((res) => setTimeout(res, 700));
    const maxTimeout = new Promise((res) => setTimeout(res, 2200));

    // Preload hero image while splash card is shown
    const preloadHero = new Promise((res) => {
      const img = new Image();
      img.src = HERO_IMAGE_URL;
      img.onload = res;
      img.onerror = res;
    });

    Promise.race([Promise.all([minDisplayTime, preloadHero]), maxTimeout]).then(() => {
      if (isMounted) setIsInitialLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Top-most Splash Card (Covers Navbar & Page until ready) */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            key="app-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999]"
          >
            <BrandedSplashScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
      <Navbar />

      {/* Suspense uses the exact same Splash Card so there is never a plain spinner flash */}
      <Suspense fallback={<BrandedSplashScreen />}>
        <Routes>
          <Route path="/" element={<HomePage isAppReady={!isInitialLoading} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/campus-tour" element={<CampusTourPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;