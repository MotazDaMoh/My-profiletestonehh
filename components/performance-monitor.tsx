"use client"

import { useEffect } from "react"

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const metrics: PerformanceMetrics = {}

    // Largest Contentful Paint (LCP)
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
        metrics.lcp = lastEntry.startTime

        // Send to analytics (example)
        if (process.env.NODE_ENV === "production") {
          // gtag('event', 'web_vitals', {
          //   name: 'LCP',
          //   value: Math.round(lastEntry.startTime),
          //   event_label: 'lcp'
          // })
        }
      })

      try {
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
      } catch (e) {
        console.warn("LCP observer not supported")
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          metrics.fid = entry.processingStart - entry.startTime

          if (process.env.NODE_ENV === "production") {
            // gtag('event', 'web_vitals', {
            //   name: 'FID',
            //   value: Math.round(entry.processingStart - entry.startTime),
            //   event_label: 'fid'
            // })
          }
        })
      })

      try {
        fidObserver.observe({ entryTypes: ["first-input"] })
      } catch (e) {
        console.warn("FID observer not supported")
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            metrics.cls = clsValue
          }
        })

        if (process.env.NODE_ENV === "production") {
          // gtag('event', 'web_vitals', {
          //   name: 'CLS',
          //   value: Math.round(clsValue * 1000),
          //   event_label: 'cls'
          // })
        }
      })

      try {
        clsObserver.observe({ entryTypes: ["layout-shift"] })
      } catch (e) {
        console.warn("CLS observer not supported")
      }

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.name === "first-contentful-paint") {
            metrics.fcp = entry.startTime

            if (process.env.NODE_ENV === "production") {
              // gtag('event', 'web_vitals', {
              //   name: 'FCP',
              //   value: Math.round(entry.startTime),
              //   event_label: 'fcp'
              // })
            }
          }
        })
      })

      try {
        fcpObserver.observe({ entryTypes: ["paint"] })
      } catch (e) {
        console.warn("FCP observer not supported")
      }

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          metrics.ttfb = entry.responseStart - entry.requestStart

          if (process.env.NODE_ENV === "production") {
            // gtag('event', 'web_vitals', {
            //   name: 'TTFB',
            //   value: Math.round(entry.responseStart - entry.requestStart),
            //   event_label: 'ttfb'
            // })
          }
        })
      })

      try {
        navigationObserver.observe({ entryTypes: ["navigation"] })
      } catch (e) {
        console.warn("Navigation observer not supported")
      }

      // Cleanup observers
      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        fcpObserver.disconnect()
        navigationObserver.disconnect()
      }
    }

    // Fallback for browsers without PerformanceObserver
    const measurePerformance = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing
        metrics.ttfb = timing.responseStart - timing.requestStart

        // Log metrics in development
        if (process.env.NODE_ENV === "development") {
          console.log("Performance Metrics:", metrics)
        }
      }
    }

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
      return () => window.removeEventListener("load", measurePerformance)
    }
  }, [])

  return null
}

// Performance budget checker
export function PerformanceBudget() {
  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV !== "development") return

    const checkBudget = () => {
      if (window.performance && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType("resource") as PerformanceResourceTiming[]

        let totalSize = 0
        let jsSize = 0
        let cssSize = 0
        let imageSize = 0

        resources.forEach((resource) => {
          const size = resource.transferSize || 0
          totalSize += size

          if (resource.name.includes(".js")) {
            jsSize += size
          } else if (resource.name.includes(".css")) {
            cssSize += size
          } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
            imageSize += size
          }
        })

        // Performance budget thresholds (in bytes)
        const budgets = {
          total: 2 * 1024 * 1024, // 2MB
          js: 500 * 1024, // 500KB
          css: 100 * 1024, // 100KB
          images: 1 * 1024 * 1024, // 1MB
        }

        // Check budgets
        const warnings = []
        if (totalSize > budgets.total) {
          warnings.push(
            `Total size (${(totalSize / 1024 / 1024).toFixed(2)}MB) exceeds budget (${(budgets.total / 1024 / 1024).toFixed(2)}MB)`,
          )
        }
        if (jsSize > budgets.js) {
          warnings.push(
            `JS size (${(jsSize / 1024).toFixed(2)}KB) exceeds budget (${(budgets.js / 1024).toFixed(2)}KB)`,
          )
        }
        if (cssSize > budgets.css) {
          warnings.push(
            `CSS size (${(cssSize / 1024).toFixed(2)}KB) exceeds budget (${(budgets.css / 1024).toFixed(2)}KB)`,
          )
        }
        if (imageSize > budgets.images) {
          warnings.push(
            `Image size (${(imageSize / 1024 / 1024).toFixed(2)}MB) exceeds budget (${(budgets.images / 1024 / 1024).toFixed(2)}MB)`,
          )
        }

        if (warnings.length > 0) {
          console.warn("Performance Budget Exceeded:", warnings)
        } else {
          console.log("✅ Performance budget within limits")
        }

        // Log current usage
        console.log("Performance Budget Usage:", {
          total: `${(totalSize / 1024 / 1024).toFixed(2)}MB / ${(budgets.total / 1024 / 1024).toFixed(2)}MB`,
          js: `${(jsSize / 1024).toFixed(2)}KB / ${(budgets.js / 1024).toFixed(2)}KB`,
          css: `${(cssSize / 1024).toFixed(2)}KB / ${(budgets.css / 1024).toFixed(2)}KB`,
          images: `${(imageSize / 1024 / 1024).toFixed(2)}MB / ${(budgets.images / 1024 / 1024).toFixed(2)}MB`,
        })
      }
    }

    // Check budget after page load
    if (document.readyState === "complete") {
      setTimeout(checkBudget, 1000)
    } else {
      window.addEventListener("load", () => setTimeout(checkBudget, 1000))
    }
  }, [])

  return null
}
