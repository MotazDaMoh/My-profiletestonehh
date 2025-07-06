import { Zap, Shield, Palette } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "سريع وسهل",
    description: "إنشاء رسائل مدمجة في ثوانٍ مع واجهة بديهية وسهلة الاستخدام",
    color: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "آمن ومضمون",
    description: "حماية كاملة لبياناتك مع تشفير متقدم وأمان عالي المستوى",
    color: "bg-green-500",
  },
  {
    icon: Palette,
    title: "تخصيص متقدم",
    description: "خيارات تخصيص لا محدودة مع معاينة فورية لنتائج مذهلة",
    color: "bg-purple-500",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="apple-section-padding apple-bg-athens"
      role="region"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto apple-container-padding">
        <div className="text-center apple-large-spacing">
          <h2 id="features-heading" className="apple-headline apple-medium-spacing">
            مميزات استثنائية
          </h2>
          <p className="apple-subheadline max-w-3xl mx-auto">كل ما تحتاجه لإنشاء رسائل مدمجة احترافية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="apple-card-elevated p-8 sm:p-12 text-center hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${feature.color} flex items-center justify-center mx-auto apple-medium-spacing group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-white" aria-hidden="true" />
                </div>
                <h3 className="apple-body-large font-semibold apple-small-spacing">{feature.title}</h3>
                <p className="apple-body apple-text-gray leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
