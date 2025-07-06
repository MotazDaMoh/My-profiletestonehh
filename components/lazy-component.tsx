"use client"

import type React from "react"

import { lazy, Suspense, type ComponentType } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface LazyComponentProps {
  fallback?: React.ReactNode
  className?: string
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode,
) {
  const LazyComponent = lazy(importFunc)

  return function LazyWrapper(props: T & LazyComponentProps) {
    const { fallback: customFallback, className, ...componentProps } = props

    return (
      <Suspense fallback={customFallback || fallback || <LoadingSpinner />}>
        <div className={className}>
          <LazyComponent {...(componentProps as T)} />
        </div>
      </Suspense>
    )
  }
}

// Lazy load components with intersection observer
export function LazyIntersectionComponent({
  children,
  fallback = <LoadingSpinner />,
  rootMargin = "100px",
  threshold = 0.1,
  className,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}

// Preload component for critical resources
export function PreloadComponent({
  href,
  as,
  type,
  crossOrigin,
  media,
}: {
  href: string
  as: string
  type?: string
  crossOrigin?: string
  media?: string
}) {
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = href
    link.as = as
    if (type) link.type = type
    if (crossOrigin) link.crossOrigin = crossOrigin
    if (media) link.media = media

    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [href, as, type, crossOrigin, media])

  return null
}

// Resource hints component
export function ResourceHints() {
  useEffect(() => {
    // Preconnect to external domains
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://cdn.discordapp.com",
    ]

    // DNS prefetch for external domains
    const dnsPrefetchDomains = ["https://discord.com", "https://vercel.com", "https://motazdarawsha.vercel.app"]

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = domain
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    dnsPrefetchDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "dns-prefetch"
      link.href = domain
      document.head.appendChild(link)
    })
  }, [])

  return null
}

import { useState, useRef, useEffect } from "react"
