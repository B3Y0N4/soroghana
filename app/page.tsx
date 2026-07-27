import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProviderCard from '@/components/ProviderCard'
import RequestHero from '@/components/RequestHero'
import TierLadder from '@/components/TierLadder'
import Link from 'next/link'
import { categories, allLanguages } from '@/lib/categories'
import { getHomeStats } from '@/lib/helpers'
import { ShieldCheck, Lock, Smartphone, MessagesSquare } from 'lucide-react'

const trustBar = [
  { icon: ShieldCheck, label: 'Ghana Card KYC' },
  { icon: MessagesSquare, label: 'Video-interviewed' },
  { icon: Lock, label: 'Escrow-protected payment' },
  { icon: Smartphone, label: 'Instant MoMo payout' },
]

const segments = [
  { title: 'Trade Delegations & Investors', body: 'Interpreters, procurement officers, and factory-floor fixers for multi-day visits — briefed and ready before you land.' },
  { title: 'Diaspora & Family', body: 'A trusted person to handle a property visit, a procurement trip, or a family matter you can’t be there for yourself.' },
  { title: 'Students', body: 'University registration, housing, opening a bank account — someone who’s done it before, on the ground with you.' },
  { title: 'Medical Visitors', body: 'Hospital navigation, appointment booking, translation, medicine pickup — for care that can’t wait for a tour guide.' },
  { title: 'NGOs & Development Orgs', body: 'Local navigators and translators for field visits, vetted the same way as everyone else on the platform.' },
  { title: 'Travelers', body: 'From the airport to hidden restaurants to a private driver for the day — the parts of Ghana a search engine can’t show you.' },
]

const steps = [
  { n: '01', title: 'Tell the Coordinator', body: 'Describe what you need in your own words. No account required.' },
  { n: '02', title: 'Get 3 Vetted Matches', body: 'Our coordinator matches you with up to 3 KYC-verified pros, usually within hours.' },
  { n: '03', title: 'Pay Securely, Work Confidently', body: 'Charged by card, held until the job’s done. Your pro is paid instantly via Mobile Money on completion.' },
]

export default async function Home() {
  const { featuredProviders, helperCount, avgRating } = await getHomeStats()

  // Real counts only — a fabricated "500+ pros" undercuts the exact trust
  // this platform is selling once a visitor clicks through to /browse.
  const stats = [
    { n: `${helperCount}`,                          l: 'Verified Pros'  },
    { n: `${categories.length}`,                    l: 'Categories'     },
    { n: `${allLanguages.length}+`,                 l: 'Languages'      },
    { n: avgRating ? `${avgRating}★` : '—',         l: 'Average Rating' },
  ]

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="flex flex-col bg-gradient-to-br from-page-bg to-gold-light pt-nav">
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 border border-gold/40 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-gold-dark text-xs font-semibold tracking-widest uppercase">Your execution team on the ground in Ghana</span>
          </div>

          <h1 className="font-display font-bold text-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight max-w-4xl mb-4 text-balance">
            Vetted local experts,{' '}
            <span className="text-gold-dark">matched to exactly what you need.</span>
          </h1>
          <p className="text-muted text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
            Soro Ghana matches you with KYC-verified Ghanaians for the work that has to happen in person —
            negotiating, translating, inspecting, navigating. Coordinated for you, paid securely.
          </p>

          <RequestHero />

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-2xl text-xs text-muted">
            {trustBar.map(t => (
              <span key={t.label} className="flex items-center gap-1.5">
                <t.icon className="w-3.5 h-3.5 text-gold-dark" />
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-page-bg py-10 border-b border-border-col">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.l}>
                <div className="font-display font-bold text-3xl text-ink mb-1">{s.n}</div>
                <div className="text-sm text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-white py-20 px-4 border-b border-border-col">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Whatever Brought You to Ghana</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Who we serve.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {segments.map(s => (
              <div key={s.title} className="border border-border-col rounded-card p-6">
                <h3 className="font-display font-semibold text-ink text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIER LADDER */}
      <section className="bg-page-bg py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Matched by Trust Tier</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Every pro is vetted to a tier.</h2>
            <p className="text-muted mt-2 text-sm max-w-lg mx-auto">The tier tells you how much trust has already been verified before you ever speak to them.</p>
          </div>
          <TierLadder />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-20 px-4 border-y border-border-col">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Browse by Category</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Every skill Ghana has to offer.</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/browse?cat=${cat.slug}`}
                className="group bg-white border border-border-col rounded-card p-5 hover:border-gold hover:shadow-card transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-3">
                  <cat.icon className="w-5 h-5 text-soro-black" />
                </div>
                <div className="font-display font-semibold text-sm text-ink group-hover:text-gold transition-colors mb-1">{cat.label}</div>
                <div className="text-xs text-muted leading-relaxed">{cat.description}</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/browse" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
              Browse all categories →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROS */}
      <section className="bg-page-bg py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">Vetted Professionals</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Meet Ghana&apos;s best.</h2>
              <p className="text-muted mt-2 text-sm">Every pro is identity-verified. Real reviews from real clients.</p>
            </div>
            <Link href="/browse" className="hidden sm:block text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
              View all →
            </Link>
          </div>

          {featuredProviders.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredProviders.map(provider => (
                  <ProviderCard key={provider.slug} provider={provider} />
                ))}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Link href="/browse" className="text-sm font-semibold text-gold">View all professionals →</Link>
              </div>
            </>
          ) : (
            <p className="text-muted text-sm">
              <Link href="/browse" className="text-gold font-semibold hover:text-gold-dark">Browse all professionals →</Link>
            </p>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-4 border-y border-border-col">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Coordinated, not just listed.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-[60%] right-0 h-px border-t-2 border-dashed border-border-col" />
                )}
                <div className="font-display font-black text-5xl text-gold/15 mb-3 leading-none">{s.n}</div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/how-it-works" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
              Read the full breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* LANGUAGE CTA */}
      <section className="bg-gold-light py-14 px-4 border-y border-gold/15">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="font-display font-bold text-ink text-2xl sm:text-3xl mb-2">
              Visiting Ghana? We speak your language.
            </h2>
            <p className="text-muted text-sm max-w-md">
              Find French, Spanish, Arabic, and Chinese-speaking professionals who understand your context — not just your words.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 flex-shrink-0">
            {['French', 'Spanish', 'Arabic', 'Chinese'].map(lang => (
              <Link
                key={lang}
                href={`/browse?lang=${lang}`}
                className="text-sm font-semibold bg-white border border-gold/25 text-ink px-4 py-2 rounded-btn hover:border-gold hover:text-gold-dark transition-colors"
              >
                {lang} speakers
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA — the one deliberately bold, dark moment on the page */}
      <section className="bg-gradient-to-br from-soro-black to-charcoal py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">For Skilled Ghanaians</p>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-4">
            Your skills are worth more than{' '}
            <span className="relative inline-block">
              GHS 1,500
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-error/70 rounded" />
            </span>{' '}
            a month.
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            A single 3-day booking as a Business Assistant pays <span className="text-gold font-semibold">GHS 3,600+</span> —
            more than a typical month. Student, freelancer, or full-time professional: get verified,
            get placed in a trust tier, and earn what international clients actually pay for the work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="bg-gradient-to-br from-gold to-gold-dark hover:brightness-105 text-soro-black font-bold px-8 py-4 rounded-btn text-sm transition-all"
            >
              Start Earning — It&apos;s Free
            </Link>
            <Link
              href="/how-it-works"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              Learn how it works →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
