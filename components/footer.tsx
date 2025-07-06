import Link from "next/link"
import { MessageSquare, ExternalLink, Heart, Copyright } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="apple-bg-athens border-t border-gray-200" role="contentinfo">
      <div className="max-w-7xl mx-auto apple-container-padding py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <MessageSquare className="h-8 w-8 apple-text-blue" aria-hidden="true" />
              <span className="apple-body-large font-semibold">منشئ الرسائل المدمجة</span>
            </div>
            <p className="apple-body apple-text-gray leading-relaxed mb-6 max-w-md">
              أداة مجانية ومتقدمة لإنشاء رسائل ديسكورد مدمجة احترافية مع معاينة فورية وتخصيص شامل.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse apple-body apple-text-gray">
              <span>صُنع بـ</span>
              <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
              <span>في فلسطين</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="apple-body-large font-semibold mb-6">روابط سريعة</h3>
            <nav className="space-y-4" aria-label="روابط سريعة">
              <Link
                href="#features"
                className="block apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                المميزات
              </Link>
              <Link
                href="#preview"
                className="block apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                المعاينة
              </Link>
              <Link
                href="#na7la"
                className="block apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                سيرفر نحلة
              </Link>
              <Link
                href="/na7la"
                className="block apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                معلومات نحلة
              </Link>
            </nav>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="apple-body-large font-semibold mb-6">قانوني ودعم</h3>
            <nav className="space-y-4" aria-label="روابط قانونية ودعم">
              <Link
                href="/copyright"
                className="flex items-center space-x-2 space-x-reverse apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                <Copyright className="h-4 w-4" aria-hidden="true" />
                <span>حقوق الطبع والنشر</span>
              </Link>
              <a
                href="https://motazdarawsha.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 space-x-reverse apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>موقع المطور</span>
              </a>
              <a
                href="https://discord.gg/na7la"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 space-x-reverse apple-body apple-text-gray hover:apple-text-blue transition-colors duration-200"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>الدعم الفني</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="apple-caption apple-text-gray text-center md:text-right">
              © 2025 منشئ الرسائل المدمجة. جميع الحقوق محفوظة لـ{" "}
              <a
                href="https://motazdarawsha.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-text-blue hover:underline"
              >
                Motaz Darawsha
              </a>
            </div>
            <div className="apple-caption apple-text-gray">الإصدار 2.1.0 | آخر تحديث: يناير 2025</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
