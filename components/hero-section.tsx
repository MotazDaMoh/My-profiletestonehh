import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center apple-section-padding" role="banner">
      <div className="max-w-7xl mx-auto apple-container-padding text-center">
        <div className="apple-fade-in">
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white mb-6 sm:mb-8 px-6 sm:px-8 py-3 sm:py-4 rounded-full apple-body text-sm sm:text-base">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3" aria-hidden="true" />
            جديد ومحسّن
          </Badge>

          <h1 className="apple-headline-large apple-large-spacing">منشئ الرسائل المدمجة</h1>

          <p className="apple-subheadline max-w-4xl mx-auto apple-large-spacing">
            أنشئ رسائل ديسكورد مدمجة مذهلة بسهولة. معاينة فورية، تخصيص متقدم، وتكامل سلس مع الويب هوك.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center apple-large-spacing">
            <Button className="apple-button-primary px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg" asChild>
              <Link href="#preview" aria-label="ابدأ استخدام منشئ الرسائل المدمجة">
                ابدأ الآن
                <ArrowLeft className="mr-3 sm:mr-4 h-5 w-5 sm:h-6 sm:w-6 rtl-flip" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="apple-button-secondary bg-transparent px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg"
              asChild
            >
              <Link href="#features" aria-label="اكتشف مميزات منشئ الرسائل المدمجة">
                اكتشف المميزات
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
