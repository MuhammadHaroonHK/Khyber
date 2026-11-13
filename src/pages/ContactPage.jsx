import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#0068A8]/10 text-[#0068A8] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#001830] mt-3">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
            Have questions or want to learn more? We'd love to hear from you.
            Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-[#001830] mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#001830]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#001830]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001830] text-sm">Address</h3>
                  <p className="text-gray-600 text-sm">Khyber Model College & School</p>
                  <p className="text-gray-600 text-sm">G.T Road Iraq Stop Akora Khattak</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#0068A8]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#0068A8]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001830] text-sm">Phone</h3>
                  <a
                    href="tel:0923630075"
                    className="text-gray-600 text-sm hover:text-[#0068A8] transition-colors"
                  >
                    0923-630075
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#188454]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#188454]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001830] text-sm">Email Address</h3>
                  <a
                    href="mailto:info@khyber.edu.pk"
                    className="text-gray-600 text-sm hover:text-[#0068A8] transition-colors"
                  >
                    info@khyber.edu.pk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#001830] text-sm">Office Hours</h3>
                  <p className="text-gray-600 text-sm">Mon-Fri: 8:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm h-full">
            <h2 className="font-bold text-[#001830] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0068A8]" aria-hidden="true" />
              Find Us Here
            </h2>
            <div className="rounded-lg overflow-hidden bg-gray-100 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d88340.73709618849!2d72.1057257!3d34.0025627!3m2!1i1024!2i768!4f13.1!2m1!1skhyber%20model%20college%20nowshera!5e1!3m2!1sen!2s!4v1783496171969!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Khyber Model College and School Location Map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;