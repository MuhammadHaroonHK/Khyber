// src/components/Contact.jsx
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Globe,
  ArrowRight
} from 'lucide-react';

import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

// ─── Contact Component ──────────────────────────────────────────────
const ContactPage = () => {

  return (
    <section id="contact" className="py-20 md:py-28 bg-gray-100 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        
        {/* ─── Section Header ────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="text-center mb-12"
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-[#0068A8] font-semibold text-sm uppercase tracking-wider"
          >
            Get in Touch
          </motion.span>
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001830] mt-2"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed"
          >
            Have questions or want to learn more? We'd love to hear from you. 
            Reach out to us through any of the channels below.
          </motion.p>
        </motion.div>

        {/* ─── Contact Info & Map ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Contact Info & Social */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#001830] mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#001830]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#001830]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001830] text-sm">Address</h4>
                    <p className="text-gray-600 text-sm">Khyber Model College & School</p>
                    <p className="text-gray-600 text-sm">G.T Road Iraq Stop Akora Khattak</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#0068A8]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#0068A8]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001830] text-sm">Phone</h4>
                    <a href="tel:0923630075" className="text-gray-600 text-sm hover:text-[#0068A8] transition-colors">
                      0923-630075
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#188454]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#188454]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001830] text-sm">Email Address</h4>
                    <p className="text-gray-600 text-sm">info@khyber.edu.pk</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#E4E454]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#E4E454]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001830] text-sm">Office Hours</h4>
                    <p className="text-gray-600 text-sm">Mon-Fri: 8:00 AM - 4:00 PM</p>
                    <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 }
            }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm h-full">
              <h4 className="font-bold text-[#001830] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0068A8]" />
                Find Us Here
              </h4>
              <div className="rounded-lg overflow-hidden bg-gray-100" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d88340.73709618849!2d72.1057257!3d34.0025627!3m2!1i1024!2i768!4f13.1!2m1!1skhyber%20model%20college%20nowshera!5e1!3m2!1sen!2s!4v1783496171969!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="School Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;