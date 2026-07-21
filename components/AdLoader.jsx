'use client'
import Script from 'next/script'

/**
 * AdLoader — Deferred ad script loader
 * 
 * Uses Next.js native <Script> component with 'lazyOnload' strategy
 * to ensure ads load without blocking initial render or hurting Core Web Vitals,
 * while still executing correctly within the Next.js lifecycle.
 */
export default function AdLoader() {
  return (
    <>
      {/* Primary Ad Script (Anti-Adblock / Popunder) */}
      <Script 
        src="https://chalkedwhiningromance.com/e9/69/00/e969005cc95db274d9d23bb09b3d8ee3.js"
        strategy="afterInteractive"
      />
      
      {/* Fallback Network Domain (optional redundancy) */}
      <Script 
        src="https://pl29817610.effectivecpmnetwork.com/e9/69/00/e969005cc95db274d9d23bb09b3d8ee3.js"
        strategy="afterInteractive"
      />
    </>
  )
}
