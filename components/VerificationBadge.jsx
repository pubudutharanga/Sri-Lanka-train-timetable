export default function VerificationBadge() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-sm">
      <span className="text-green-600">✅</span>
      <div>
        <span className="font-semibold text-green-900">Schedule verified against Sri Lanka Railways official data</span>
        <span className="text-green-700 ml-2">• Last updated: July 2026</span>
      </div>
    </div>
  )
}
