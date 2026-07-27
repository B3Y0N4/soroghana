'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { categories, allLanguages } from '@/lib/categories'
import { CheckCircle, ArrowRight } from 'lucide-react'

interface JobForm {
  title:        string
  description:  string
  category:     string
  language:     string
  location:     string
  budget:       string
  timeline:     string
  contactName:  string
  contactPhone: string
  contactEmail: string
}

function PostJobInner() {
  const params = useSearchParams()
  const prefillDesc = params.get('desc') ?? ''

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<JobForm>({
    title: '', description: prefillDesc, category: '', language: '', location: '',
    budget: '', timeline: '', contactName: '', contactPhone: '', contactEmail: '',
  })

  const set = (k: keyof JobForm, v: string) => setForm(f => ({ ...f, [k]: v }))

  const valid = form.title && form.description && form.category && form.contactName && form.contactPhone

  const submit = async () => {
    if (!valid || submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/job-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to post job')
      setSubmitted(true)
    } catch {
      setError('Something went wrong sending your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-page-bg pt-nav flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="font-display font-bold text-2xl text-ink mb-3">Request sent to your coordinator</h1>
          <p className="text-muted text-sm leading-relaxed mb-8">
            We&apos;re matching you with up to 3 vetted pros for this. You&apos;ll hear from us on WhatsApp,
            usually within a few hours — nothing gets charged until you confirm who you want.
          </p>
          <a href="/browse" className="inline-flex items-center gap-2 bg-gradient-to-br from-gold to-gold-dark hover:brightness-105 text-soro-black font-bold px-6 py-3 rounded-btn text-sm transition-all">
            Browse Pros in the Meantime <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page-bg pt-nav">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_320px] gap-12">

        {/* Form */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-1">Request Help</h1>
            <p className="text-muted text-sm">Tell our coordinator what you need — we&apos;ll match you with up to 3 vetted pros.</p>
          </div>

          <Field label="Job Title" required>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. French interpreter for 2-day investor meetings"
              className={inputCls}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the job in detail — what needs to be done, when, where, and any special requirements..."
              rows={5}
              className={inputCls + ' resize-none'}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Category" required>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Language Required">
              <select value={form.language} onChange={e => set('language', e.target.value)} className={inputCls}>
                <option value="">Any language</option>
                {allLanguages.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Location / Delivery">
              <input
                type="text"
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="e.g. Accra CBD / Remote / Airport area"
                className={inputCls}
              />
            </Field>

            <Field label="Timeline">
              <input
                type="text"
                value={form.timeline}
                onChange={e => set('timeline', e.target.value)}
                placeholder="e.g. 2 days, starting Monday"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Budget (GHS)">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">GHS</span>
              <input
                type="text"
                value={form.budget}
                onChange={e => set('budget', e.target.value)}
                placeholder="e.g. 500 / flexible"
                className={inputCls + ' pl-12'}
              />
            </div>
          </Field>

          <div className="border-t border-border-col pt-5">
            <h2 className="font-display font-semibold text-ink text-base mb-4">Your Contact Details</h2>
            <div className="space-y-4">
              <Field label="Your Name" required>
                <input type="text" value={form.contactName} onChange={e => set('contactName', e.target.value)}
                  placeholder="James Wheeler" className={inputCls} />
              </Field>
              <Field label="WhatsApp Number" required>
                <input type="tel" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)}
                  placeholder="+44 7700 000000" className={inputCls} />
              </Field>
              <Field label="Email (optional)">
                <input type="email" value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)}
                  placeholder="james@company.com" className={inputCls} />
              </Field>
            </div>
          </div>

          {error && <p className="text-sm text-ghana-red">{error}</p>}

          <button
            onClick={submit}
            disabled={!valid || submitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-gold to-gold-dark hover:brightness-105 text-soro-black font-bold py-3.5 rounded-btn text-sm transition-all disabled:opacity-40"
          >
            {submitting ? 'Sending…' : 'Send to Coordinator — It’s Free'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sidebar */}
        <div className="lg:pt-[72px]">
          <div className="bg-white border border-border-col rounded-card p-5 sticky top-24">
            <h3 className="font-display font-semibold text-ink text-sm mb-3">What happens next?</h3>
            <ol className="space-y-3 text-xs text-muted">
              {[
                'Our coordinator matches your request to up to 3 vetted, KYC-verified pros',
                'You hear back on WhatsApp, usually within a few hours',
                'Pick who you want, pay securely by card — held until the job is done',
                'Your pro is paid instantly via Mobile Money on completion',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold/10 text-gold font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-5 pt-4 border-t border-border-col">
              <p className="text-xs text-muted">
                <strong className="text-ink">100% free</strong> to request. Nothing is charged until you confirm a match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PostJobPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={
        <div className="min-h-screen bg-page-bg pt-nav flex items-center justify-center">
          <div className="text-muted text-sm">Loading…</div>
        </div>
      }>
        <PostJobInner />
      </Suspense>
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
