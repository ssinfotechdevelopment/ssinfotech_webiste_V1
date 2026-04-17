import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = useRef([]);

  // Fetch slides from backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("https://ssinfotech-0x5s.onrender.com/api/slides");
        if (!response.ok) throw new Error("Failed to fetch slides");
        const data = await response.json();
        setSlides(data.slides || []);
        videoRefs.current = data.slides.map(() => React.createRef());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;

    const currentSlide = slides[current];
    const videoElement = videoRefs.current[current]?.current;
    let timer;

    if (currentSlide?.type === "video" && videoElement) {
      videoElement.currentTime = 0;
      videoElement.play().catch(() => {});

      const onLoadedMetadata = () => {
        const videoDuration = (videoElement.duration || 5) * 1000;
        timer = setTimeout(() => {
          setCurrent((prev) => (prev + 1) % slides.length);
        }, videoDuration);
      };

      videoElement.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        videoElement.removeEventListener("loadedmetadata", onLoadedMetadata);
        clearTimeout(timer);
      };
    } else {
      timer = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, currentSlide?.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [current, isPlaying, slides]);

  const goToSlide = (index) => {
    setCurrent(index);
    const videoElement = videoRefs.current[index]?.current;
    if (slides[index]?.type === "video" && videoElement && isPlaying) {
      videoElement.currentTime = 0;
      videoElement.play().catch(() => {});
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const videoElement = videoRefs.current[current]?.current;
    if (slides[current]?.type === "video" && videoElement) {
      isPlaying ? videoElement.pause() : videoElement.play().catch(() => {});
    }
  };

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-400 text-center py-20">Error: {error}</div>;
  if (slides.length === 0) return <div className="text-white text-center py-20">No slides available</div>;

  const currentSlide = slides[current];

  return (
    <section className="relative overflow-hidden h-[70vh] flex items-center justify-center bg-gray-900">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) =>
            index === current ? (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {slide.type === "image" ? (
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <video
                    ref={videoRefs.current[index]}
                    src={slide.url}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Title & Subtitle - Centered */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="font-medium tracking-tight text-white mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 100px)',
                lineHeight: 1.1,
                fontFamily: '"Inter", "Roboto Mono", ui-monospace, monospace',
              }}
            >
              {currentSlide.title}
            </h1>

            {currentSlide.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="text-gray-200 font-light tracking-wide"
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 50px)',
                  lineHeight: 1.3,
                }}
              >
                {currentSlide.subtitle}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={22} /> : <Play size={22} />}
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index ? "bg-cyan-400 w-8" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;