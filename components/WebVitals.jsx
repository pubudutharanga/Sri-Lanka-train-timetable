'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // You can log this or send to analytics endpoint
    console.log(metric)
  })
  return null
}
