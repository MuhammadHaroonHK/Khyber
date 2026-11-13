import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 24;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const showSolidBg = !isHomePage || isScrolled || isDrawerOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="hidden md:block bg-[#001830] py-1.5 border-b border-[#E4E454]/20">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E4E454]" aria-hidden="true" />
            <span>G.T Road Iraq Stop Akora Khattak</span>
          </div>
          <div className="hidden lg:inline-block italic text-[#E4E454] font-medium">
            THE BEST GUIDELINE FOR YOUR KIDS
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0923630075" className="flex items-center gap-1 hover:text-[#E4E454]">
              <Phone className="w-3 h-3" aria-hidden="true" />
              0923-630075
            </a>
            <a href="mailto:info@khyber.edu.pk" className="flex items-center gap-1 hover:text-[#E4E454]">
              <Mail className="w-3 h-3" aria-hidden="true" />
              info@khyber.edu.pk
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-colors duration-200 text-white ${
          isScrolled ? "py-2" : "py-3.5"
        } ${
          showSolidBg
            ? "bg-[#001830]/95 shadow-lg border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/khyber_logo.jfif"
              alt="Khyber Model College & School Logo"
              width="36"
              height="36"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="text-left text-xs lg:text-sm leading-tight">
              <span className="block text-[#E4E454] font-semibold">
                Khyber Model
              </span>
              <span className="block text-[#A8D8F0]">College & School</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`relative font-medium text-[15px] tracking-wide transition-colors duration-150 hover:text-[#E4E454] ${
                    isActive ? "text-[#E4E454]" : "text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#188454] w-full origin-left transition-transform duration-200 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}

            <a
              href="https://forms.gle/WzdSaumBGdREZofr5"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-block bg-[#0068A8] hover:bg-[#00558a] text-white border border-[#E4E454] rounded-md px-4 py-2 font-semibold text-sm shadow-md transition-transform duration-150 active:scale-95"
            >
              Apply Now
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            aria-label={isDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isDrawerOpen}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E4E454]"
          >
            {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden bg-[#001830] border-t border-white/10 mt-2"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.id}>
                      <Link
                        to={link.path}
                        className={`block py-3 px-3 text-base font-medium rounded-md transition-colors ${
                          isActive
                            ? "bg-[#0068A8]/25 text-[#E4E454]"
                            : "text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <a
                    href="https://forms.gle/WzdSaumBGdREZofr5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#0068A8] text-white border border-[#E4E454] rounded-md py-2.5 font-semibold text-sm"
                  >
                    Apply Now
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;