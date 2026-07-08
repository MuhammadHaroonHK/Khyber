// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";

// Updated navLinks arrays to map to standard URL paths instead of section IDs
const navLinks = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "campus-tour", label: "Campus Tour", path: "/campus-tour" },
  { id: "gallery", label: "Photo Gallery", path: "/gallery" },
  { id: "academics", label: "Academic Programs", path: "/academics" },
  { id: "contact", label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { scrollY } = useScroll();
  const navPaddingY = useTransform(scrollY, [0, 100], ["16px", "8px"]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Automatically close the mobile menu whenever the page path changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* ── Top Info Bar ── */}
      <div className="hidden md:block bg-[#001830]/95 backdrop-blur-sm py-1.5 border-b border-[#E4E454]/20">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E4E454]" />
            <span>G.T Road Iraq Stop Akora Khattak</span>
          </div>
          <div className="hidden lg:inline-block items-center gap-1 italic text-[#E4E454] font-medium">
            THE BEST GUIDELINE FOR YOUR KIDS
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              0923-630075
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              info@khyber.edu.pk
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <motion.div
        style={{
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          backgroundColor: isHomePage
            ? `rgba(0, 24, 48, ${isScrolled ? 0.95 : 0})`
            : "rgba(0, 24, 48, 0.95)",
        }}
        className={`
  transition-all duration-300 text-white
  ${
    isHomePage
      ? isScrolled
        ? "shadow-lg backdrop-blur-md border-b border-white/10"
        : "border-b border-transparent"
      : "shadow-lg backdrop-blur-md border-b border-white/10"
  }
`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="/sms_logo.webp"
              alt="SMS Logo"
              className="max-h-9 rounded-full"
            />
            <div className="text-center text-xs lg:text-sm">
              <h1 className="text-[#E4E454] font-semibold">
                Khyber Model{" "}
                <div className="text-[#A8D8F0]">College & School</div>
              </h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              // Checks if this link matches our current URL route
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`
                    relative font-medium text-[15px] tracking-wide transition-colors duration-200 cursor-pointer
                    hover:text-[#E4E454]
                    ${isActive ? "text-[#E4E454]" : "text-white"}
                  `}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#188454] w-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              );
            })}

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://forms.gle/KXg7MzBveJvhj83e7"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-block bg-[#0068A8] text-white border border-[#E4E454] rounded-md px-4 py-2 font-semibold text-sm shadow-md transition-all"
              >
                Apply Now
              </a>
            </motion.div>
          </nav>

          {/* Mobile: Hamburger */}
          <button onClick={toggleDrawer} className="md:hidden p-1 text-white">
            {isDrawerOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#001830] border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;

                    return (
                      <li key={link.id}>
                        <Link
                          to={link.path}
                          className={`
                            block py-3 px-2 text-white text-base font-medium rounded-md
                            ${isActive ? "bg-[#0068A8]/20 text-[#E4E454]" : ""}
                          `}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;