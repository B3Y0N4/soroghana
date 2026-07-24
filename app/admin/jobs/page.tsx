import { db } from '@/lib/db'
import { matchHelpersToJob, updateJobStatus } from '@/lib/admin-actions'

async function matchAction(jobRequestId: string, formData: FormData) {
  'use server'
  const helperIds = formData.getAll('helperIds').map(String)
  await matchHelpersToJob(jobRequestId, helperIds)
}

export default async function AdminJobsPage() {
  const [jobs, activeHelpers] = await Promise.all([
    db.jobRequest.findMany({
      where: { status: { in: ['open', 'matched'] } },
      include: { matches: { include: { helper: true }, orderBy: { rank: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    }),
    db.helper.findMany({ where: { status: 'active' }, orderBy: { rating: 'desc' } }),
  ])

  return (
    <div className="min-h-screen bg-page-bg p-8">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Job Requests</h1>
      <p className="text-muted text-sm mb-8">Pick up to 3 helpers per request. This is the AI Coordinator&apos;s job eventually — for now it&apos;s you.</p>

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

            {job.matches.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Matched</p>
                <ul className="text-sm text-ink space-y-1">
                  {job.matches.map(m => (
                    <li key={m.id}>#{m.rank} {m.helper.name} — {m.helper.title}</li>
                  ))}
                </ul>
              </div>
            )}

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
          </div>
        ))}
      </div>
    </div>
  )
}
