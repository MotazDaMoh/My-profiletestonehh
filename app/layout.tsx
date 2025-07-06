import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_Arabic } from "next/font/google"
import { WebVitals } from "@/components/web-vitals"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import Script from "next/script"

// Optimized font loading with display swap and preload
const noto = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true,
})

// Comprehensive viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#007AFF" },
    { media: "(prefers-color-scheme: dark)", color: "#007AFF" },
  ],
}

// Enhanced metadata for SEO and performance
export const metadata: Metadata = {
  title: {
    default: "منشئ الرسائل المدمجة | Discord Embed Builder",
    template: "%s | Discord Embed Builder",
  },
  description:
    "أنشئ رسائل ديسكورد مدمجة مذهلة بسهولة. معاينة فورية، تخصيص متقدم، وتكامل سلس مع الويب هوك. أداة مجانية وسريعة لإنشاء رسائل Discord احترافية.",
  keywords: [
    "ديسكورد",
    "رسائل مدمجة",
    "ويب هوك",
    "Discord",
    "Embed",
    "Webhook",
    "Arabic",
    "منشئ الرسائل",
    "Discord Bot",
    "تخصيص الرسائل",
  ],
  authors: [{ name: "Motaz Darawsha", url: "https://motazdarawsha.vercel.app" }],
  creator: "Motaz Darawsha",
  publisher: "Discord Embed Builder",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#007AFF" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://embed-builder.vercel.app",
    siteName: "Discord Embed Builder",
    title: "منشئ الرسائل المدمجة | Discord Embed Builder",
    description: "أنشئ رسائل ديسكورد مدمجة مذهلة بسهولة مع معاينة فورية وتخصيص متقدم",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Discord Embed Builder - منشئ الرسائل المدمجة",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "منشئ الرسائل المدمجة | Discord Embed Builder",
    description: "أنشئ رسائل ديسكورد مدمجة مذهلة بسهولة",
    images: ["/twitter-image.webp"],
    creator: "@motaz_darawsha",
  },
  alternates: {
    canonical: "https://embed-builder.vercel.app",
    languages: {
      "ar-SA": "https://embed-builder.vercel.app",
      "en-US": "https://embed-builder.vercel.app/en",
    },
  },
  category: "technology",
    generator: 'v0.dev'
}

// JSON-LD structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Discord Embed Builder",
  alternateName: "منشئ الرسائل المدمجة",
  description: "أنشئ رسائل ديسكورد مدمجة مذهلة بسهولة",
  url: "https://embed-builder.vercel.app",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Motaz Darawsha",
    url: "https://motazdarawsha.vercel.app",
  },
  copyrightHolder: {
    "@type": "Person",
    name: "Motaz Darawsha",
  },
  copyrightYear: "2025",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={noto.variable}>
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.discordapp.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://discord.com" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://motazdarawsha.vercel.app" />

        {/* Preload critical assets */}
        <link rel="preload" href="/favicon-32x32.png" as="image" type="image/png" />
        <link
          rel="preload"
          href="/fonts/noto-sans-arabic-v18-arabic-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Embed Builder" />

        {/* Resource hints for better loading */}
        <link rel="prefetch" href="/api/send-embed" />
        <link rel="prefetch" href="/copyright" />
        <link rel="prefetch" href="/na7la" />

        {/* Critical CSS inlined for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for above-the-fold content */
            html{direction:rtl;scroll-behavior:smooth;font-size:clamp(14px,1.2vw,17px);overflow-x:hidden}
            body{font-family:var(--font-noto),-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",system-ui,sans-serif;background-color:#ffffff;color:#000000;line-height:1.47059;font-weight:400;letter-spacing:-0.022em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;overflow-x:hidden;min-height:100vh;min-height:100dvh}
            .apple-nav{backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);background-color:rgba(255,255,255,0.8);border-bottom:1px solid rgba(0,0,0,0.1)}
            .apple-headline-large{font-size:clamp(2rem,6vw + 1rem,6rem);line-height:1.05;font-weight:600;letter-spacing:-0.015em;color:#000000}
            .apple-subheadline{font-size:clamp(1rem,2.5vw + 0.25rem,1.75rem);line-height:1.29;font-weight:400;letter-spacing:0.007em;color:#666666}
            .apple-button-primary{background-color:#007aff;color:#ffffff;border-radius:980px;padding:clamp(0.5rem,2vw,1rem) clamp(1.5rem,4vw,2rem);font-size:clamp(0.875rem,1.2vw,1.0625rem);font-weight:400;letter-spacing:-0.022em;border:none;cursor:pointer;min-height:44px;min-width:44px;display:inline-flex;align-items:center;justify-content:center;gap:0.5rem}
          `,
          }}
        />
      </head>
      <body className={`${noto.className} font-sans antialiased overflow-x-hidden`}>
        <div id="root" className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <WebVitals />

        {/* Load non-critical scripts after page load */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                      console.log('CLS:', entry.value);
                    }
                  }
                });
                observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
