import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

const forClients = [
  {
    step: '01',
    title: 'Browse or Post',
    body:  'Search by skill, language, or category. Or post a job and let pros come to you. No account required to browse.',
  },
  {
    step: '02',
    title: 'Contact Directly',
    body:  'Reach out via WhatsApp — no middleman, no back-and-forth in a clunky inbox. Real conversations in real time.',
  },
  {
    step: '03',
    title: 'Agree and Work',
    body:  'Agree on scope and price directly with your pro. No platform lock-in. Your deal, your terms.',
  },
  {
    step: '04',
    title: 'Leave a Review',
    body:  'After the job, leave a verified review. This helps the best pros rise and gives future clients confidence.',
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
    title: 'Get Verified',
    body:  'Submit your Ghana Card for identity verification. Verified pros get a badge and earn more client trust.',
  },
  {
    step: '03',
    title: 'Receive Enquiries',
    body:  'Clients contact you directly via WhatsApp. You decide which jobs to take and what to charge.',
  },
  {
    step: '04',
    title: 'Build Your Reputation',
    body:  'Each completed job + review builds your profile score. More reviews = more visibility = more income.',
  },
]

const trustPoints = [
  'Ghana Card identity verification for all pros',
  'Real client reviews — no anonymous ratings',
  'Manual profile review before going live',
  'WhatsApp-based contact — no spam or bots',
  'Pro response time tracked and displayed',
]

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-page-bg pt-nav">

        {/* Hero */}
        <div className="bg-soro-black py-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 flex">
            <div className="flex-1 bg-ghana-red" />
            <div className="flex-1 bg-gold" />
            <div className="flex-1 bg-ghana-green" />
          </div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="font-display font-bold text-white text-3xl sm:text-4xl mb-3">
              How Soro Ghana Works
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto">
              Simple for clients. Powerful for professionals. No noise, no hidden fees — just real work at real rates.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

          {/* For Clients */}
          <section>
            <div className="mb-10">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">For Clients & Businesses</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-1">Find the right pro, fast.</h2>
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
              <Link href="/browse" className="inline-flex items-center gap-2 bg-gold text-soro-black font-bold px-5 py-2.5 rounded-btn text-sm hover:bg-gold-dark transition-colors">
                Browse Professionals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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
                  a: 'After submitting your profile, you submit a photo of your Ghana Card. Our team verifies it manually within 24 hours. Verified pros get a badge on their profile.',
                },
                {
                  q: 'How do clients pay me?',
                  a: 'Payment is agreed directly between you and the client. We support Mobile Money (MTN, Telecel, AirtelTigo), bank transfer, and cash for in-person jobs. We do not handle payments — you agree the terms directly.',
                },
                {
                  q: 'Can international clients use Soro Ghana?',
                  a: 'Yes. Many of our clients are French, Spanish, and English-speaking businesses and visitors who need professionals in Ghana. Our platform is designed for cross-border connections.',
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
