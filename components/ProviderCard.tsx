import type { Provider } from "@/lib/providers"
import { Star, ShieldCheck } from "lucide-react"

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-card-bg border border-border-col rounded-card p-5 hover:shadow-lg hover:border-gold/40 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-2xl">
          {provider.avatar}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${provider.tagColor}`}>{provider.tag}</span>
      </div>

      <div className="font-display font-semibold text-ink text-sm mb-0.5 group-hover:text-gold transition-colors">{provider.name}</div>
      <div className="text-xs text-muted mb-2">{provider.role}</div>

      <div className="flex items-center gap-3 mb-3 text-xs">
        {provider.rating > 0 && (
          <span className="flex items-center gap-1 font-semibold text-ink">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            {provider.rating.toFixed(1)}
            <span className="text-muted font-normal">({provider.reviewCount})</span>
          </span>
        )}
        {provider.verified && (
          <span className="flex items-center gap-1 text-gold font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Ghana Card Verified
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {provider.skills.slice(0, 4).map(s => (
          <span key={s} className="text-[10px] bg-gold-50 text-gold-dark border border-gold/20 rounded-full px-2 py-0.5 font-medium">{s}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border-col">
        <span className="text-xs font-bold text-ink">{provider.rate}</span>
        <span className="text-[10px] text-muted">📍 {provider.location}</span>
      </div>
    </div>
  )
}
