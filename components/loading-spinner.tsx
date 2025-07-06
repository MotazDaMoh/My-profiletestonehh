export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16 sm:py-32" role="status" aria-label="جاري التحميل">
      <div className="apple-card-elevated p-12 sm:p-16 rounded-3xl text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
        <p className="apple-body apple-text-gray">جاري التحميل...</p>
      </div>
    </div>
  )
}
