'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  Train, 
  MapPin, 
  Clock, 
  Search, 
  ChevronRight, 
  Shield,
  Sparkles,
  Ticket,
  Users
} from 'lucide-react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Local images array
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg", 
    "/images/hero3.png"
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Auto slide every 5 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(slideInterval)
    }
  }, [])

  const scrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  // Manual slide control
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <>
      {/* Background Layer with Image Slideshow */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30">
        {/* Background Images Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url("${image}")`,
                transition: 'opacity 1s ease-in-out'
              }}
            />
          ))}
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/60 to-purple-900/60" />
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
        </div>

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Floating Elements on top of image */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
              style={{
                background: `radial-gradient(circle at ${30 + i * 20}% ${40 + i * 15}%, 
                  rgba(59, 130, 246, 0.3) 0%, 
                  rgba(139, 92, 246, 0.2) 40%, 
                  transparent 70%)`,
                left: `${15 + i * 25}%`,
                top: `${20 + i * 15}%`
              }}
              animate={{
                y: [0, 80, 0],
                x: [0, 30, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-20 min-h-[95vh] md:min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
            {/* Centered Single Column Content */}
            <div className="max-w-4xl mx-auto">

              {/* Slide Counter (Optional) */}
              <div className="absolute top-8 right-8 text-white/70 text-sm hidden md:block">
                <span className="font-semibold">{currentSlide + 1}</span>
                <span className="mx-1">/</span>
                <span>{heroImages.length}</span>
              </div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white mb-8"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block">Railway Time Table</span>
                  <span className="block bg-gradient-to-r from-cyan-300 via-white to-amber-200 bg-clip-text text-transparent">
                    Sri Lanka
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
                  Find train times and plan your journey. Search for trains by route.
                </p>
              </motion.div>

              
              {/* Single CTA Button - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center mb-16"
              >
                <motion.button
                  onClick={scrollToSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto max-w-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Search className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 text-sm sm:text-base">Search Trains Now</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute -right-2 -top-2 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-4">Trusted by thousands of travelers monthly</p>
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    {[
                      { text: "Fast", color: "text-emerald-300" },
                      { text: "Reliable", color: "text-blue-300" },
                      { text: "Accurate", color: "text-amber-300" }
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-center gap-2 ${item.color} text-sm`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent pointer-events-none" />
        
        {/* Scrolling Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
        </motion.div>
      </section>

      {/* Mobile Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 right-6 z-30 sm:hidden"
      >
        <motion.button
          onClick={scrollToSearch}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/40 flex items-center justify-center"
        >
          <Search className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slideIn 1s ease-out forwards;
        }
        
        /* Improve text readability on background image */
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0,0,0,0.4);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 640px) {
          .hero-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          
          /* Ensure background image covers properly on mobile */
          .bg-cover {
            background-attachment: scroll;
          }
          
          /* Smaller slideshow dots on mobile */
          .absolute.bottom-8 .w-3 {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      `}</style>
    </>
  )
}