"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  loading?: "lazy" | "eager"
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = "blur",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  loading = "lazy",
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Intersection Observer for lazy loading optimization
  useEffect(() => {
    if (!priority && loading === "lazy" && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.removeAttribute("data-src")
                observer.unobserve(img)
              }
            }
          })
        },
        {
          rootMargin: "50px",
          threshold: 0.1,
        },
      )

      observer.observe(imgRef.current)

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current)
        }
      }
    }
  }, [priority, loading])

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-gray-100 text-gray-400", className)}
        style={{ width, height }}
      >
        <span className="text-sm">فشل في تحميل الصورة</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        ref={imgRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        sizes={sizes}
        loading={loading}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ width, height }} />
      )}
    </div>
  )
}

// WebP format checker
export function supportsWebP(): boolean {
  if (typeof window === "undefined") return false

  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1

  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
}

// Responsive image sizes generator
export function generateSizes(breakpoints: { [key: string]: string }): string {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(", ")
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image URLs
  generateResponsiveUrls: (baseUrl: string, sizes: number[]) => {
    return sizes.map((size) => ({
      url: `${baseUrl}?w=${size}&q=85&f=webp`,
      width: size,
    }))
  },

  // Generate blur placeholder
  generateBlurPlaceholder: (width: number, height: number, color = "#f3f4f6") => {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  },

  // Preload critical images
  preloadImage: (src: string, priority = false) => {
    if (typeof window === "undefined") return

    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    if (priority) {
      link.setAttribute("fetchpriority", "high")
    }
    document.head.appendChild(link)
  },
}
