import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "../components/Reveal";

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    iconBg: "bg-[#001830]/10",
    iconColor: "text-[#001830]",
    lines: [
      { text: "Khyber Model College & School" },
      { text: "G.T Road Iraq Stop Akora Khattak" },
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    iconBg: "bg-[#0068A8]/10",
    iconColor: "text-[#0068A8]",
    lines: [{ text: "0923-630075", href: "tel:0923630075" }],
  },
  {
    icon: Mail,
    title: "Email Address",
    iconBg: "bg-[#188454]/10",
    iconColor: "text-[#188454]",
    lines: [{ text: "info@khyber.edu.pk", href: "mailto:info@khyber.edu.pk" }],
  },
  {
    icon: Clock,
    title: "Office Hours",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-700",
    lines: [
      { text: "Mon-Fri: 8:00 AM - 4:00 PM" },
      { text: "Saturday: 9:00 AM - 1:00 PM" },
    ],
  },
];

const ContactPage = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header (Immediate paint for fast LCP) */}
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
          <Reveal variant="slide-left" delay={0} className="h-full">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm h-full">
              <h2 className="text-2xl font-bold text-[#001830] mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal
                      key={item.title}
                      variant="fade-up"
                      delay={index * 70}
                      duration={450}
                    >
                      <div className="flex items-start gap-4 p-4 bg-[#f8f9ff] rounded-lg transition-colors duration-150 hover:bg-[#eef2ff]">
                        <div
                          className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`w-5 h-5 ${item.iconColor}`} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#001830] text-sm">
                            {item.title}
                          </h3>
                          {item.lines.map((line) =>
                            line.href ? (
                              <a
                                key={line.text}
                                href={line.href}
                                className="block text-gray-600 text-sm hover:text-[#0068A8] transition-colors"
                              >
                                {line.text}
                              </a>
                            ) : (
                              <p key={line.text} className="text-gray-600 text-sm">
                                {line.text}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal variant="slide-right" delay={120} className="h-full">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;