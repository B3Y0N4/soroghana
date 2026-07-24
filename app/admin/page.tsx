import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminDashboard() {
  const [openJobs, pendingHelpers, activeHelpers] = await Promise.all([
    db.jobRequest.count({ where: { status: 'open' } }),
    db.helper.count({ where: { status: 'pending' } }),
    db.helper.count({ where: { status: 'active' } }),
  ])

  const cards = [
    { label: 'Open job requests awaiting match', value: openJobs, href: '/admin/jobs' },
    { label: 'Helper signups awaiting KYC review', value: pendingHelpers, href: '/admin/helpers' },
    { label: 'Active helpers live on the platform', value: activeHelpers, href: '/admin/helpers' },
  ]

  return (
    <div className="min-h-screen bg-page-bg p-8">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Soro Ghana Ops</h1>
      <p className="text-muted text-sm mb-8">Manual coordinator console — this is the human matching loop until there&apos;s enough match history to automate.</p>

      <div className="grid sm:grid-cols-3 gap-5">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="bg-white border border-border-col rounded-card p-5 hover:border-gold transition-colors">
            <div className="font-display font-black text-3xl text-ink mb-1">{c.value}</div>
            <div className="text-sm text-muted">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
