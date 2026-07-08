// src/components/About.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Target,
  Eye,
  Heart,
  GraduationCap,
  School,
  Clock,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── About Component ──────────────────────────────────────────────
const AboutPage = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Core values
  const coreValues = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To nurture young minds with knowledge, skills, and values that enable them to become responsible citizens and future leaders of Pakistan.",
      color: "#001830",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be a center of excellence in education, producing graduates who are academically proficient, morally upright, and socially responsible.",
      color: "#0068A8",
    },
    {
      icon: Heart,
      title: "Core Values",
      description:
        "Integrity, Excellence, Respect, and Innovation form the foundation of our educational philosophy and daily practices.",
      color: "#E4E454",
    },
  ];

  // Key features
  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description:
        "Comprehensive curriculum aligned with modern educational standards.",
      color: "#001830",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "Dedicated teachers with years of experience and advanced degrees.",
      color: "#0068A8",
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description:
        "Consistently high passing rates and outstanding student achievements.",
      color: "#E4E454",
    },
    {
      icon: School,
      title: "Modern Facilities",
      description:
        "State-of-the-art labs, library, and sports facilities for holistic development.",
      color: "#188454",
    },
  ];

  // Milestones
  const milestones = [
    {
      year: "1997",
      title: "Foundation Laid",
      description:
        "Khyber Model College & School was established with a vision for quality education.",
    },
    {
      year: "2000",
      title: "College Section Added",
      description:
        "Expanded to include Intermediate programs for higher education.",
    },
    {
      year: "2010",
      title: "Science Labs Upgraded",
      description:
        "Modern laboratories equipped for practical learning experiences.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Integrated technology and online learning resources.",
    },
  ];

  // Scroll Performance Optimization: Play when visible, Pause when scrolled away
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    const observerOptions = {
      root: null,
      threshold: 0.25,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentVideo.play().catch((error) => {
            console.log(
              "Autoplay deferred until manual user interaction:",
              error,
            );
          });
        } else {
          currentVideo.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );
    observer.observe(currentVideo);

    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 md:py-28 bg-white relative overflow-hidden"
    >
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
                staggerChildren: 0.15,
              },
            },
          }}
          className="text-center mb-16"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[#0068A8] font-semibold text-sm uppercase tracking-wider"
          >
            About Us
          </motion.span>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001830] mt-2"
          >
            Shaping Futures Since 1997
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-gray-600 max-w-3xl mx-auto mt-6 text-base md:text-lg leading-relaxed"
          >
            Khyber Model College & School, Akora Khattak is a leading
            educational institution dedicated to providing quality education to
            students in Khyber Pakhtunkhwa, Pakistan.
          </motion.p>
        </motion.div>

        {/* ─── Optimized Video Section ──────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-4xl mx-auto px-4"
        >
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group">
            {/* Aspect Ratio Wrapper */}
            <div className="relative aspect-video w-full h-full bg-black">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                muted // Static muted property keeps autoplay working safely across browsers
                playsInline
                loop
                controls // Browser default volume/mute buttons live perfectly here
                preload="metadata"
                poster="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000&auto=format&fit=crop"
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src="/videos/sms_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>

        {/* ─── Features Section ────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="mb-16"
        >
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-2xl md:text-3xl font-bold text-[#001830] text-center mb-8"
          >
            Why Choose SMS?
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    className="w-7 h-7 md:w-8 md:h-8"
                    style={{ color: feature.color }}
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-[#001830] mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Milestones Timeline ────────────────────────────────── */}
        {/* ─── Milestones Timeline ────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          className="mb-16"
        >
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-2xl md:text-3xl font-bold text-[#001830] text-center mb-4"
          >
            Our Journey
          </motion.h3>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-gray-500 text-center max-w-2xl mx-auto mb-12 px-4"
          >
            A legacy of excellence spanning decades, marked by key milestones
            that have shaped our institution
          </motion.p>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line - Desktop */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-[90%] bg-[#001830]/10 hidden md:block"
              style={{ top: "5%", transformOrigin: "top" }}
            ></motion.div>

            <div className="space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:flex-row py-8`}
                >
                  {/* ─── DESKTOP VERSION ─── */}
                  <div className="hidden md:block w-full md:w-5/12">
                    <motion.div
                      className={`${
                        index % 2 === 0
                          ? "md:text-right md:pr-12"
                          : "md:text-left md:pl-12"
                      }`}
                      initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? -50 : 50,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.12,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <motion.div
                        className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 ${
                          index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                        }`}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <motion.span
                            className="inline-block text-sm font-bold text-[#0068A8] bg-[#0068A8]/10 px-3 py-1 rounded-full"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1 + 0.2,
                              type: "spring",
                              stiffness: 200,
                            }}
                          >
                            {milestone.year}
                          </motion.span>
                        </div>
                        <motion.h4
                          className="text-lg font-bold text-[#001830]"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.3,
                          }}
                        >
                          {milestone.title}
                        </motion.h4>
                        <motion.p
                          className="text-gray-500 text-sm mt-1 leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.4,
                          }}
                        >
                          {milestone.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Timeline Center - Desktop */}
                  <div className="hidden md:flex w-2/12 justify-center items-center relative">
                    {/* Connecting Line */}
                    <motion.div
                      className={`absolute w-8 h-0.5 bg-[#001830]/10 ${
                        index % 2 === 0 ? "right-1/2" : "left-1/2"
                      }`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    ></motion.div>

                    {/* Dot */}
                    <motion.div
                      className="relative z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <div className="w-4 h-4 rounded-full bg-[#001830] border-4 border-white shadow-md flex items-center justify-center">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-white"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.3,
                          }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty spacer - Desktop */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* ─── MOBILE VERSION ─── */}
                  <motion.div
                    className="flex md:hidden items-start gap-4 w-full mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-[#001830] border-2 border-white shadow-sm mt-1 flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      ></motion.div>
                      {index < milestones.length - 1 && (
                        <motion.div
                          className="w-0.5 h-12 bg-[#001830]/10"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1 + 0.2,
                          }}
                        ></motion.div>
                      )}
                    </div>
                    <div className="flex-1">
                      <motion.span
                        className="text-xs font-bold text-[#0068A8] bg-[#0068A8]/10 px-2 py-0.5 rounded-full inline-block"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1 + 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {milestone.year}
                      </motion.span>
                      <motion.h4
                        className="text-base font-bold text-[#001830] mt-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      >
                        {milestone.title}
                      </motion.h4>
                      <motion.p
                        className="text-gray-500 text-xs mt-0.5 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                      >
                        {milestone.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
