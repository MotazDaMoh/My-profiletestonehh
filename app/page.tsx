import { Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Na7laSection } from "@/components/na7la-section"
import { PerformanceMonitor, PerformanceBudget } from "@/components/performance-monitor"
import { ResourceHints, PreloadComponent } from "@/components/lazy-component"

// Static data for Na7la server
const na7laServerData = {
  avatarUrl:
    "https://cdn.discordapp.com/icons/996135517320134776/a_8d56f513e2ca8833dd292c3073375494.webp?size=128&quality=lossless",
  name: "# - NA7LA S 🇵🇸",
  description: "سيرفر التسوق الأمثل لعشاق الشوب والتسوق الذكي",
  inviteUrl: "https://discord.gg/na7la",
}

// Dynamic imports for code splitting and performance
const EmbedBuilder = dynamic(
  () => import("@/components/embed-builder").then((mod) => ({ default: mod.EmbedBuilder })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // Client-side only for better performance
  },
)

export default function Home() {
  return (
    <>
      {/* Performance monitoring components */}
      <PerformanceMonitor />
      <PerformanceBudget />
      <ResourceHints />

      {/* Preload critical resources */}
      <PreloadComponent href="/api/send-embed" as="fetch" crossOrigin="anonymous" />

      {/* Apple-style Navigation */}
      <nav className="fixed top-0 w-full z-50 apple-nav" role="navigation" aria-label="الملاحة الرئيسية">
        <div className="max-w-7xl mx-auto apple-container-padding py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse sm:space-x-4">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 apple-text-blue" aria-hidden="true" />
              <span className="apple-body font-semibold text-sm sm:text-base">منشئ الرسائل المدمجة</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 space-x-reverse lg:space-x-8">
              <Link
                href="#features"
                className="apple-body apple-text-gray hover:apple-text-black transition-colors duration-200 text-sm lg:text-base"
                aria-label="انتقل إلى قسم المميزات"
              >
                المميزات
              </Link>
              <Link
                href="#preview"
                className="apple-body apple-text-gray hover:apple-text-black transition-colors duration-200 text-sm lg:text-base"
                aria-label="انتقل إلى قسم المعاينة"
              >
                المعاينة
              </Link>
              <Link
                href="#na7la"
                className="apple-body apple-text-gray hover:apple-text-black transition-colors duration-200 text-sm lg:text-base"
                aria-label="انتقل إلى قسم نحلة"
              >
                نحلة
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Na7la Server Section */}
      <Na7laSection serverData={na7laServerData} />

      {/* Main Content - Embed Builder */}
      <section id="preview" className="apple-section-padding apple-bg-athens">
        <div className="max-w-7xl mx-auto apple-container-padding">
          <div className="text-center apple-large-spacing">
            <h2 className="apple-headline apple-medium-spacing">ابدأ الإنشاء</h2>
            <p className="apple-subheadline max-w-3xl mx-auto">
              استخدم أدواتنا المتقدمة لإنشاء رسائل مدمجة احترافية في دقائق
            </p>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <EmbedBuilder />
          </Suspense>
        </div>
      </section>
    </>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  return [{ slug: [] }]
}

// Enable static generation
const dynamicStatic = "force-static"
export const revalidate = 3600 // Revalidate every hour
