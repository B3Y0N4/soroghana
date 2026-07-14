import type { Provider } from "@/lib/providers"

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-card-bg border border-border-col rounded-card p-5 hover:shadow-lg hover:border-gold/40 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center text-2xl">
          {provider.avatar}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${provider.tagColor}`}>{provider.tag}</span>
      </div>
      <div className="font-display font-semibold text-ink text-sm mb-0.5 group-hover:text-gold transition-colors">{provider.name}</div>
      <div className="text-xs text-muted mb-3">{provider.role}</div>
      <div className="flex flex-wrap gap-1 mb-4">
        {provider.skills.map(s => (
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
