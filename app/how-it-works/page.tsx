import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TierLadder from '@/components/TierLadder'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

const forClients = [
  {
    step: '01',
    title: 'Tell the Coordinator',
    body:  'Describe what you need in your own words — a translator, a warehouse inspection, a driver for three days. No account required.',
  },
  {
    step: '02',
    title: 'Get Matched, Not Just Listed',
    body:  'Our coordinator matches your request to up to 3 KYC-verified pros at the right trust tier, usually within hours.',
  },
  {
    step: '03',
    title: 'Confirm and Pay Securely',
    body:  'Pick who you want, pay by card. Funds are held until the job is confirmed complete — not released upfront.',
  },
  {
    step: '04',
    title: 'Work Happens, Then You Review',
    body:  'Your pro is paid instantly via Mobile Money the moment the job is marked complete. Leave a review after.',
  },
]

const forPros = [
  {
    step: '01',
    title: 'Create Your Profile',
    body:  'List your skills, languages, and rates. Takes 5 minutes. Free to join — no subscription required.',
  },
  {
    step: '02',
    title: 'Get Verified Into a Tier',
    body:  'Submit your Ghana Card, complete a video interview. Verification places you at Standard Helper, Business Assistant, or Executive Translator.',
  },
  {
    step: '03',
    title: 'Get Offered Real Jobs',
    body:  'Our coordinator offers you jobs that match your tier and skills. You decide which ones to take.',
  },
  {
    step: '04',
    title: 'Get Paid Instantly',
    body:  'The moment a job is marked complete, payment lands in your Mobile Money account — no chasing invoices.',
  },
]

const trustPoints = [
  'Ghana Card identity verification for every pro, checked against the national ID system',
  'Police check and a video interview before anyone reaches Business Assistant tier or above',
  'Payment held in escrow — visitors are charged by card, but funds only release on completion',
  'Every engagement is trackable through the job, not a private off-platform deal',
  'Real client reviews tied to completed jobs — no anonymous ratings',
]

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-page-bg pt-nav">

        {/* Hero */}
        <div className="bg-white border-b border-border-col py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-ink text-3xl sm:text-4xl mb-3">
              Coordinated, Not Just Listed
            </h1>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Soro Ghana isn&apos;t a directory you scroll and DM. A coordinator matches your request to vetted
              pros, payment is held until the job is done, and helpers get paid instantly on completion.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

          {/* For Clients */}
          <section>
            <div className="mb-10">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">For Clients & Businesses</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-1">From request to completed job.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {forClients.map(s => (
                <div key={s.step} className="bg-white border border-border-col rounded-card p-6">
                  <div className="font-display font-black text-4xl text-gold/20 leading-none mb-3">{s.step}</div>
                  <h3 className="font-display font-semibold text-ink text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/post-job" className="inline-flex items-center gap-2 bg-gold text-soro-black font-bold px-5 py-2.5 rounded-btn text-sm hover:bg-gold-dark transition-colors">
                Request Help <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Tiers */}
          <section>
            <div className="mb-10">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">Trust Tiers</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-1">The tier tells you what&apos;s already been verified.</h2>
            </div>
            <TierLadder />
          </section>

          {/* For Pros */}
          <section>
            <div className="mb-10">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">For Professionals</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-1">Turn your skills into income.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {forPros.map(s => (
                <div key={s.step} className="bg-white border border-border-col rounded-card p-6">
                  <div className="font-display font-black text-4xl text-gold/20 leading-none mb-3">{s.step}</div>
                  <h3 className="font-display font-semibold text-ink text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/join" className="inline-flex items-center gap-2 bg-soro-black text-white font-bold px-5 py-2.5 rounded-btn text-sm hover:bg-charcoal transition-colors">
                Create Your Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Trust */}
          <section className="bg-white border border-border-col rounded-card p-8">
            <h2 className="font-display font-bold text-xl text-ink mb-6">How we build trust</h2>
            <ul className="space-y-3">
              {trustPoints.map(t => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-8">Frequently asked questions</h2>
            <div className="space-y-5">
              {[
                {
                  q: 'Is it free to join as a professional?',
                  a: 'Yes. Creating your profile is completely free. We take a small commission only after you successfully complete jobs, and your first 3 jobs are commission-free.',
                },
                {
                  q: 'How does verification work?',
                  a: 'You submit your Ghana Card for ID verification. Depending on the tier, you may also complete a police check and a video interview. Our team reviews every profile manually before it goes live.',
                },
                {
                  q: 'How does payment actually work?',
                  a: 'Visitors pay by card in their own currency. We hold that payment until the job is marked complete, then pay the pro instantly via Mobile Money in GHS. Neither side has to chase the other for money.',
                },
                {
                  q: 'Can international clients use Soro Ghana?',
                  a: 'Yes — that’s who we’re built for first. Trade delegations, business travelers, investors, and diaspora who need trusted execution on the ground, not just information.',
                },
                {
                  q: 'What if I speak a language not listed?',
                  a: 'Contact us and we will add it. Soro Ghana supports any language that connects Ghanaian professionals with clients.',
                },
              ].map(faq => (
                <div key={faq.q} className="bg-white border border-border-col rounded-card p-5">
                  <h3 className="font-display font-semibold text-ink text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
