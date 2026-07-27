import { User, Briefcase, Award } from 'lucide-react'

export const tiers = [
  {
    icon: User,
    name: 'Standard Helper',
    price: 'From GHS 90/hr',
    body: 'Errands, local navigation, basic translation, day-to-day logistics. Ghana Card verified.',
  },
  {
    icon: Briefcase,
    name: 'Business Assistant',
    price: 'From GHS 150/hr',
    body: 'Meeting prep, procurement trips, market research, supplier negotiation support. Video-interviewed.',
  },
  {
    icon: Award,
    name: 'Executive Translator',
    price: 'From GHS 220/hr',
    body: 'Live interpreting for investor meetings, factory visits, and high-stakes negotiations. Fully vetted.',
  },
]

export default function TierLadder() {
  return (
    <div className="grid sm:grid-cols-3 gap-5">
      {tiers.map(t => (
        <div key={t.name} className="bg-white border border-border-col rounded-card p-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-4">
            <t.icon className="w-5 h-5 text-soro-black" />
          </div>
          <h3 className="font-display font-semibold text-ink text-base mb-1">{t.name}</h3>
          <p className="text-xs font-semibold text-gold mb-3">{t.price}</p>
          <p className="text-sm text-muted leading-relaxed">{t.body}</p>
        </div>
      ))}
    </div>
  )
}
