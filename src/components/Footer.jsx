import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, GraduationCap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001830] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 md:py-16">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E4E454]/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#E4E454]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Khyber Model</h2>
                <p className="text-[#A8D8F0] text-xs font-medium">College & School</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A premier educational institution dedicated to nurturing young minds with quality education, character development, and holistic growth.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 pb-1 relative">
              Quick Links
              <span className="block w-10 h-0.5 bg-[#E4E454] mt-1"></span>
            </h2>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Academic Programs", path: "/academics" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#E4E454] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E4E454] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 pb-1 relative">
              Contact Information
              <span className="block w-10 h-0.5 bg-[#E4E454] mt-1"></span>
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E4E454] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-300 text-sm">G.T Road Iraq Stop Akora Khattak</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E4E454] flex-shrink-0" aria-hidden="true" />
                <a href="tel:0923630075" className="text-gray-300 hover:text-[#E4E454] text-sm transition-colors">
                  0923-630075
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E4E454] flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@khyber.edu.pk" className="text-gray-300 hover:text-[#E4E454] text-sm transition-colors">
                  info@khyber.edu.pk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E4E454] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-300 text-sm">Mon-Fri: 8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {currentYear} Khyber Model College & School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;