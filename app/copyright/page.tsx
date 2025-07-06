import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ExternalLink, Shield, Scale, FileText, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "حقوق الطبع والنشر | Discord Embed Builder",
  description: "معلومات حقوق الطبع والنشر، الترخيص، وإخلاء المسؤولية لمنشئ الرسائل المدمجة",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CopyrightPage() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="min-h-screen apple-bg-white">
      {/* Navigation */}
      <nav className="apple-nav border-b border-gray-200" role="navigation" aria-label="الملاحة الثانوية">
        <div className="max-w-7xl mx-auto apple-container-padding py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 apple-vibrancy px-6 py-3 rounded-full transition-all hover:bg-white/20"
            >
              <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
              <span className="apple-body">العودة للرئيسية</span>
            </Link>
            <div className="apple-body-large font-semibold">حقوق الطبع والنشر</div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto apple-container-padding apple-section-padding">
        {/* Header */}
        <div className="text-center apple-large-spacing">
          <h1 className="apple-headline apple-medium-spacing">حقوق الطبع والنشر</h1>
          <p className="apple-subheadline max-w-3xl mx-auto">
            معلومات مهمة حول حقوق الطبع والنشر، الترخيص، وشروط الاستخدام لمنشئ الرسائل المدمجة
          </p>
        </div>

        <div className="space-y-12">
          {/* Copyright Information */}
          <Card className="apple-card-elevated">
            <CardContent className="p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-blue-500 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="apple-body-large font-semibold">معلومات حقوق الطبع والنشر</h2>
                  <p className="apple-caption apple-text-gray">تفاصيل الملكية الفكرية</p>
                </div>
              </div>

              <div className="space-y-6 text-right">
                <div>
                  <h3 className="apple-body font-semibold mb-3">مالك حقوق الطبع والنشر</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    © 2025 Motaz Darawsha. جميع الحقوق محفوظة.
                  </p>
                  <p className="apple-body apple-text-gray leading-relaxed mt-2">
                    الموقع الرسمي:{" "}
                    <a
                      href="https://motazdarawsha.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apple-text-blue hover:underline inline-flex items-center gap-1"
                    >
                      https://motazdarawsha.vercel.app
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">تاريخ الإنشاء والتطوير</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    تم تطوير هذا التطبيق في عام 2025 من قبل Motaz Darawsha كأداة مجانية لمجتمع ديسكورد العربي.
                  </p>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">نطاق حقوق الطبع والنشر</h3>
                  <ul className="space-y-2 apple-body apple-text-gray">
                    <li>• التصميم والواجهة الرسومية</li>
                    <li>• الكود المصدري والخوارزميات</li>
                    <li>• المحتوى النصي والترجمات</li>
                    <li>• الشعارات والعناصر البصرية</li>
                    <li>• التوثيق والمساعدة</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* License Information */}
          <Card className="apple-card-elevated">
            <CardContent className="p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-green-500 flex items-center justify-center">
                  <Scale className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="apple-body-large font-semibold">معلومات الترخيص</h2>
                  <p className="apple-caption apple-text-gray">شروط الاستخدام والتوزيع</p>
                </div>
              </div>

              <div className="space-y-6 text-right">
                <div>
                  <h3 className="apple-body font-semibold mb-3">الاستخدام المسموح</h3>
                  <ul className="space-y-2 apple-body apple-text-gray">
                    <li>• الاستخدام الشخصي والتجاري مجاناً</li>
                    <li>• إنشاء رسائل مدمجة لخوادم ديسكورد</li>
                    <li>• مشاركة الروابط والنتائج</li>
                    <li>• التعديل على الرسائل المُنشأة</li>
                  </ul>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">الاستخدام المحظور</h3>
                  <ul className="space-y-2 apple-body apple-text-gray">
                    <li>• نسخ أو توزيع الكود المصدري</li>
                    <li>• إنشاء نسخ مطابقة من التطبيق</li>
                    <li>• استخدام الشعارات أو العلامات التجارية</li>
                    <li>• بيع أو تأجير التطبيق</li>
                    <li>• الهندسة العكسية للكود</li>
                  </ul>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">المكتبات والأدوات المستخدمة</h3>
                  <p className="apple-body apple-text-gray leading-relaxed mb-3">
                    يستخدم هذا التطبيق مكتبات مفتوحة المصدر تحت تراخيص مختلفة:
                  </p>
                  <ul className="space-y-2 apple-body apple-text-gray">
                    <li>• Next.js - MIT License</li>
                    <li>• React - MIT License</li>
                    <li>• Tailwind CSS - MIT License</li>
                    <li>• Lucide React - ISC License</li>
                    <li>• Radix UI - MIT License</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card className="apple-card-elevated">
            <CardContent className="p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-purple-500 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="apple-body-large font-semibold">شروط الخدمة</h2>
                  <p className="apple-caption apple-text-gray">القواعد والالتزامات</p>
                </div>
              </div>

              <div className="space-y-6 text-right">
                <div>
                  <h3 className="apple-body font-semibold mb-3">قبول الشروط</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    باستخدام هذا التطبيق، فإنك توافق على جميع الشروط والأحكام المذكورة في هذه الصفحة. إذا كنت لا توافق
                    على أي من هذه الشروط، يرجى عدم استخدام التطبيق.
                  </p>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">مسؤوليات المستخدم</h3>
                  <ul className="space-y-2 apple-body apple-text-gray">
                    <li>• استخدام التطبيق بطريقة قانونية ومسؤولة</li>
                    <li>• عدم إنشاء محتوى مسيء أو ضار</li>
                    <li>• احترام قوانين وشروط ديسكورد</li>
                    <li>• عدم محاولة اختراق أو إلحاق الضرر بالتطبيق</li>
                  </ul>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">الخصوصية وحماية البيانات</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    نحن نحترم خصوصيتك ولا نجمع أو نحفظ أي بيانات شخصية. جميع المعلومات التي تدخلها تبقى في متصفحك ولا
                    يتم إرسالها إلى خوادمنا إلا عند إرسال الرسالة المدمجة إلى ديسكورد مباشرة.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="apple-card-elevated border-orange-200">
            <CardContent className="p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-orange-500 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="apple-body-large font-semibold">إخلاء المسؤولية</h2>
                  <p className="apple-caption apple-text-gray">تنبيهات مهمة</p>
                </div>
              </div>

              <div className="space-y-6 text-right">
                <div>
                  <h3 className="apple-body font-semibold mb-3">إخلاء المسؤولية العام</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    يتم توفير هذا التطبيق "كما هو" دون أي ضمانات صريحة أو ضمنية. لا نتحمل أي مسؤولية عن أي أضرار مباشرة
                    أو غير مباشرة قد تنتج عن استخدام هذا التطبيق.
                  </p>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">عدم الانتماء إلى ديسكورد</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    هذا التطبيق غير مرتبط رسمياً بشركة Discord Inc. أو أي من منتجاتها. "Discord" هي علامة تجارية مسجلة
                    لشركة Discord Inc.
                  </p>
                </div>

                <div>
                  <h3 className="apple-body font-semibold mb-3">تحديث الشروط</h3>
                  <p className="apple-body apple-text-gray leading-relaxed">
                    نحتفظ بالحق في تحديث هذه الشروط في أي وقت دون إشعار مسبق. يُنصح بمراجعة هذه الصفحة بانتظام للاطلاع
                    على أي تغييرات.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="apple-card-elevated">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="apple-body-large font-semibold mb-6">للتواصل والاستفسارات</h2>
              <p className="apple-body apple-text-gray mb-8 max-w-2xl mx-auto">
                إذا كان لديك أي أسئلة حول حقوق الطبع والنشر أو شروط الاستخدام، يمكنك التواصل معنا عبر الروابط التالية:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="apple-button-primary" asChild>
                  <a
                    href="https://motazdarawsha.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    موقع المطور
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" className="apple-button-secondary bg-transparent" asChild>
                  <a
                    href="https://discord.gg/na7la"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    الدعم الفني
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center apple-large-spacing">
          <Button variant="outline" className="apple-button-secondary bg-transparent" asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
