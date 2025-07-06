import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft, Sparkles } from "lucide-react"

interface Na7laServerData {
  avatarUrl: string
  name: string
  description: string
  inviteUrl: string
}

interface Na7laSectionProps {
  serverData: Na7laServerData
}

export function Na7laSection({ serverData }: Na7laSectionProps) {
  return (
    <section id="na7la" className="apple-section-padding" role="region" aria-labelledby="na7la-heading">
      <div className="max-w-7xl mx-auto apple-container-padding">
        <div className="apple-card-elevated p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {/* Server Info */}
            <div className="text-center lg:text-right order-2 lg:order-1">
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full apple-body text-sm sm:text-base">
                <Sparkles className="h-4 w-4 ml-2" aria-hidden="true" />
                سيرفر مميز
              </Badge>

              <h2 id="na7la-heading" className="apple-headline apple-medium-spacing">
                NA7LA S
              </h2>

              <p className="apple-subheadline apple-large-spacing">
                سيرفر التسوق الأمثل لعشاق الشوب والتسوق الذكي مع أكثر من 420 تعامل ناجح
              </p>

              {/* Stats - Apple Style */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-6 sm:gap-8 apple-large-spacing">
                <div className="text-center">
                  <div className="apple-headline apple-text-blue">+4,518</div>
                  <div className="apple-caption">مستخدم</div>
                </div>
                <div className="text-center">
                  <div className="apple-headline apple-text-green">+420</div>
                  <div className="apple-caption">تعامل ناجح</div>
                </div>
                <div className="text-center">
                  <div className="apple-headline" style={{ color: "#FF9500" }}>
                    4.9/5
                  </div>
                  <div className="apple-caption">تقييم</div>
                </div>
              </div>

              {/* CTA Buttons - Apple Style */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-end">
                <Button variant="outline" className="apple-button-secondary bg-transparent" asChild>
                  <Link href="/na7la" aria-label="تعرف على المزيد حول سيرفر نحلة">
                    تعرف على المزيد
                    <ArrowLeft className="mr-2 h-4 w-4 rtl-flip" aria-hidden="true" />
                  </Link>
                </Button>
                <Button className="apple-button-primary" asChild>
                  <a
                    href={serverData.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="انضم إلى سيرفر نحلة على ديسكورد"
                  >
                    انضم الآن
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Server Avatar */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-2">
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={serverData.avatarUrl || "/placeholder.svg"}
                    alt="NA7LA Discord Server Avatar"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 256px"
                    quality={85}
                  />
                </div>
                <div
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full border-4 border-white shadow-lg"
                  aria-label="السيرفر متصل"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
