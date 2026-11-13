import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const galleryImages = [
  { id: 1, title: "Annual Sports Day", category: "Events", image: "/Gallery/1.jpg", description: "Students participating in various sports activities" },
  { id: 2, title: "Science Exhibition", category: "Academics", image: "/Gallery/2.jpg", description: "Innovative science projects by our talented students" },
  { id: 3, title: "Graduation Ceremony", category: "Events", image: "/Gallery/3.jfif", description: "Celebrating academic achievements of our graduates" },
  { id: 4, title: "Library Session", category: "Academics", image: "/Gallery/4.jfif", description: "Students engaged in reading and research" },
  { id: 5, title: "Cultural Day", category: "Events", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=70", description: "Celebrating diversity through cultural performances" },
  { id: 6, title: "Computer Lab", category: "Facilities", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=70", description: "Modern computer lab with latest technology" },
  { id: 7, title: "Sports Ground", category: "Facilities", image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=600&q=70", description: "Well-maintained sports facilities for students" },
  { id: 8, title: "Art Exhibition", category: "Events", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=70", description: "Creative artwork by our talented students" },
  { id: 9, title: "Classroom Learning", category: "Academics", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=70", description: "Interactive learning environment in classrooms" },
  { id: 10, title: "Science Workshop", category: "Academics", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=70", description: "Hands-on collaborative classroom activities" },
  { id: 11, title: "Group Study", category: "Academics", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=70", description: "Focused academic guidance and mentorship" },
  { id: 12, title: "Interactive Lecture", category: "Academics", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=70", description: "Engaging classroom instruction for students" },
  { id: 13, title: "Digital Learning", category: "Academics", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=70", description: "Modern educational tools in daily classes" },
];

const categories = ["All", "Events", "Academics", "Facilities"];

const GalleryCard = memo(({ image, index, onSelect }) => {
  const isEager = index < 4;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white p-2 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0068A8]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image.image}
          alt={image.title}
          width="600"
          height="450"
          loading={isEager ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-200 pointer-events-none" />
        <span className="absolute top-3 left-3 bg-[#001830]/90 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-md">
          {image.category}
        </span>
      </div>

      <div className="p-3 text-left mt-1">
        <h2 className="text-[#001830] font-bold text-sm md:text-base tracking-tight truncate group-hover:text-[#0068A8] transition-colors">
          {image.title}
        </h2>
        <p className="text-gray-500 text-xs truncate mt-0.5">{image.description}</p>
      </div>
    </div>
  );
});

GalleryCard.displayName = "GalleryCard";

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filterBarRef = useRef(null);
  const touchStartX = useRef(0);

  const filteredImages = useMemo(() => {
    return selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const activeImage = selectedIndex !== null ? filteredImages[selectedIndex] || null : null;

  // Prevent mobile viewport jump when filtered list becomes shorter than current scrollY
  const handleCategoryChange = useCallback((category) => {
    setSelectedIndex(null);
    setSelectedCategory(category);

    requestAnimationFrame(() => {
      if (filterBarRef.current) {
        const rect = filterBarRef.current.getBoundingClientRect();
        // If user scrolled down into the grid, keep the filter bar comfortably pinned in view
        if (rect.top < 80) {
          const targetY = window.scrollY + rect.top - 96;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "instant" });
        }
      }
    });
  }, []);

  const handleSelectImage = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handlePrevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextImage = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null && prev < filteredImages.length - 1 ? prev + 1 : prev
      );
    },
    [filteredImages.length]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) handleNextImage();
        else handlePrevImage();
      }
    },
    [handleNextImage, handlePrevImage]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrevImage, handleNextImage]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block bg-[#0068A8]/10 text-[#0068A8] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Photo Gallery
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#001830] tracking-tight">
            Campus Life Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto pt-2 text-sm md:text-base leading-relaxed">
            Take a look through memorable moments, achievements, and everyday student experiences at Khyber Model.
          </p>
        </div>

        {/* Category Filter */}
        <div ref={filterBarRef} className="mb-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200/80 inline-flex gap-1.5 max-w-full overflow-x-auto"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 whitespace-nowrap ${
                    isSelected
                      ? "bg-[#001830] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#001830]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid (Stable min-height prevents footer layout jump) */}
        <div className="min-h-[420px]">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-gray-700">No media found</h2>
              <p className="text-gray-500 text-sm mt-1">Try switching to another category.</p>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
            className="fixed inset-0 z-[9999] bg-gray-950/90 flex items-center justify-center p-4 md:p-8 select-none"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] border border-gray-100"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                aria-label="Close image preview"
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-30 bg-white hover:bg-gray-100 text-gray-900 p-2.5 rounded-full shadow-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {selectedIndex > 0 && (
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={handlePrevImage}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {selectedIndex < filteredImages.length - 1 && (
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={handleNextImage}
                  className="hidden lg:flex absolute right-4 md:right-[36%] top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <div className="relative bg-gray-950 flex items-center justify-center flex-1 md:max-w-[65%] min-h-[260px] sm:min-h-[380px] md:min-h-[500px]">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[75vh]"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between bg-white w-full md:max-w-[35%] border-t md:border-t-0 md:border-l border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#0068A8] bg-[#0068A8]/10 px-2.5 py-1 rounded-md uppercase">
                      {activeImage.category}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold tracking-wider">
                      {selectedIndex + 1} / {filteredImages.length}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-extrabold text-[#001830] tracking-tight leading-tight">
                    {activeImage.title}
                  </h2>

                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {activeImage.description}
                  </p>
                </div>

                <div className="flex lg:hidden items-center justify-between pt-6 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    disabled={selectedIndex === 0}
                    className="flex items-center gap-1 text-xs font-bold text-gray-700 disabled:opacity-30 py-2 px-3"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    disabled={selectedIndex === filteredImages.length - 1}
                    className="flex items-center gap-1 text-xs font-bold text-gray-700 disabled:opacity-30 py-2 px-3"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryPage;