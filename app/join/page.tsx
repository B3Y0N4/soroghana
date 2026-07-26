'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { categories, allLanguages } from '@/lib/categories'
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { tiers } from '@/components/TierLadder'

type Step = 'basics' | 'skills' | 'rates' | 'done'

interface FormData {
  name:       string
  location:   string
  whatsapp:   string
  email:      string
  title:      string
  bio:        string
  categories: string[]
  languages:  string[]
  skills:     string
  hourlyRate: string
  dayRate:    string
}

const perks = [
  'Set your own rates — no ceiling',
  'Work with local and international clients',
  'Get placed into a trust tier as you verify — more trust, more jobs',
  'Get offered jobs, not left to cold-DM strangers',
  'Paid instantly via Mobile Money the moment a job is marked complete',
  'Free to join — no monthly fees',
]

export default function JoinPage() {
  const [step, setStep] = useState<Step>('basics')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormData>({
    name: '', location: '', whatsapp: '', email: '', title: '', bio: '',
    categories: [], languages: [], skills: '', hourlyRate: '', dayRate: '',
  })

  const set = (key: keyof FormData, val: string | string[]) =>
    setForm(f => ({ ...f, [key]: val }))

  const submit = async () => {
    if (!form.hourlyRate || submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/helpers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to submit profile')
      setStep('done')
    } catch {
      setError('Something went wrong submitting your profile. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleItem = (key: 'categories' | 'languages', val: string) => {
    const arr = form[key]
    set(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const steps: Step[] = ['basics', 'skills', 'rates']
  const stepIdx        = steps.indexOf(step)

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-page-bg pt-nav">

        {step === 'done' ? (
          /* Success screen */
          <div className="max-w-lg mx-auto px-4 py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="font-display font-bold text-2xl text-ink mb-3">
              You&apos;re on the list, {form.name.split(' ')[0]}!
            </h1>
            <p className="text-muted text-sm leading-relaxed mb-8">
              We&apos;ll review your profile and reach out on WhatsApp within 24 hours to complete your verification and go live. Welcome to Soro Ghana.
            </p>
            <a
              href={`/`}
              className="inline-flex items-center gap-2 bg-gold text-soro-black font-bold px-6 py-3 rounded-btn text-sm hover:bg-gold-dark transition-colors"
            >
              Back to Home
            </a>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_380px] gap-12">

            {/* Left: Form */}
            <div>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      i < stepIdx ? 'bg-gold text-soro-black' :
                      i === stepIdx ? 'bg-soro-black text-white' :
                      'bg-gray-100 text-muted'
                    }`}>
                      {i < stepIdx ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-px w-12 ${i < stepIdx ? 'bg-gold' : 'bg-border-col'}`} />
                    )}
                  </div>
                ))}
                <span className="ml-2 text-xs text-muted capitalize">Step {stepIdx + 1}: {step}</span>
              </div>

              {/* Step: Basics */}
              {step === 'basics' && (
                <div className="space-y-5">
                  <div>
                    <h1 className="font-display font-bold text-2xl text-ink mb-1">Create your profile</h1>
                    <p className="text-muted text-sm">Student, freelancer, full-time professional — if you know Ghana and speak the language a visitor needs, start earning from clients across Ghana and beyond.</p>
                  </div>

                  <Field label="Full Name" required>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                      placeholder="Kofi Mensah" className={inputCls} />
                  </Field>

                  <Field label="Professional Title" required>
                    <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                      placeholder="e.g. French Translator & Business Fixer" className={inputCls} />
                  </Field>

                  <Field label="Location (City / Area)" required>
                    <input type="text" value={form.location} onChange={e => set('location', e.target.value)}
                      placeholder="East Legon, Accra" className={inputCls} />
                  </Field>

                  <Field label="WhatsApp Number" required>
                    <input type="tel" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
                      placeholder="+233 24 000 0000" className={inputCls} />
                  </Field>

                  <Field label="Email">
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="kofi@email.com" className={inputCls} />
                  </Field>

                  <Field label="About You (Bio)" required>
                    <textarea
                      value={form.bio} onChange={e => set('bio', e.target.value)}
                      placeholder="Tell clients who you are, what you do, and what makes you different..."
                      rows={4} className={inputCls + ' resize-none'}
                    />
                  </Field>

                  <button
                    onClick={() => setStep('skills')}
                    disabled={!form.name || !form.title || !form.location || !form.whatsapp || !form.bio}
                    className="w-full flex items-center justify-center gap-2 bg-gold text-soro-black font-bold py-3 rounded-btn text-sm hover:bg-gold-dark transition-colors disabled:opacity-40"
                  >
                    Next: Your Skills <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step: Skills */}
              {step === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-ink mb-1">Your skills & languages</h2>
                    <p className="text-muted text-sm">Select everything that applies — clients search by category and language.</p>
                  </div>

                  <Field label="Categories (select all that apply)" required>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {categories.map(cat => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => toggleItem('categories', cat.slug)}
                          className={`text-xs px-3 py-1.5 rounded-pill border font-medium transition-colors ${
                            form.categories.includes(cat.slug)
                              ? 'bg-gold border-gold text-soro-black'
                              : 'bg-white border-border-col text-muted hover:border-gold'
                          }`}
                        >
                          {cat.icon} {cat.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Languages you speak" required>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {allLanguages.map(lang => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleItem('languages', lang)}
                          className={`text-xs px-3 py-1.5 rounded-pill border font-medium transition-colors ${
                            form.languages.includes(lang)
                              ? 'bg-gold border-gold text-soro-black'
                              : 'bg-white border-border-col text-muted hover:border-gold'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Your top skills (comma separated)" required>
                    <input
                      type="text"
                      value={form.skills}
                      onChange={e => set('skills', e.target.value)}
                      placeholder="French Translation, Business Meetings, Market Research"
                      className={inputCls}
                    />
                  </Field>

                  <div className="flex gap-3">
                    <button onClick={() => setStep('basics')} className="flex items-center gap-2 border border-border-col text-ink font-semibold px-4 py-3 rounded-btn text-sm hover:border-gold hover:text-gold transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => setStep('rates')}
                      disabled={form.categories.length === 0 || form.languages.length === 0 || !form.skills}
                      className="flex-1 flex items-center justify-center gap-2 bg-gold text-soro-black font-bold py-3 rounded-btn text-sm hover:bg-gold-dark transition-colors disabled:opacity-40"
                    >
                      Next: Set Your Rates <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step: Rates */}
              {step === 'rates' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-ink mb-1">Set your rates</h2>
                    <p className="text-muted text-sm">You control your price. Charge what your skills are worth.</p>
                  </div>

                  <Field label="Hourly Rate (GHS)" required>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">GHS</span>
                      <input
                        type="number"
                        value={form.hourlyRate}
                        onChange={e => set('hourlyRate', e.target.value)}
                        placeholder="150"
                        className={inputCls + ' pl-14'}
                        min="1"
                      />
                    </div>
                    <p className="text-xs text-muted mt-1">Tip: Most pros on Soro Ghana charge GHS 90–350/hr</p>
                  </Field>

                  <Field label="Full Day Rate (GHS) — optional">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">GHS</span>
                      <input
                        type="number"
                        value={form.dayRate}
                        onChange={e => set('dayRate', e.target.value)}
                        placeholder="700"
                        className={inputCls + ' pl-14'}
                        min="1"
                      />
                    </div>
                  </Field>

                  <div className="p-4 bg-gold-light border border-gold/20 rounded-card text-sm text-soro-black/70">
                    <strong className="text-soro-black">Zero commission on your first 3 jobs.</strong> After that, Soro Ghana takes a small platform fee to keep the marketplace running. We only earn when you earn.
                  </div>

                  {error && <p className="text-sm text-ghana-red">{error}</p>}

                  <div className="flex gap-3">
                    <button onClick={() => setStep('skills')} className="flex items-center gap-2 border border-border-col text-ink font-semibold px-4 py-3 rounded-btn text-sm hover:border-gold hover:text-gold transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={submit}
                      disabled={!form.hourlyRate || submitting}
                      className="flex-1 flex items-center justify-center gap-2 bg-soro-black text-white font-bold py-3 rounded-btn text-sm hover:bg-charcoal transition-colors disabled:opacity-40"
                    >
                      {submitting ? 'Submitting…' : 'Submit Profile'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Perks */}
            <div className="lg:pt-[72px]">
              <div className="bg-soro-black rounded-card p-6 text-white sticky top-24">
                <div className="text-3xl mb-4">🇬🇭</div>
                <h3 className="font-display font-bold text-lg mb-4">
                  Why Soro Ghana?
                </h3>

                <div className="mb-5 p-4 bg-white/5 rounded-card border border-white/10">
                  <p className="text-[11px] text-white/40 uppercase tracking-wide mb-1">Typical Ghana monthly salary</p>
                  <p className="text-lg font-display font-bold text-white/45 line-through decoration-white/30 mb-3">GHS 1,500 – 3,000</p>
                  <p className="text-[11px] text-gold uppercase tracking-wide mb-1">One 3-day Business Assistant booking</p>
                  <p className="text-2xl font-display font-black text-gold">GHS 3,600+</p>
                </div>

                <p className="text-sm text-white/60 mb-5 leading-relaxed">
                  The local market has kept skilled Ghanaians earning a fraction of what international clients will pay for the exact same work. You deserve the real rate.
                </p>
                <ul className="space-y-3 mb-6">
                  {perks.map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-white/10">
                  <h4 className="font-display font-semibold text-sm mb-3">Where you land depends on verification</h4>
                  <div className="space-y-3">
                    {tiers.map(t => (
                      <div key={t.name} className="flex items-start gap-2.5">
                        <t.icon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white/80 font-medium">{t.name}</p>
                          <p className="text-xs text-white/45">{t.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-ghana-red ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full text-sm border border-border-col rounded-btn px-3 py-2.5 outline-none focus:border-gold bg-white text-ink placeholder:text-muted'
