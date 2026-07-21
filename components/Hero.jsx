'use client'
import { motion } from 'framer-motion'
import { Search, ChevronDown, MapPin, Clock, Star } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'

export default function Hero() {
  const scrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const stats = [
    { icon: <MapPin className="w-4 h-4" />, value: '100+', label: 'Stations' },
    { icon: <Clock className="w-4 h-4" />, value: 'Daily', label: 'Updated' },
    { icon: <Star className="w-4 h-4" />, value: 'Free', label: 'Always' },
  ]

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background Image ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/images/hero2.jpg")` }}
      >
        {/* Gradient overlay — heavier at top/bottom on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/90" />

        {/* Ambient glow blobs — lighter on mobile to save GPU */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.25)_0%,transparent_55%)] animate-slow-spin" />
          <div className="absolute top-1/4 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2)_0%,transparent_55%)] animate-reverse-spin" />
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm mb-6 sm:mb-8">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-cyan-100 tracking-widest uppercase">
              2026 Timetable — Updated Daily
            </span>
          </div>
        </motion.div>

        {/* H1 — static for SEO; generous line-height for mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-4 sm:mb-5"
        >
          <span className="block">Train Schedule</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
            Sri Lanka
          </span>
          <span className="block text-2xl xs:text-3xl sm:text-4xl lg:text-5xl mt-2 font-bold text-slate-200">
            Railway Time Table 2026
          </span>
        </motion.h1>

        {/* Animated subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-lg sm:max-w-xl leading-relaxed mb-8 sm:mb-10 px-1"
        >
          Search train timetable for{' '}
          <TypeAnimation
            sequence={[
              'Colombo Fort', 2000,
              'Kandy', 2000,
              'Galle', 2000,
              'Badulla & Ella', 2000,
              'Jaffna', 2000,
              'Matara', 2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-cyan-400 font-semibold"
          />
          {' '}and 100+ stations across Sri Lanka Railways.
        </motion.p>

        {/* Primary CTA — full-width on mobile, auto on larger screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full sm:w-auto mb-10 sm:mb-12"
        >
          <button
            onClick={scrollToSearch}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4 bg-white text-slate-900 font-bold text-base sm:text-base rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_0_48px_-8px_rgba(255,255,255,0.35)] min-h-[56px] touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Search className="w-5 h-5 relative z-10 text-blue-600 flex-shrink-0" />
            <span className="relative z-10">Search Train Schedule</span>
            <ChevronDown className="w-5 h-5 relative z-10 text-slate-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition-all flex-shrink-0" />
          </button>
        </motion.div>

        {/* Trust stats row — horizontal scroll on very small screens */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-8 w-full"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex-1 sm:flex-none sm:min-w-[90px]"
            >
              <div className="text-cyan-400">{stat.icon}</div>
              <span className="text-white font-bold text-sm sm:text-base leading-tight">{stat.value}</span>
              <span className="text-slate-400 text-xs">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll hint arrow ──────────────────────────────────────────── */}
      <motion.button
        onClick={scrollToSearch}
        aria-label="Scroll to search"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors touch-manipulation"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>

      {/* ── Keyframe styles ────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        .animate-slow-spin   { animation: spin-slow    20s linear infinite; }
        .animate-reverse-spin{ animation: spin-reverse 25s linear infinite; }

        /* Extra-small breakpoint (< 390px) */
        @media (max-width: 389px) {
          .xs\\:text-5xl { font-size: 3rem; line-height: 1; }
          .xs\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        }

        /* Honour reduced-motion preference — kill spinning blobs */
        @media (prefers-reduced-motion: reduce) {
          .animate-slow-spin,
          .animate-reverse-spin { animation: none; }
        }
      `}</style>
    </section>
  )
}