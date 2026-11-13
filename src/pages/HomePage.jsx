import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { HERO_IMAGE_URL } from "../App";

function SmoothCounter({ target, suffix = "", duration = 2000, className, style }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return (
    <div className={`tabular-nums ${className}`} style={style}>
      {count.toLocaleString("en-US")}
      {suffix}
    </div>
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
    color: "#b48a00",
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
  { number: 3000, label: "Students", color: "#38bdf8", suffix: "+" },
  { number: 50, label: "Faculty", color: "#f87171", suffix: "+" },
  { number: 95, label: "Passing Rate", color: "#fbbf24", suffix: "%" },
];

const HomePage = () => {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ─── HERO SECTION ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-white"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE_URL}
            alt="Khyber Model College and School Campus"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950/95" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20 w-full pt-36 lg:pt-44 pb-16 flex flex-col items-center justify-center">
          <div className="space-y-8 max-w-4xl text-center flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-balance">
              <span>THE BEST GUIDELINE</span>
              <br />
              <span className="text-[#E4E454]">FOR YOUR KIDS</span>
            </h1>

            <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
              Khyber Model College & School is a trusted educational institution
              in Akora Khattak, dedicated to shaping future leaders through
              quality education, discipline, and character development.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full">
              <a
                href="https://forms.gle/WzdSaumBGdREZofr5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0068A8] hover:bg-[#00558a] text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-xl transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/about"
                className="bg-gray-900/80 hover:bg-white hover:text-gray-950 text-white border border-white/25 px-8 py-4 rounded-xl font-semibold transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
              >
                Explore Our Story
              </Link>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 md:pt-12 w-full max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-900/85 rounded-2xl p-4 md:p-6 border border-white/15 shadow-xl text-center flex flex-col items-center justify-center"
                >
                  <SmoothCounter
                    target={stat.number}
                    suffix={stat.suffix}
                    className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight"
                    style={{ color: stat.color }}
                  />
                  <div className="text-gray-300 text-xs sm:text-sm mt-2 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION & GOALS SECTION ─── */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="sr-only">Our Mission and Strategic Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/40 border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-sky-50 rounded-2xl text-sky-600">
                  <Eye className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                Our mission is to provide a safe, supportive, and inspiring
                learning environment where students can grow academically,
                morally, and personally. We aim to help every student build
                knowledge, confidence, and strong values so they can become
                responsible and successful members of society.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/40 border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-blue-50 rounded-2xl text-[#0068A8]">
                  <Target className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Our Strategic Goals
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                Our goal is to provide high-quality education through effective
                teaching, regular assessments, and continuous improvement. We
                are committed to helping every student achieve academic success
                while enhancing our facilities and creating a modern learning
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRINCIPAL'S MESSAGE SECTION ─── */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-6 text-center lg:text-left">
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
                  At Khyber Model College & School, we believe that true
                  education goes beyond textbooks. Our commitment is to foster
                  critical thinking, moral integrity, and academic discipline in
                  every student who walks through our doors.
                </p>
                <p>
                  Working closely with parents and dedicated educators, we
                  strive to provide a structured, encouraging atmosphere where
                  young minds discover their strengths and prepare for higher
                  education and leadership.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Principal, Khyber Model
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-0.5">
                    Khyber Model College & School, Akora Khattak
                  </p>
                </div>
                <Link
                  to="/about"
                  className="text-sm font-semibold text-[#0068A8] inline-flex items-center gap-1.5 hover:text-[#004d7a] transition-colors group"
                >
                  Read our Full Mission
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-[240px] sm:max-w-[300px] lg:max-w-none">
                <div className="hidden lg:block absolute inset-0 bg-[#0068A8] rounded-3xl transform translate-x-4 translate-y-4 z-0"></div>
                <div className="relative z-10 overflow-hidden shadow-xl bg-gray-100 aspect-square lg:aspect-[4/5] rounded-full lg:rounded-3xl border-4 lg:border border-white lg:border-gray-100">
                  <img
                    src="/Principal/principal.jfif"
                    alt="Principal of Khyber Model College and School"
                    width="400"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="py-24 bg-gray-50 border-y border-gray-200/50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <span className="text-[#0068A8] text-xs font-bold tracking-wider uppercase inline-block bg-blue-50 px-4 py-1.5 rounded-full mb-3">
              Our Pride
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001830] tracking-tight">
              Why Choose Our Institution?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col items-center justify-between h-full">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon
                      className="w-8 h-8"
                      style={{ color: feature.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#001830] mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-gradient-to-br from-[#001830] to-[#003366] rounded-3xl p-8 md:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-xl">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-yellow-400 text-xs font-bold tracking-wider uppercase">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Admissions Open 2026</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
                Give Your Child the Best Start for a Bright Future
              </h2>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                Discover our academic programs, modern facilities, and
                supportive learning environment. Learn why families trust us to
                provide quality education.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-center">
              <Link
                to="/campus-tour"
                className="w-full sm:w-auto text-center bg-white text-gray-900 font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors text-sm shadow-lg"
              >
                Explore Campus
              </Link>

              <Link
                to="/academics"
                className="w-full sm:w-auto text-center bg-white/10 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-sm"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;