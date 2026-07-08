// src/components/Footer.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  GraduationCap,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001830] text-white relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* ─── Main Footer Content ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 md:py-16">
          
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E4E454]/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#E4E454]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Khyber Model</h3>
                <p className="text-[#A8D8F0] text-xs font-medium">College & School</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A premier educational institution dedicated to nurturing young minds with quality education, character development, and holistic growth.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-4 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-[#E4E454] mt-1"></span>
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Academic Programs', path: '/academics' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#E4E454] text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E4E454] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-bold text-white mb-4 relative">
              Contact
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-[#E4E454] mt-1"></span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E4E454] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">G.T Road Iraq Stop Akora Khattak</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E4E454] flex-shrink-0" />
                <a href="tel:0923630075" className="text-gray-400 hover:text-[#E4E454] text-sm transition-colors">
                  0923-630075
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E4E454] flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@khyber.edu.pk</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E4E454] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Mon-Fri: 8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ─── Bottom Bar ────────────────────────────────────────────── */}
        <div className="border-t border-white/10 py-6">
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Khyber Model College & School. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;