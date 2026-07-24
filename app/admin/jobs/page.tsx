import { db } from '@/lib/db'
import { acceptMatch, matchHelpersToJob, updateEngagementStatus, updateJobStatus } from '@/lib/admin-actions'

async function matchAction(jobRequestId: string, formData: FormData) {
  'use server'
  const helperIds = formData.getAll('helperIds').map(String)
  await matchHelpersToJob(jobRequestId, helperIds)
}

const ENGAGEMENT_STEPS = ['scheduled', 'checked_in', 'in_progress', 'completed'] as const

export default async function AdminJobsPage() {
  const [jobs, activeHelpers] = await Promise.all([
    db.jobRequest.findMany({
      where: { status: { in: ['open', 'matched', 'in_progress'] } },
      include: {
        matches: { include: { helper: true }, orderBy: { rank: 'asc' } },
        engagement: { include: { helper: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.helper.findMany({ where: { status: 'active' }, orderBy: { rating: 'desc' } }),
  ])

  return (
    <div className="min-h-screen bg-page-bg p-8">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Job Requests</h1>
      <p className="text-muted text-sm mb-8">Pick up to 3 helpers per request, then confirm whichever one the visitor actually chose (over WhatsApp, for now). This whole loop is the AI Coordinator&apos;s job eventually — for now it&apos;s you.</p>

      <div className="space-y-6 max-w-4xl">
        {jobs.length === 0 && <p className="text-muted text-sm">No open job requests.</p>}

        {jobs.map(job => (
          <div key={job.id} className="bg-white border border-border-col rounded-card p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="font-display font-semibold text-ink">{job.title}</h2>
                <p className="text-xs text-muted mt-0.5">
                  {job.category} · {job.location || 'location n/a'} · {job.contactName} ({job.contactPhone})
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-pill border border-border-col text-muted flex-shrink-0">
                {job.status}
              </span>
            </div>

            <p className="text-sm text-ink/80 mb-4">{job.description}</p>

            {job.engagement ? (
              <div className="mb-4 bg-gold-light border border-gold/20 rounded-card p-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                  Booked with {job.engagement.helper.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ENGAGEMENT_STEPS.map(step => (
                    <form key={step} action={updateEngagementStatus.bind(null, job.engagement!.id, step)}>
                      <button
                        type="submit"
                        disabled={job.engagement!.status === step}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-pill border transition-colors ${
                          job.engagement!.status === step
                            ? 'bg-soro-black text-white border-soro-black'
                            : 'border-border-col text-ink hover:border-gold'
                        }`}
                      >
                        {step.replace('_', ' ')}
                      </button>
                    </form>
                  ))}
                  <form action={updateEngagementStatus.bind(null, job.engagement.id, 'cancelled')}>
                    <button type="submit" className="text-xs font-semibold px-3 py-1.5 rounded-pill border border-border-col text-ghana-red hover:border-ghana-red">
                      cancelled
                    </button>
                  </form>
                </div>
              </div>
            ) : job.matches.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Offered — confirm which one the visitor picked</p>
                <ul className="text-sm text-ink space-y-2">
                  {job.matches.map(m => (
                    <li key={m.id} className="flex items-center justify-between gap-3">
                      <span>#{m.rank} {m.helper.name} — {m.helper.title} <span className="text-xs text-muted">({m.status})</span></span>
                      {m.status === 'offered' && (
                        <form action={acceptMatch.bind(null, m.id)}>
                          <button type="submit" className="text-xs font-semibold text-emerald-600 border border-emerald-200 rounded-btn px-2.5 py-1 hover:bg-emerald-50">
                            Visitor picked this one
                          </button>
                        </form>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!job.engagement && (
              <form action={matchAction.bind(null, job.id)} className="border-t border-border-col pt-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Select up to 3 helpers to offer (ranked by rating)</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-3 max-h-64 overflow-y-auto">
                  {activeHelpers.map(h => (
                    <label key={h.id} className="flex items-center gap-2 text-sm text-ink border border-border-col rounded-btn px-3 py-2 cursor-pointer hover:border-gold">
                      <input type="checkbox" name="helperIds" value={h.id} defaultChecked={job.matches.some(m => m.helperId === h.id)} />
                      {h.name} <span className="text-muted text-xs">— {h.categoriesCsv}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-gold text-soro-black font-bold text-sm px-4 py-2 rounded-btn hover:bg-gold-dark transition-colors">
                    Save matches
                  </button>
                  <button formAction={updateJobStatus.bind(null, job.id, 'cancelled')} className="border border-border-col text-ink text-sm px-4 py-2 rounded-btn hover:border-ghana-red hover:text-ghana-red transition-colors">
                    Cancel job
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
