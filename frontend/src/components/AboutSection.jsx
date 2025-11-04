import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import '../index.css';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const floatingRef = useRef(null);
  const bgRevealRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const floatingEl = floatingRef.current;
    
    if (!sectionEl || !floatingEl) return;

    let started = false;
    let animationFrameId;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started) {
          started = true;
          setIsRevealed(true);
        }
      },
      { root: null, threshold: 0.3 }
    );
    io.observe(sectionEl);

    const factor = 0.2;
    const onScroll = () => {
      if (!started) return;
      
      animationFrameId = requestAnimationFrame(() => {
        const rect = sectionEl.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the section we've scrolled
        const scrollProgress = Math.max(0, Math.min(1, 
          (windowHeight - sectionTop) / (windowHeight + sectionHeight)
        ));
        
        // Apply parallax effect - moves up when scrolling down
        const parallaxY = scrollProgress * 100;
        floatingEl.style.transform = `translateY(${parallaxY}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-area py-16 md:py-20 lg:py-[100px] relative overflow-hidden bg-white px-4 sm:px-6 md:px-8 lg:px-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-area-inner grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Background Photo with Reveal Animation */}
          <motion.div 
            className="about-image-side relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Image Container with Reveal */}
            <div className="relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
              {/* Background Image with Clip Path Reveal */}
              <motion.div 
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 relative overflow-hidden"
                initial={{ clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' }}
                animate={isRevealed ? { 
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                } : {}}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: 0.3 
                }}
              >
                <img
                  src="/employe.jpg"
                  alt="About our company"
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-30"></div>
              </motion.div>

              {/* Experience Badge Overlay */}
              <motion.div 
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                {/* <div className="px-4 py-3 md:px-6 md:py-4">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <span className="text-2xl md:text-4xl font-bold text-blue-600">25</span>
                    <div>
                      <p className="text-sm md:text-lg font-bold text-gray-900">Years Of</p>
                      <p className="text-blue-600 font-semibold text-sm md:text-base">Experience</p>
                    </div>
                  </div>
                </div> */}
              </motion.div>
            </div>

            {/* Floating Image with Parallax */}
            <motion.div
              ref={floatingRef}
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 border-4 md:border-8 border-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden z-20 will-change-transform mb-[20px]"
              initial={{ scale: 0, rotate: 10, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: 0.9,
                type: "spring",
                stiffness: 100
              }}
            >
              <img
                src="/director.jpg"
                alt="Business consulting"
                className="w-full h-full object-cover"
              />
              
              {/* Trust Badge */}
              <motion.div 
                className="absolute top-2 left-2 md:top-4 md:left-4 bg-green-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.6 }}
              >
                Trusted
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-20 h-20 md:w-32 md:h-32 bg-blue-600/10 rounded-full blur-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-purple-600/10 rounded-full blur-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="about-content order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Heading */}
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Make Sure Your Objectives<br />
              <span className="text-gradient-to-r from-purple-600 to-purple-700">Improves Profit</span> Drivers
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We envision a future where our clients are at the forefront of their industries, 
              setting new standards of excellence through the transformative power of our 
              consulting services.
            </motion.p>

            {/* Features */}
            <div className="space-y-6 md:space-y-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3">
                  Improving Your Business Planning
                </h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  We envision a future where our clients are at the forefront of their industries, 
                  setting new standards of excellence.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3">
                  Make Sure You Can Evaluate Success
                </h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  We envision a future where our clients are at the forefront of their industries, 
                  setting new standards of excellence.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div 
              className="mt-8 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.a
                href="/services"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#2563eb'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Take Our Service
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Additional Background Elements */}
      <motion.div 
        className="absolute top-1/4 -left-10 md:-left-20 w-20 h-20 md:w-40 md:h-40 bg-blue-600/5 rounded-full blur-2xl md:blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-10 md:-right-20 w-32 h-32 md:w-60 md:h-60 bg-purple-600/5 rounded-full blur-2xl md:blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
    </section>
  );
};

export default AboutSection;