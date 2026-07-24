import { db } from '@/lib/db'
import { setHelperStatus, updateHelperKyc } from '@/lib/admin-actions'

const POLICE_STATUSES = ['not_started', 'submitted', 'passed', 'failed']
const INTERVIEW_STATUSES = ['not_scheduled', 'scheduled', 'completed', 'failed']
const TIERS = ['unverified', 'standard_helper', 'business_assistant', 'executive_translator']

async function saveKyc(helperId: string, formData: FormData) {
  'use server'
  await updateHelperKyc(helperId, {
    ghanaCardVerified: formData.get('ghanaCardVerified') === 'on',
    policeCheckStatus: String(formData.get('policeCheckStatus')),
    videoInterviewStatus: String(formData.get('videoInterviewStatus')),
    tier: String(formData.get('tier')),
  })
}

export default async function AdminHelpersPage() {
  const helpers = await db.helper.findMany({
    include: { kyc: true },
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div className="min-h-screen bg-page-bg p-8">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Helpers & KYC</h1>
      <p className="text-muted text-sm mb-8">Police checks and video interviews are tracked here manually — there&apos;s no API to automate them against. Ghana Card verification is the one step worth wiring to Smile Identity later.</p>

      <div className="space-y-5 max-w-3xl">
        {helpers.map(h => (
          <div key={h.id} className="bg-white border border-border-col rounded-card p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display font-semibold text-ink">{h.name} <span className="text-muted text-xs font-normal">— {h.title}</span></h2>
                <p className="text-xs text-muted mt-0.5">{h.location} · GHS {h.hourlyRate}/hr · {h.whatsapp} {h.email ? `· ${h.email}` : ''}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-pill border flex-shrink-0 ${
                h.status === 'active' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' :
                h.status === 'pending' ? 'border-amber-200 bg-amber-50 text-amber-600' :
                'border-gray-200 bg-gray-50 text-gray-500'
              }`}>
                {h.status}
              </span>
            </div>

            <p className="text-sm text-ink/80 mb-4">{h.bio}</p>

            <form action={saveKyc.bind(null, h.id)} className="border-t border-border-col pt-4 grid sm:grid-cols-3 gap-3 mb-3">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" name="ghanaCardVerified" defaultChecked={h.kyc?.ghanaCardVerified} />
                Ghana Card verified
              </label>

              <label className="text-xs text-muted">
                Police check
                <select name="policeCheckStatus" defaultValue={h.kyc?.policeCheckStatus} className="block w-full mt-1 text-sm border border-border-col rounded-btn px-2 py-1.5 text-ink">
                  {POLICE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <label className="text-xs text-muted">
                Video interview
                <select name="videoInterviewStatus" defaultValue={h.kyc?.videoInterviewStatus} className="block w-full mt-1 text-sm border border-border-col rounded-btn px-2 py-1.5 text-ink">
                  {INTERVIEW_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <label className="text-xs text-muted sm:col-span-3">
                Tier
                <select name="tier" defaultValue={h.kyc?.tier} className="block w-full mt-1 text-sm border border-border-col rounded-btn px-2 py-1.5 text-ink">
                  {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>

              <button type="submit" className="sm:col-span-3 bg-gold text-soro-black font-bold text-sm px-4 py-2 rounded-btn hover:bg-gold-dark transition-colors">
                Save KYC
              </button>
            </form>

            <div className="flex gap-2 pt-1">
              {h.status !== 'active' && (
                <form action={setHelperStatus.bind(null, h.id, 'active')}>
                  <button type="submit" className="text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-btn px-3 py-1.5 hover:bg-emerald-50">
                    Activate (go live on /browse)
                  </button>
                </form>
              )}
              {h.status !== 'suspended' && (
                <form action={setHelperStatus.bind(null, h.id, 'suspended')}>
                  <button type="submit" className="text-sm font-semibold text-ghana-red border border-red-200 rounded-btn px-3 py-1.5 hover:bg-red-50">
                    Suspend
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
