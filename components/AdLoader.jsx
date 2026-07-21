'use client'
import { useEffect } from 'react'

/**
 * AdLoader — Deferred ad script loader
 * 
 * Loads advertisement scripts AFTER a 5-second delay to avoid
 * blocking initial page render and hurting Core Web Vitals (LCP, INP).
 * 
 * Scripts are injected at the bottom of <body> dynamically,
 * so they never block HTML parsing or rendering.
 */
export default function AdLoader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Anti-Adblock JS Sync (loaded async via dynamic injection)
      const adblockScript = document.createElement('script')
      adblockScript.src = 'https://chalkedwhiningromance.com/e9/69/00/e969005cc95db274d9d23bb09b3d8ee3.js'
      adblockScript.async = true
      document.body.appendChild(adblockScript)

      // Popunder Advertisement
      const popunderScript = document.createElement('script')
      popunderScript.src = 'https://pl29817610.effectivecpmnetwork.com/e9/69/00/e969005cc95db274d9d23bb09b3d8ee3.js'
      popunderScript.async = true
      document.body.appendChild(popunderScript)
    }, 5000) // 5-second delay after page load

    return () => clearTimeout(timer)
  }, [])

  return null // This component renders nothing visible
}
