// src/pages/HomePage.jsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  Eye,
  GraduationCap,
  School,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_IMAGE_URL } from "../App";

// ─── 1. VIEWPORT-GATED SECTION LOADER (Mounts only when user scrolls near) ───
function LazySection({ children, minHeight = "300px" }) {
  const [shouldRender, setShouldRender] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef} style={{ minHeight: shouldRender ? "auto" : minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}

// ─── 2. SILKY-SMOOTH ZERO-RERENDER COUNTER ───
function SmoothCounter({ target, suffix = "", duration = 1800, start, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!start || !ref.current) return;

    let rafId;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (ref.current) {
        ref.current.textContent = `${current}${suffix}`;
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, suffix, duration]);

  return (
    <div ref={ref} className={className} style={style}>
      0{suffix}
    </div>
  );
}

// ─── 3. SPRING-SMOOTH 3D CARD ───
function Interactive3DCard({ children, className }) {
  const cardRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 25 });
  const y = useSpring(rawY, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set(event.clientX - rect.left - rect.width / 2);
    rawY.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

const features = [
  {
    icon: GraduationCap,
    title: "Quality Education",
    description:
      "A modern curriculum designed to help students learn and grow with confidence.",
    color: "#001830",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description:
      "Experienced and qualified teachers who support every student's success.",
    color: "#0068A8",
  },
  {
    icon: Award,
    title: "Academic Excellence",
    description:
      "Excellent academic results achieved through quality teaching and hard work.",
    color: "#E4E454",
  },
  {
    icon: School,
    title: "Modern Facilities",
    description:
      "Well-equipped classrooms, science labs, library, and sports facilities.",
    color: "#188454",
  },
];

const stats = [
  { number: 3000, label: "Students", color: "#38bdf8", suffix: "+", duration: 1800 },
  { number: 250, label: "Faculty", color: "#f87171", suffix: "+", duration: 1600 },
  { number: 95, label: "Passing Rate", color: "#fbbf24", suffix: "%", duration: 2000 },
];

const HomePage = ({ isAppReady = true }) => {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ─── HERO SECTION (Loads Immediately) ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-white"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-35"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full opacity-35"
            style={{
              background: "radial-gradient(circle, rgba(5,150,105,0.35) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE_URL}
            alt="School Campus Background"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/65 to-gray-950/95" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20 w-full pt-36 lg:pt-44 pb-16 flex flex-col items-center justify-center">
          <motion.div
            initial="hidden"
            animate={isAppReady ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
            className="space-y-8 max-w-4xl text-center flex flex-col items-center"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-balance"
            >
              <span>THE BEST GUIDELINE</span>
              <br />
              <span className="text-[#E4E454] drop-shadow-[0_4px_12px_rgba(228,228,84,0.25)]">
                FOR YOUR KIDS
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mx-auto drop-shadow-md"
            >
              Khyber Model College & School is a trusted educational institution in
              Akora Khattak, dedicated to shaping future leaders through quality
              education, discipline, and character development.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full"
            >
              <a
                href="https://forms.gle/WzdSaumBGdREZofr5"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-[#0068A8] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-xl hover:bg-[#E52E2E] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 group">
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </a>

              <Link to="/about">
                <button className="bg-gray-900/75 hover:bg-white hover:text-gray-950 text-white border border-white/25 px-8 py-4 rounded-xl font-semibold hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
                  Learn More
                </button>
              </Link>
            </motion.div>

            {/* Counters */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 md:pt-12 w-full max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-900/85 rounded-2xl p-4 md:p-6 border border-white/15 shadow-2xl text-center flex flex-col items-center justify-center hover:-translate-y-1 hover:border-white/30 transition-all duration-200"
                >
                  <SmoothCounter
                    target={stat.number}
                    suffix={stat.suffix}
                    duration={stat.duration}
                    start={isAppReady}
                    className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight tabular-nums"
                    style={{ color: stat.color }}
                  />
                  <div className="text-gray-300 text-xs sm:text-sm mt-2 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION & GOALS SECTION (Mounts on Scroll) ─── */}
      <LazySection minHeight="400px">
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/40 border border-gray-200/80 shadow-sm group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 bg-sky-500/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:p-14" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-sky-50 rounded-2xl text-sky-600 shadow-inner">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Our mission is to provide a safe, supportive, and inspiring learning environment where students can grow academically, morally, and personally. We aim to help every student build knowledge, confidence, and strong values so they can become responsible and successful members of society.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/40 border border-gray-200/80 shadow-sm group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 bg-[#0068A8]/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:p-14" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-blue-50 rounded-2xl text-[#0068A8] shadow-inner">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Our Strategic Goals
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Our goal is to provide high-quality education through effective teaching, regular assessments, and continuous improvement. We are committed to helping every student achieve academic success while enhancing our facilities and creating a modern learning environment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* ─── PRINCIPAL'S MESSAGE SECTION (Mounts on Scroll) ─── */}
      <LazySection minHeight="500px">
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="lg:col-span-7 order-2 lg:order-1 space-y-6 text-center lg:text-left"
              >
                <div className="space-y-2">
                  <span className="text-[#0068A8] text-xs font-bold tracking-wider uppercase inline-block bg-blue-50 px-4 py-1.5 rounded-full">
                    Welcome to Khyber Model
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    Message from the Principal
                  </h2>
                </div>
                <div className="h-1 w-20 bg-[#0068A8] rounded mx-auto lg:mx-0"></div>

                <div className="text-gray-600 space-y-4 leading-relaxed text-base">
                  <p className="italic font-semibold text-gray-800 text-lg">
                    "THE BEST GUIDELINE FOR YOUR KIDS"
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos tempore vero illum consectetur deleniti, ea velit non sed assumenda repellendus laudantium voluptatum recusandae doloremque odio natus pariatur provident minus possimus?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores cum veritatis dolorum, placeat, corrupti dolorem provident qui distinctio odit necessitatibus dicta molestiae magnam ea exercitationem cumque iure molestias nihil sequi?
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Principal Name
                    </h4>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">
                      Principal, Khyber Model
                    </p>
                  </div>
                  <Link to="/about">
                    <span className="text-sm font-semibold text-[#0068A8] inline-flex items-center gap-1.5 hover:text-[#E52E2E] transition-colors cursor-pointer group">
                      Read our Full Mission
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center"
              >
                <div className="relative group w-full max-w-[240px] sm:max-w-[300px] lg:max-w-none">
                  <div className="hidden lg:block absolute inset-0 bg-[#0068A8] rounded-3xl transform translate-x-4 translate-y-4 z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <div className="relative z-10 overflow-hidden shadow-2xl bg-gray-100 aspect-square lg:aspect-[4/5] rounded-full lg:rounded-3xl border-4 lg:border border-white lg:border-gray-100">
                    <img
                      src="/Principal/principal.jfif"
                      alt="Principal's Portrait"
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* ─── FEATURES SECTION (Mounts on Scroll) ─── */}
      <LazySection minHeight="450px">
        <section className="py-24 bg-gray-50 border-y border-gray-200/50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="mb-16 text-center">
              <span className="text-[#0068A8] text-xs font-bold tracking-wider uppercase inline-block bg-blue-50 px-4 py-1.5 rounded-full mb-3">
                Our Pride
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#001830] tracking-tight">
                Why Choose Our Institution?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Interactive3DCard
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center group flex flex-col h-full cursor-grab active:cursor-grabbing hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center justify-between h-full">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <feature.icon
                        className="w-8 h-8"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-[#001830] mb-3 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Interactive3DCard>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* ─── QUICK DISCOVERY INFO / CTA BANNER (Mounts on Scroll) ─── */}
      <LazySection minHeight="320px">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-br from-[#001830] to-[#003366] rounded-3xl p-8 md:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="space-y-4 text-center lg:text-left max-w-xl relative z-10">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-yellow-400 text-xs font-bold tracking-wider uppercase">
                  <Calendar className="w-4 h-4 animate-pulse" />
                  <span>Admissions Open 2026</span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                  Give Your Child the Best Start for a Bright Future
                </h3>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Discover our academic programs, modern facilities, and supportive learning environment. Learn why families trust us to provide quality education.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10 shrink-0 justify-center">
                <Link to="/campus-tour" className="w-full sm:w-auto">
                  <button className="w-full bg-white text-gray-900 font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all text-sm shadow-lg">
                    Explore Campus
                  </button>
                </Link>

                <Link to="/academics" className="w-full sm:w-auto">
                  <button className="w-full bg-white/10 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all text-sm">
                    View Programs
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </LazySection>
    </div>
  );
};

export default HomePage;