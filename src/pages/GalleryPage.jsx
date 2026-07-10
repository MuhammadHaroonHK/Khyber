// src/pages/GalleryPage.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { 
  X, 
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  Sparkles
} from 'lucide-react';

// ─── Gallery Images Data ──────────────────────────────────────────
const galleryImages = [
  { id: 1, title: 'Annual Sports Day', category: 'Events', image: '/Gallery/1.jpg', description: 'Students participating in various sports activities' },
  { id: 2, title: 'Science Exhibition', category: 'Academics', image: '/Gallery/2.jpg', description: 'Innovative science projects by our talented students' },
  { id: 3, title: 'Graduation Ceremony', category: 'Events', image: '/Gallery/3.jfif', description: 'Celebrating academic achievements of our graduates' },
  { id: 4, title: 'Library Session', category: 'Academics', image: '/Gallery/4.jfif', description: 'Students engaged in reading and research' },
  { id: 5, title: 'Cultural Day', category: 'Events', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', description: 'Celebrating diversity through cultural performances' },
  { id: 6, title: 'Computer Lab', category: 'Facilities', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', description: 'Modern computer lab with latest technology' },
  { id: 7, title: 'Sports Ground', category: 'Facilities', image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80', description: 'Well-maintained sports facilities for students' },
  { id: 8, title: 'Art Exhibition', category: 'Events', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80', description: 'Creative artwork by our talented students' },
  { id: 9, title: 'Classroom Learning', category: 'Academics', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80', description: 'Interactive learning environment in classrooms' },
  { id: 10, title: 'Classroom Learning', category: 'Academics', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', description: 'Interactive learning environment in classrooms' },
  { id: 11, title: 'Classroom Learning', category: 'Academics', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', description: 'Interactive learning environment in classrooms' },
  { id: 12, title: 'Classroom Learning', category: 'Academics', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80', description: 'Interactive learning environment in classrooms' },
  { id: 13, title: 'Classroom Learning', category: 'Academics', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', description: 'Interactive learning environment in classrooms' },
];

const categories = ['All', 'Events', 'Academics', 'Facilities'];

// ─── GPU-Accelerated 3D Gallery Card Sub-Component ────────
const GalleryCard = memo(({ image, index, onSelect }) => {
  const isEager = index < 4;

  return (
    <motion.div
      onClick={() => onSelect(index)}
      initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.2) }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        rotateX: -4,
        rotateY: 4,
        z: 30,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white p-2 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,24,48,0.12)] transition-shadow duration-300 will-change-transform"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100" style={{ transform: "translateZ(10px)" }}>
        <img
          src={image.image}
          alt={image.title}
          loading={isEager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isEager ? "high" : "low"}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
        />
        
        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Floating Category Tag inside 3D space */}
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="absolute top-3 left-3 bg-[#001830]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-md border border-white/10"
        >
          {image.category}
        </div>
      </div>

      {/* Info Space below or overlaying bottom seamlessly */}
      <div className="p-3 text-left mt-1" style={{ transform: "translateZ(15px)" }}>
        <h4 className="text-[#001830] font-extrabold text-sm md:text-base tracking-tight truncate group-hover:text-[#0068A8] transition-colors duration-200">
          {image.title}
        </h4>
        <p className="text-gray-500 text-xs truncate mt-0.5">{image.description}</p>
      </div>
    </motion.div>
  );
});

GalleryCard.displayName = 'GalleryCard';

// ─── Main Gallery Component ───────────────────────────────────────
const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredImages = useMemo(() => {
    return selectedCategory === 'All' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  const activeImage = useMemo(() => {
    if (selectedIndex === null) return null;
    return filteredImages[selectedIndex] || null;
  }, [selectedIndex, filteredImages]);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }, []);

  const handleSelectImage = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handlePrevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : prev));
  }, [filteredImages.length]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  }, [handleNextImage, handlePrevImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrevImage, handleNextImage]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden min-h-screen">
      
      {/* Dynamic Structural Blurred 3D Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E4E454]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Modern Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#0068A8]/10 text-[#0068A8] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            
            <span>Photo Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#001830] tracking-tight">
            Campus Life Gallery
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto pt-2 text-sm md:text-base leading-relaxed">
            Take a beautiful look through unforgettable moments, achievements, and everyday student experiences at Khyber Model.
          </p>
        </div>

        {/* Category Filter */}
        <div className="relative mb-12 flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center max-w-full overflow-hidden">
            <button
              onClick={scrollLeft}
              className="hidden md:flex p-2 rounded-xl text-gray-400 hover:text-[#001830] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-1.5 overflow-x-auto px-1 py-0.5 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                    selectedCategory === category
                      ? 'bg-[#001830] text-white shadow-md shadow-[#001830]/10'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#001830]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="hidden md:flex p-2 rounded-xl text-gray-400 hover:text-[#001830] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="popLayout">
          {filteredImages.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <GalleryCard 
                  key={image.id}
                  image={image}
                  index={index}
                  onSelect={handleSelectImage}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm"
            >
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700">No media found</h3>
              <p className="text-gray-400 text-sm mt-1">Try switching to another category folder.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox 3D Spatial Presentation Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-gray-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 select-none"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[92vh] border border-gray-100"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Modern Floating Action Close */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 z-30 bg-white hover:bg-gray-100 text-gray-900 p-2.5 rounded-full shadow-lg transition-all duration-200 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Desktop Trigger */}
                {selectedIndex > 0 && (
                  <button
                    onClick={handlePrevImage}
                    className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Right Desktop Trigger */}
                {selectedIndex < filteredImages.length - 1 && (
                  <button
                    onClick={handleNextImage}
                    className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Responsive Left Asset Side */}
                <div className="relative bg-gray-950 flex items-center justify-center flex-1 md:max-w-[60%] lg:max-w-[65%] min-h-[260px] sm:min-h-[380px] md:min-h-[500px]">
                  <img
                    key={activeImage.id}
                    src={activeImage.image}
                    alt={activeImage.title}
                    className="w-full h-full object-contain max-h-[50vh] md:max-h-[75vh]"
                  />
                </div>

                {/* Info Description Block Sidebar */}
                <div className="p-6 md:p-8 flex flex-col justify-between bg-white w-full md:max-w-[40%] lg:max-w-[35%] border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-[#0068A8] bg-[#0068A8]/10 px-2.5 py-1 rounded-md uppercase">
                        {activeImage.category}
                      </span>
                      <span className="text-xs text-gray-300 font-medium">/</span>
                      <span className="text-xs text-gray-400 font-semibold tracking-wider">
                        ITEM {selectedIndex + 1} OF {filteredImages.length}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#001830] tracking-tight leading-tight">
                      {activeImage.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {activeImage.description}
                    </p>
                  </div>

                  {/* Inline Mobile-only Bottom Slide Controls */}
                  <div className="flex lg:hidden items-center justify-between pt-6 border-t border-gray-100 mt-6">
                    <button 
                      onClick={handlePrevImage}
                      disabled={selectedIndex === 0}
                      className="flex items-center gap-1 text-xs font-bold text-gray-600 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    <button 
                      onClick={handleNextImage}
                      disabled={selectedIndex === filteredImages.length - 1}
                      className="flex items-center gap-1 text-xs font-bold text-gray-600 disabled:opacity-30"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GalleryPage;