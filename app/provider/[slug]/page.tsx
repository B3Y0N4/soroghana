import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getProviderBySlug } from '@/lib/helpers'
import { Star, CheckCircle, MapPin, Clock, MessageCircle, ArrowLeft, Briefcase, TrendingUp } from 'lucide-react'

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`${cls} ${n <= Math.round(rating) ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  )
}

const tierLabels: Record<string, string> = {
  standard_helper:      'Standard Helper',
  business_assistant:   'Business Assistant',
  executive_translator: 'Executive Translator',
}

const availLabel = {
  available: { text: 'Available now',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  busy:      { text: 'Currently busy', color: 'text-amber-600  bg-amber-50  border-amber-200'   },
  away:      { text: 'Away',           color: 'text-gray-500   bg-gray-50   border-gray-200'    },
}

export default async function ProviderProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const provider = await getProviderBySlug(slug).catch(() => null)
  if (!provider) notFound()

  const avail = availLabel[provider.availability]

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-page-bg pt-nav">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Back */}
          <Link href="/browse" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Browse
          </Link>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Left: Main content */}
            <div className="space-y-6">

              {/* Profile card */}
              <div className="bg-white rounded-card border border-border-col p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-soro-black font-display font-black text-2xl flex-shrink-0">
                    {provider.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h1 className="font-display font-bold text-ink text-xl">{provider.name}</h1>
                          {provider.verified && (
                            <span className="flex items-center gap-1 text-xs text-gold font-medium">
                              <CheckCircle className="w-3.5 h-3.5" /> Verified
                            </span>
                          )}
                        </div>
                        <p className="text-muted text-sm mt-0.5">{provider.title}</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-pill border flex-shrink-0 ${avail.color}`}>
                        {avail.text}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />{provider.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />Responds {provider.responseTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />{provider.completedJobs} jobs completed
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Stars rating={provider.rating} />
                      <span className="text-sm font-semibold text-ink">{provider.rating.toFixed(2)}</span>
                      <span className="text-sm text-muted">({provider.reviewCount} reviews)</span>
                      <span className="ml-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />{provider.successRate}% success
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-white rounded-card border border-border-col p-6">
                <h2 className="font-display font-semibold text-ink text-base mb-3">About</h2>
                <p className="text-sm text-muted leading-relaxed">{provider.bio}</p>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-card border border-border-col p-6">
                <h2 className="font-display font-semibold text-ink text-base mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-50 border border-border-col text-muted px-3 py-1.5 rounded-pill"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-card border border-border-col p-6">
                <h2 className="font-display font-semibold text-ink text-base mb-4">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.languages.map(lang => (
                    <span
                      key={lang}
                      className="text-xs bg-gold-light border border-gold/20 text-gold font-medium px-3 py-1.5 rounded-pill"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-card border border-border-col p-6">
                <h2 className="font-display font-semibold text-ink text-base mb-5">
                  Client Reviews ({provider.reviewCount})
                </h2>
                <div className="space-y-5">
                  {provider.reviews.map(review => (
                    <div key={review.id} className="pb-5 border-b border-border-col last:pb-0 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-muted flex-shrink-0">
                          {review.reviewerInitials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div>
                              <span className="text-sm font-semibold text-ink">{review.reviewerName}</span>
                              <span className="text-xs text-muted ml-2">· {review.clientType}</span>
                            </div>
                            <span className="text-xs text-muted flex-shrink-0">{review.date}</span>
                          </div>
                          <Stars rating={review.rating} />
                          <p className="text-sm font-semibold text-ink mt-2 mb-1">{review.title}</p>
                          <p className="text-sm text-muted leading-relaxed">{review.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sticky booking card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-card border border-border-col p-6">
                <div className="mb-5">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display font-black text-3xl text-ink">
                      GHS {provider.hourlyRate.toLocaleString()}
                    </span>
                    <span className="text-muted text-sm">/hr</span>
                  </div>
                  {provider.dayRate && (
                    <p className="text-sm text-muted">
                      GHS {provider.dayRate.toLocaleString()} / full day
                    </p>
                  )}
                </div>

                <Link
                  href={`/post-job?desc=${encodeURIComponent(`I'd like to request ${provider.name} (${provider.title}) for a job.`)}`}
                  className="flex items-center justify-center w-full bg-gold hover:bg-gold-dark text-soro-black font-bold py-3 rounded-btn text-sm transition-colors mb-3"
                >
                  Request via Coordinator
                </Link>

                <a
                  href={`https://wa.me/?text=Hi ${encodeURIComponent(provider.name)}, I found your profile on Soro Ghana and would like to discuss a job.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-border-col text-ink hover:border-gold hover:text-gold font-semibold py-3 rounded-btn text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message on WhatsApp
                </a>

                <p className="text-xs text-muted mt-3 text-center">
                  Requesting through the coordinator keeps your payment escrow-protected until the job is done.
                </p>

                <div className="mt-5 pt-5 border-t border-border-col space-y-3 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Member since</span>
                    <span className="text-ink font-medium">{provider.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jobs completed</span>
                    <span className="text-ink font-medium">{provider.completedJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success rate</span>
                    <span className="text-emerald-600 font-medium">{provider.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response time</span>
                    <span className="text-ink font-medium">{provider.responseTime}</span>
                  </div>
                  {provider.verified && (
                    <div className="flex items-center gap-1.5 pt-1 text-gold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="font-medium">Identity verified</span>
                    </div>
                  )}
                  {provider.tier && provider.tier !== 'unverified' && (
                    <div className="flex justify-between pt-1">
                      <span>Trust tier</span>
                      <span className="text-ink font-medium">{tierLabels[provider.tier]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
