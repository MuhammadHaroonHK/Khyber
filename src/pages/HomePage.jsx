// src/pages/HomePage.jsx
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Award,
  ShieldCheck,
  Calendar,
  Target,
  Eye,
  Users,
  School,
  Coins,
  Briefcase,
  Flame,
  Compass,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const useCountUp = (targetNumber, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!startOnView) {
      animateNumber();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateNumber();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [targetNumber, duration, startOnView, hasAnimated]);

  const animateNumber = () => {
    const startTime = Date.now();
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(targetNumber);
      }
    };
    requestAnimationFrame(updateCount);
  };

  return { count, countRef };
};

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

const HomePage = () => {
  const stats = [
    { number: 3000, label: "Students", color: "#38bdf8", suffix: "+" },
    { number: 250, label: "Faculty", color: "#f87171", suffix: "+" },
    { number: 95, label: "Passing Rate", color: "#fbbf24", suffix: "%" },
  ];

  const stat1 = useCountUp(stats[0].number, 2000);
  const stat2 = useCountUp(stats[1].number, 1800);
  const stat3 = useCountUp(stats[2].number, 2200);
  const countResults = [stat1, stat2, stat3];

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ─── HERO SECTION ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-white"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/Background/background.jfif"
            // https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1800
            alt="School Campus Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-950/65"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/20 to-gray-950/90"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full pt-36 lg:pt-44 pb-16 flex flex-col items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 },
              },
            }}
            className="space-y-8 max-w-4xl text-center flex flex-col items-center"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance"
            >
              <span>THE BEST GUIDELINE</span>
              <br />
              <span className="text-[#E4E454] drop-shadow-md">
                FOR YOUR KIDS
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mx-auto"
            >
              Khyber Model College & School is a trusted educational institution in
              Akora Khattak, dedicated to shaping future leaders through quality
              education, discipline, and character development.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full"
            >
              <a
                href="https://forms.gle/WzdSaumBGdREZofr5"
                target="_blank"
                rel="noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#0068A8] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 shadow-xl hover:bg-[#E52E2E] transition-all duration-300 group"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>

              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-gray-950 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Counters */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                },
              }}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 md:pt-12 w-full max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  ref={countResults[index].countRef}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gray-950/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 shadow-2xl text-center flex flex-col items-center justify-center"
                >
                  <div
                    className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight"
                    style={{ color: stat.color }}
                  >
                    {countResults[index].count}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm mt-1.5 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION & GOALS SECTION ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/60 shadow-md group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 bg-sky-500/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:bg-sky-500/10" />
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-sky-50 rounded-xl text-sky-600 shadow-inner">
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

            {/* Our Strategic Goals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/60 shadow-md group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 bg-[#0068A8]/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:bg-[#0068A8]/10" />
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-red-50 rounded-xl text-[#0068A8] shadow-inner">
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

      {/* ─── PRINCIPAL'S MESSAGE SECTION ─── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            {/* Message Content (Left Column) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 order-2 lg:order-1 space-y-6 text-center lg:text-left"
            >
              <div className="space-y-2">
                <span className="text-[#0068A8] text-sm font-semibold tracking-wider uppercase inline-block bg-blue-50 px-3 py-1 rounded-full">
                  Welcome to Khyber Model
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Message from the Principal
                </h2>
              </div>
              <div className="h-1 w-20 bg-[#0068A8] rounded mx-auto lg:mx-0"></div>

              <div className="text-gray-600 space-y-4 leading-relaxed text-base">
                <p className="italic font-medium text-gray-800 text-lg">
                  "THE BEST GUIDELINE FOR YOUR KIDS"
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos tempore vero illum consectetur deleniti, ea velit non sed assumenda repellendus laudantium voluptatum recusandae doloremque odio natus pariatur provident minus possimus?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores cum veritatis dolorum, placeat, corrupti dolorem provident qui distinctio odit necessitatibus dicta molestiae magnam ea exercitationem cumque iure molestias nihil sequi?
                </p>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolores inventore nobis, necessitatibus veritatis eum cumque, cum fugiat obcaecati totam, ipsam blanditiis explicabo magnam rerum non facilis enim voluptatibus impedit.

                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Principal Name
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    Principal, Khyber Model
                  </p>
                </div>
                <Link to="/about">
                  <span className="text-sm font-semibold text-[#0068A8] inline-flex items-center gap-1.5 hover:underline cursor-pointer group">
                    Read our Full Mission
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Adaptive Image Box (Right Column) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center"
            >
              <div className="relative group w-full max-w-[200px] sm:max-w-[280px] lg:max-w-none">
                {/* Visual Accent Back Drop Layer - Hidden on rounded-full viewports (mobile/md) */}
                <div className="hidden lg:block absolute inset-0 bg-[#0068A8] rounded-2xl transform translate-x-3 translate-y-3 z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>

                {/* Image Wrapper Container with responsive masks */}
                <div className="relative z-10 overflow-hidden shadow-xl bg-gray-100 aspect-square lg:aspect-[4/5] rounded-full lg:rounded-2xl border-4 lg:border border-white lg:border-gray-200">
                  <img
                    src="/Principal/principal.jfif"
                    alt="Principal's Portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────────────────── */}
      <section className="py-20 bg-gray-100 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
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
              className="text-2xl md:text-3xl font-bold text-[#001830] text-center mb-12"
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
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group flex flex-col justify-between"
                >
                  <div>
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
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── QUICK DISCOVERY INFO / CTA BANNER ─── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-gradient-to-r from-[#001830] to-[#001830] rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="space-y-4 text-center md:text-left max-w-xl relative z-10">
              <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-400 text-xs font-bold tracking-wider uppercase">
                <Calendar className="w-4 h-4" />
                <span>Admissions Open</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Give Your Child the Best Start for a Bright Future
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                Discover our academic programs, modern facilities, and
                supportive learning environment. Learn why families trust us to
                provide quality education for every student.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10 shrink-0">
              <Link to="/campus-tour" className="w-full sm:w-auto">
                <button className="w-full bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm shadow-md">
                  Explore Campus
                </button>
              </Link>

              <Link to="/academics" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm">
                  View Programs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
