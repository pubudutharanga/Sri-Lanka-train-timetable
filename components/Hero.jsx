'use client'
import { motion } from 'framer-motion'
import { Search, ChevronRight, ShieldCheck, Zap, Clock } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'

export default function Hero() {
  const scrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }



  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/images/hero2.jpg")` }}
      >
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-slate-950/70" />
        
        {/* Modern Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.2)_0%,transparent_50%)] animate-slow-spin" />
          <div className="absolute top-1/4 right-0 w-[100%] h-[100%] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2)_0%,transparent_50%)] animate-reverse-spin" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-50 tracking-wide uppercase">Official 2026 Timetable</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Navigate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                <TypeAnimation
                  sequence={[
                    'Sri Lanka', 2000,
                    'Colombo', 2000,
                    'Kandy', 2000,
                    'Galle', 2000,
                    'Jaffna', 2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </span> <br />
              by Train.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
              Experience the scenic beauty of Sri Lanka. Search reliable railway schedules, departure times, and routes for your next journey.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <button
                onClick={scrollToSearch}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Search className="w-5 h-5 relative z-10 text-blue-600" />
                <span className="relative z-10">Search Trains Now</span>
                <ChevronRight className="w-5 h-5 relative z-10 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-slow-spin {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin-reverse 25s linear infinite;
        }
      `}</style>
    </section>
  )
}