import { useEffect, useRef, useState } from "react";
import { Target, Eye, Heart } from "lucide-react";
import { Reveal } from "../components/Reveal";

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
    color: "#188454",
  },
];

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

const AboutPage = () => {
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Auto-play/pause campus video based on visibility
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentVideo.play().catch(() => {});
          } else {
            currentVideo.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(currentVideo);
    return () => observer.disconnect();
  }, []);

  // GPU-composited scroll progress line for the timeline (zero React re-renders)
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const container = timelineRef.current;
      const line = progressLineRef.current;
      if (!container || !line) {
        ticking = false;
        return;
      }

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startPoint = viewportHeight * 0.72;
      const totalDistance = rect.height;

      const scrolled = startPoint - rect.top;
      const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);

      line.style.transform = `scaleY(${progress})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header (Immediate paint for fast LCP) */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#0068A8]/10 text-[#0068A8] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#001830] mt-3 tracking-tight">
            Shaping Futures Since 1997
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto mt-5 text-base md:text-lg leading-relaxed">
            Khyber Model College & School, Akora Khattak is a leading
            educational institution dedicated to providing quality education to
            students in Khyber Pakhtunkhwa, Pakistan.
          </p>
        </div>

        {/* Video Section (Zoom-In Reveal) */}
        <Reveal variant="zoom-in" duration={600} className="mb-16 max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
                muted
                playsInline
                loop
                controls
                preload="metadata"
                poster="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=70&w=900&auto=format&fit=crop"
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src="/videos/khyber_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Reveal>

        {/* Core Values (Staggered Fade-Up) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {coreValues.map((item, index) => (
            <Reveal
              key={item.title}
              variant="fade-up"
              delay={index * 100}
              className="h-full"
            >
              <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200/70 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: item.color }}
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-xl font-bold text-[#001830] mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Milestones Timeline (Scroll-Driven Line + Alternating Reveals) */}
        <div>
          <Reveal variant="fade" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#001830] mb-3">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A legacy of excellence spanning decades, marked by key milestones
              that have shaped our institution.
            </p>
          </Reveal>

          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Static Background Spine (Mobile left, Desktop center) */}
            <div
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 h-[92%] bg-[#001830]/10 top-[4%]"
              aria-hidden="true"
            />

            {/* Animated Scroll-Fill Spine (GPU scaleY only) */}
            <div
              ref={progressLineRef}
              style={{ transform: "scaleY(0)", transformOrigin: "top" }}
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 h-[92%] bg-gradient-to-b from-[#0068A8] to-[#188454] top-[4%] will-change-transform"
              aria-hidden="true"
            />

            <div className="space-y-6 md:space-y-0">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row items-center py-3 md:py-6 pl-10 md:pl-0 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Mobile Timeline Node */}
                    <div
                      className="md:hidden absolute left-[9px] top-9 w-3.5 h-3.5 rounded-full bg-[#0068A8] border-2 border-white shadow"
                      aria-hidden="true"
                    />

                    {/* Milestone Card */}
                    <div className="w-full md:w-5/12">
                      <Reveal
                        variant={isEven ? "slide-left" : "slide-right"}
                        delay={80}
                      >
                        <div
                          className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#0068A8]/30 transition-all duration-200 ${
                            isEven ? "md:mr-6" : "md:ml-6"
                          }`}
                        >
                          <span className="inline-block text-xs font-bold text-[#0068A8] bg-[#0068A8]/10 px-3 py-1 rounded-full mb-2">
                            {milestone.year}
                          </span>
                          <h3 className="text-lg font-bold text-[#001830]">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </Reveal>
                    </div>

                    {/* Desktop Center Node */}
                    <div className="hidden md:flex w-2/12 justify-center items-center relative">
                      <Reveal variant="zoom-in" delay={120}>
                        <div className="w-4 h-4 rounded-full bg-[#0068A8] border-4 border-white shadow-md ring-4 ring-[#0068A8]/15" />
                      </Reveal>
                    </div>

                    <div className="hidden md:block w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;