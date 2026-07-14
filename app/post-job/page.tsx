'use client'

import { useState } from 'react'
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

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<JobForm>({
    title: '', description: '', category: '', language: '', location: '',
    budget: '', timeline: '', contactName: '', contactPhone: '', contactEmail: '',
  })

  const set = (k: keyof JobForm, v: string) => setForm(f => ({ ...f, [k]: v }))

  const valid = form.title && form.description && form.category && form.contactName && form.contactPhone

  if (submitted) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-page-bg pt-nav flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="font-display font-bold text-2xl text-ink mb-3">Job Posted!</h1>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Your job has been posted. Matching professionals will be able to see it and reach out to you on WhatsApp.
              You should receive enquiries within a few hours.
            </p>
            <a href="/browse" className="inline-flex items-center gap-2 bg-gold text-soro-black font-bold px-6 py-3 rounded-btn text-sm hover:bg-gold-dark transition-colors">
              Browse Pros in the Meantime <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-page-bg pt-nav">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_320px] gap-12">

          {/* Form */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-1">Post a Job</h1>
              <p className="text-muted text-sm">Describe what you need and verified Ghanaian professionals will reach out.</p>
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

            <button
              onClick={() => valid && setSubmitted(true)}
              disabled={!valid}
              className="w-full flex items-center justify-center gap-2 bg-gold text-soro-black font-bold py-3.5 rounded-btn text-sm hover:bg-gold-dark transition-colors disabled:opacity-40"
            >
              Post Job — It's Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:pt-[72px]">
            <div className="bg-white border border-border-col rounded-card p-5 sticky top-24">
              <h3 className="font-display font-semibold text-ink text-sm mb-3">What happens next?</h3>
              <ol className="space-y-3 text-xs text-muted">
                {[
                  'Your job is visible to matching verified professionals',
                  'Pros reach out to you directly via WhatsApp',
                  'You compare, choose, and agree terms directly',
                  'Rate your pro after the job is complete',
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
                  <strong className="text-ink">100% free</strong> to post. No subscription, no commission from clients.
                </p>
              </div>
            </div>
          </div>
        </div>
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
