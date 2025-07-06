import Link from "next/link"
import { OptimizedImage } from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ShoppingBag,
  Shield,
  Zap,
  Users,
  CheckCircle,
  Star,
  Sparkles,
  ShoppingCart,
} from "lucide-react"
import type { Metadata } from "next"

// Static generation
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
  title: "سيرفر نحلة - NA7LA S | Discord Embed Builder",
  description:
    "تعرف على سيرفر نحلة NA7LA S - سيرفر التسوق الأمثل لعشاق الشوب والتسوق الذكي مع أكثر من 420 تعامل ناجح و 4,518 مستخدم نشط",
  keywords: ["نحلة", "NA7LA", "ديسكورد", "تسوق", "شوب", "Discord server"],
  openGraph: {
    title: "سيرفر نحلة - NA7LA S",
    description: "سيرفر التسوق الأمثل لعشاق الشوب والتسوق الذكي",
    images: [
      {
        url: "/na7la-og.webp",
        width: 1200,
        height: 630,
        alt: "سيرفر نحلة - NA7LA S",
        type: "image/webp",
      },
    ],
  },
}

const partnerServerData = {
  bannerUrl:
    "https://cdn.discordapp.com/attachments/1368679089602433056/1368687255647944769/IMG_4311.png?ex=681920d6&is=6817cf56&hm=36b6da86add83e875b8090e68511f00ce7f5b4ecd29d4aadc27a1943b2ea8be7&",
  avatarUrl:
    "https://cdn.discordapp.com/icons/996135517320134776/a_8d56f513e2ca8833dd292c3073375494.webp?size=128&quality=lossless",
  name: "# - NA7LA S 🇵🇸",
  description:
    "نحلة | NA7LA S\nسيرفرك الأمثل لعشّاق الشوب والتسوّق الذكي!\nكل جديد، كل مميز، وكل عرض خرافي تلقاه هنا!\nانضم وخلّك دايمًا في قلب الحدث",
  inviteUrl: "https://discord.gg/na7la",
}

export default function Na7laPage() {
  return (
    <main className="min-h-screen apple-bg-white">
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 w-full z-50 apple-nav">
        <div className="max-w-7xl mx-auto apple-container-padding py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 apple-vibrancy px-6 py-3 rounded-full transition-all hover:bg-white/20"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span className="apple-body">العودة</span>
            </Link>
            <div className="flex items-center space-x-4 space-x-reverse">
              <MessageSquare className="h-6 w-6 apple-text-blue" />
              <span className="apple-body-large font-semibold">نحلة</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Banner */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <OptimizedImage
          src={partnerServerData.bannerUrl}
          alt="NA7LA Discord Server Banner"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white"></div>

        <div className="absolute bottom-0 right-0 w-full p-12 md:p-20 z-10">
          <div className="max-w-7xl mx-auto apple-container-padding">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl border-4 border-blue-500 overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={partnerServerData.avatarUrl}
                    alt="NA7LA Discord Server Avatar"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                    sizes="(max-width: 768px) 160px, 192px"
                    quality={95}
                  />
                </div>
                <div className="absolute bottom-3 left-3 w-12 h-12 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>

              <div className="flex-1 text-center md:text-right">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 apple-medium-spacing">
                  <h1 className="apple-headline text-white">NA7LA S</h1>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full apple-body">
                    <Sparkles className="h-5 w-5 ml-2" />
                    مميز
                  </Badge>
                </div>
                <p className="apple-subheadline text-white/90 max-w-3xl leading-relaxed">
                  سيرفر التسوق الأمثل لعشاق الشوب والتسوق الذكي
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto apple-container-padding apple-section-padding">
          {/* Server Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 apple-large-spacing">
            <div className="lg:col-span-2">
              <Card className="apple-card-elevated h-full">
                <CardContent className="p-12">
                  <div className="flex items-center gap-4 apple-medium-spacing">
                    <ShoppingCart className="h-8 w-8 apple-text-blue" />
                    <h2 className="apple-headline">عن سيرفر نحلة</h2>
                  </div>

                  <div className="space-y-8 text-right">
                    <p className="apple-body-large apple-text-gray leading-relaxed">
                      نحلة | NA7LA S هو سيرفرك الأمثل لعشّاق الشوب والتسوّق الذكي! نقدم لك تجربة تسوق فريدة مع ضمان الجودة
                      والأمان.
                    </p>
                    <p className="apple-body-large apple-text-gray leading-relaxed">
                      كل جديد، كل مميز، وكل عرض خرافي تلقاه هنا! نوفر لك أفضل العروض والخدمات في عالم التسوق الإلكتروني.
                    </p>
                    <p className="apple-body-large apple-text-gray leading-relaxed">
                      انضم وخلّك دايمًا في قلب الحدث مع مجتمع نحلة النشط واستفد من العروض الحصرية والخدمات المميزة.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6 mt-12 justify-end">
                    <Button className="apple-button-primary px-10 py-4" asChild>
                      <a href={partnerServerData.inviteUrl} target="_blank" rel="noopener noreferrer">
                        انضم الآن
                        <ExternalLink className="mr-3 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="apple-card-elevated h-full">
                <CardContent className="p-12">
                  <div className="flex items-center gap-4 apple-medium-spacing">
                    <CheckCircle className="h-8 w-8 apple-text-blue" />
                    <h2 className="apple-body-large font-semibold">إحصائيات السيرفر</h2>
                  </div>

                  <div className="space-y-10">
                    <div className="text-center p-8 apple-card rounded-3xl">
                      <div className="w-20 h-20 rounded-3xl bg-blue-500 flex items-center justify-center mx-auto apple-medium-spacing">
                        <ShoppingBag className="h-10 w-10 text-white" />
                      </div>
                      <div className="apple-headline apple-text-blue apple-small-spacing">+420</div>
                      <div className="apple-caption">تعاملات ناجحة</div>
                    </div>

                    <div className="text-center p-8 apple-card rounded-3xl">
                      <div className="w-20 h-20 rounded-3xl bg-purple-500 flex items-center justify-center mx-auto apple-medium-spacing">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                      <div className="apple-headline apple-text-blue apple-small-spacing">+4,518</div>
                      <div className="apple-caption">مستخدمين نشطين</div>
                    </div>

                    <div className="text-center p-8 apple-card rounded-3xl">
                      <div className="w-20 h-20 rounded-3xl bg-yellow-500 flex items-center justify-center mx-auto apple-medium-spacing">
                        <Star className="h-10 w-10 text-white" />
                      </div>
                      <div className="apple-headline" style={{ color: "#FF9500" }}>
                        4.8/5
                      </div>
                      <div className="apple-caption">تقييم الخدمة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Server Features */}
          <h2 className="apple-headline text-center apple-large-spacing">مميزات سيرفر نحلة</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 apple-large-spacing">
            <Card className="apple-card-elevated hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl bg-blue-500 flex items-center justify-center apple-medium-spacing group-hover:scale-110 transition-transform">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <h3 className="apple-body-large font-semibold apple-small-spacing">سريع</h3>
                <p className="apple-body apple-text-gray leading-relaxed">
                  خدمة سريعة وفعالة لجميع احتياجاتك التسويقية مع استجابة فورية من فريق الدعم
                </p>
              </CardContent>
            </Card>

            <Card className="apple-card-elevated hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl bg-green-500 flex items-center justify-center apple-medium-spacing group-hover:scale-110 transition-transform">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="apple-body-large font-semibold apple-small-spacing">آمن</h3>
                <p className="apple-body apple-text-gray leading-relaxed">
                  نظام آمن ومضمون لجميع التعاملات والمشتريات مع ضمان حماية بياناتك الشخصية
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <Card className="apple-card-elevated apple-large-spacing">
            <CardContent className="p-16">
              <h2 className="apple-headline text-center apple-large-spacing">آراء المستخدمين</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="apple-card">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-4 apple-small-spacing justify-end">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                          <h4 className="apple-body font-semibold">أحمد</h4>
                        </div>
                        <p className="apple-body apple-text-gray leading-relaxed">
                          "تجربة رائعة مع سيرفر نحلة! خدمة سريعة وموثوقة، وفريق دعم متعاون. أنصح به بشدة لكل من يبحث عن
                          تجربة تسوق آمنة."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="apple-card">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-4 apple-small-spacing justify-end">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                          <h4 className="apple-body font-semibold">سارة</h4>
                        </div>
                        <p className="apple-body apple-text-gray leading-relaxed">
                          "من أفضل سيرفرات التسوق التي تعاملت معها. عروض حصرية ومميزة، وتعامل محترف. سعيدة جدًا بتجربتي
                          معهم!"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="apple-card-elevated p-16 rounded-3xl text-center">
            <h2 className="apple-headline apple-medium-spacing">انضم إلى سيرفر نحلة الآن!</h2>
            <p className="apple-subheadline max-w-4xl mx-auto apple-large-spacing">
              كن جزءًا من مجتمع نحلة واستمتع بأفضل العروض والخدمات في عالم التسوق الذكي. انضم الآن وكن أول من يحصل على
              العروض الحصرية!
            </p>
            <Button className="apple-button-primary px-16 py-6 text-lg" asChild>
              <a href={partnerServerData.inviteUrl} target="_blank" rel="noopener noreferrer">
                انضم إلى السيرفر
                <ExternalLink className="mr-4 h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
