"use client"

import { useReportWebVitals } from "next/web-vitals"

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only log in development
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      console.log("Web Vital:", metric)
    }

    // Send to analytics in production
    if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
      // Example: Send to Vercel Analytics, Google Analytics, etc.
      if (window.gtag) {
        window.gtag("event", metric.name, {
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
        })
      }
    }
  })

  return null
}
