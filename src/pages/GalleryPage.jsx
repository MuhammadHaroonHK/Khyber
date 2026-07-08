import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { 
  X, 
  ZoomIn, 
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

// ─── Gallery Images Data ──────────────────────────────────────────
const galleryImages = [
  { id: 1, title: 'Annual Sports Day', category: 'Events', image: '/Gallery/1.jpg', description: 'Students participating in various sports activities' },
  { id: 2, title: 'Science Exhibition', category: 'Academics', image: '/Gallery/2.jpg', description: 'Innovative science projects by our talented students' },
  { id: 3, title: 'Graduation Ceremony', category: 'Events', image: '/Gallery/3.jpg', description: 'Celebrating academic achievements of our graduates' },
  { id: 4, title: 'Library Session', category: 'Academics', image: '/Gallery/4.jpg', description: 'Students engaged in reading and research' },
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

// ─── Pure CSS & GPU-Accelerated Gallery Card Sub-Component ────────
const GalleryCard = memo(({ image, index, onSelect }) => {
  const isEager = index < 4;

  return (
    <div
      onClick={() => onSelect(index)}
      className="group relative overflow-hidden rounded-xl cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 will-change-transform"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-200">
        <img
          src={image.image}
          alt={image.title}
          width={500}
          height={500}
          loading={isEager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isEager ? "high" : "low"}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#001830] text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 pointer-events-none">
          {image.category}
        </div>
        
        {/* Image Info - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
          <h4 className="text-white font-bold text-sm md:text-base">{image.title}</h4>
          <p className="text-white/80 text-xs mt-1">{image.description}</p>
        </div>

        {/* Zoom Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
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

  // Handle Mobile Touch Swiping (GPU Efficient Native Touch Listeners)
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance in pixels

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  }, [handleNextImage, handlePrevImage]);

  // Handle Hotkeys (Esc, Left, Right Arrows)
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

  // Prevent background scroll setup
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-16 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#001830]/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#E4E454]/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#0068A8] font-semibold text-sm uppercase tracking-wider block">
            Memories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001830] mt-2">
            Photo Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
            Explore memorable moments captured at Khyber Model College & School
          </p>
        </div>

        {/* Category Filter */}
        <div className="relative mb-10">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={scrollLeft}
              className="hidden md:flex p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#001830] hover:text-white group animate-none"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-white" />
            </button>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto px-1 py-2 scrollbar-hide scroll-smooth flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap active:scale-95 transform ${
                    selectedCategory === category
                      ? 'bg-[#001830] text-white shadow-lg shadow-[#001830]/20'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#001830] hover:text-[#001830]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="hidden md:flex p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#001830] hover:text-white group animate-none"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <GalleryCard 
                key={image.id}
                image={image}
                index={index}
                onSelect={handleSelectImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No images found</h3>
            <p className="text-gray-400 mt-2">Try selecting a different category</p>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
              style={{ 
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 80px)',
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)'
              }}
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] md:max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 md:p-2.5 rounded-full transition-all duration-300 transform active:scale-95"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Desktop Left Navigation Arrow */}
                {selectedIndex > 0 && (
                  <button
                    onClick={handlePrevImage}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 active:scale-90"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Desktop Right Navigation Arrow */}
                {selectedIndex < filteredImages.length - 1 && (
                  <button
                    onClick={handleNextImage}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 active:scale-90"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Image Container */}
                <div className="relative bg-[#001830] flex items-center justify-center" style={{ minHeight: '300px', maxHeight: '70vh' }}>
                  <img
                    key={activeImage.id} // Forces clean re-render for fluid tracking changes
                    src={activeImage.image}
                    alt={activeImage.title}
                    decoding="async"
                    loading="eager"
                    className="w-full h-full max-h-[70vh] object-contain pointer-events-none"
                  />
                </div>

                {/* Image Info */}
                <div className="p-4 md:p-6 bg-white">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <span className="text-xs font-bold text-[#0068A8] bg-[#0068A8]/10 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">
                      {activeImage.category}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">#{String(activeImage.id).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-[#001830]">{activeImage.title}</h3>
                  <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2">{activeImage.description}</p>
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