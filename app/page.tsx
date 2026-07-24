import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProviderCard from '@/components/ProviderCard'
import Link from 'next/link'
import { categories } from '@/lib/categories'
import { getFeaturedProviders } from '@/lib/helpers'

const steps = [
  {
    n:     '01',
    title: 'Post or Browse',
    body:  'Tell us what you need or search directly by category, skill, or language. No sign-up required to browse.',
  },
  {
    n:     '02',
    title: 'Match with a Vetted Pro',
    body:  'Every professional on Soro Ghana is identity-verified with real reviews from real clients.',
  },
  {
    n:     '03',
    title: 'Work Together, Pay Fairly',
    body:  'Agree terms directly. Pay what skilled work is worth — not what the market decided years ago.',
  },
]

const stats = [
  { n: '500+',  l: 'Verified Pros'     },
  { n: '6',     l: 'Categories'        },
  { n: '11+',   l: 'Languages'         },
  { n: '4.9★',  l: 'Average Rating'    },
]

export default async function Home() {
  const featuredProviders = await getFeaturedProviders()

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col bg-soro-black pt-nav overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-ghana-red" />
          <div className="flex-1 bg-gold" />
          <div className="flex-1 bg-ghana-green" />
        </div>

        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #E8A020 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold opacity-[0.07] blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Built for Ghanaians, by Ghanaians</span>
          </div>

          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight max-w-4xl mb-4">
            Your skills deserve{' '}
            <span className="text-gold">more than</span>{' '}
            <span className="relative inline-block">
              GHS 1,500
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ghana-red/70 rounded" />
            </span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
            Soro Ghana connects skilled Ghanaians with real clients — local and international.
            Translators, developers, fixers, designers, on-ground service pros. Get paid what your work is actually worth.
          </p>

          <div className="w-full max-w-2xl mb-6">
            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-white/10">
              <input
                type="text"
                placeholder="What do you need? e.g. French translator, web developer…"
                className="flex-1 px-5 py-4 text-ink placeholder:text-muted text-sm outline-none bg-transparent"
                readOnly
              />
              <Link
                href="/browse"
                className="bg-gold hover:bg-gold-dark text-soro-black font-bold text-sm px-6 py-4 transition-colors whitespace-nowrap"
              >
                Find a Pro
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/browse?cat=${cat.slug}`}
                className="text-xs bg-white/8 hover:bg-white/14 text-white/70 hover:text-white border border-white/10 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 56L1440 56L1440 28C1200 8 960 0 720 0C480 0 240 8 0 28L0 56Z" fill="#FAFAF8"/>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-page-bg py-10 border-b border-border-col">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.n}>
                <div className="font-display font-bold text-3xl text-ink mb-1">{s.n}</div>
                <div className="text-sm text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-page-bg py-20 px-4">
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
                <div className="text-3xl mb-3">{cat.icon}</div>
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
      <section className="bg-white py-20 px-4 border-y border-border-col">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProviders.map(provider => (
              <ProviderCard key={provider.slug} provider={provider} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/browse" className="text-sm font-semibold text-gold">View all professionals →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-page-bg py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Three steps, zero friction.</h2>
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
        </div>
      </section>

      {/* LANGUAGE CTA */}
      <section className="bg-charcoal py-14 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-2">
              Visiting Ghana? We speak your language.
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              Find French, Spanish, Arabic, and Chinese-speaking professionals who understand your context — not just your words.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 flex-shrink-0">
            {['French', 'Spanish', 'Arabic', 'Chinese'].map(lang => (
              <Link
                key={lang}
                href={`/browse?lang=${lang}`}
                className="text-sm font-semibold border border-white/20 text-white px-4 py-2 rounded-btn hover:border-gold hover:text-gold transition-colors"
              >
                {lang} speakers
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="bg-soro-black py-20 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-ghana-red" />
          <div className="flex-1 bg-gold" />
          <div className="flex-1 bg-ghana-green" />
        </div>
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #E8A020 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-5">🇬🇭</div>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-4">
            Are you a skilled Ghanaian?<br />
            <span className="text-gold">Get paid what you&apos;re worth.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Stop working for a fixed salary that undervalues what you bring.
            Create your profile today and start earning from international clients, businesses, and visitors — on your terms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="bg-gold hover:bg-gold-dark text-soro-black font-bold px-8 py-4 rounded-btn text-sm transition-colors"
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
