import Link from "next/link"
import { ShieldCheck, Lock, Smartphone } from "lucide-react"

const trustItems = [
  { icon: ShieldCheck, label: 'Ghana Card verified' },
  { icon: Lock,        label: 'Escrow-protected payment' },
  { icon: Smartphone,  label: 'Instant MoMo payout' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/40 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pb-8 mb-8 border-b border-white/10 text-xs text-white/50">
          {trustItems.map(t => (
            <span key={t.label} className="flex items-center gap-2">
              <t.icon className="w-3.5 h-3.5 text-gold" />
              {t.label}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="font-display font-bold text-white/70">
            <span className="text-gold">Soro</span> Ghana
          </div>
          <p>&copy; {new Date().getFullYear()} Soro Ghana. Your execution team on the ground in Ghana.</p>
          <div className="flex gap-5">
            <Link href="/browse" className="hover:text-white transition-colors">Browse Pros</Link>
            <Link href="/join" className="hover:text-white transition-colors">Start Earning</Link>
            <Link href="/post-job" className="hover:text-white transition-colors">Request Help</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
