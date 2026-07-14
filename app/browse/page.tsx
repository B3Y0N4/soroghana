'use client'

import { Suspense, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProviderCard from '@/components/ProviderCard'
import { providers } from '@/lib/providers'
import { categories, allLanguages } from '@/lib/categories'
import { Search, SlidersHorizontal, X } from 'lucide-react'

function BrowseInner() {
  const params       = useSearchParams()
  const initCat      = params.get('cat')  ?? ''
  const initLang     = params.get('lang') ?? ''

  const [query,    setQuery]    = useState('')
  const [selCat,   setSelCat]   = useState(initCat)
  const [selLang,  setSelLang]  = useState(initLang)
  const [showFilt, setShowFilt] = useState(false)
  const [sortBy,   setSortBy]   = useState<'rating' | 'rate_asc' | 'rate_desc' | 'jobs'>('rating')

  const filtered = useMemo(() => {
    let list = [...providers]

    if (selCat)  list = list.filter(p => p.categories.includes(selCat))
    if (selLang) list = list.filter(p => p.languages.includes(selLang))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.skills.some(s => s.toLowerCase().includes(q)) ||
        p.languages.some(l => l.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case 'rate_asc':  list.sort((a, b) => a.hourlyRate - b.hourlyRate);  break
      case 'rate_desc': list.sort((a, b) => b.hourlyRate - a.hourlyRate);  break
      case 'jobs':      list.sort((a, b) => b.completedJobs - a.completedJobs); break
      default:          list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [selCat, selLang, query, sortBy])

  const clearFilters = () => {
    setSelCat('')
    setSelLang('')
    setQuery('')
  }

  const hasFilters = selCat || selLang || query

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-page-bg pt-nav">

        {/* Header */}
        <div className="bg-white border-b border-border-col">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-1">
              Find a Professional
            </h1>
            <p className="text-muted text-sm">
              {filtered.length} verified professional{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Search + filter bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="flex gap-3 flex-wrap">
              {/* Search */}
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search by skill, name, or language…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-border-col rounded-btn outline-none focus:border-gold bg-white"
                />
              </div>

              {/* Category select */}
              <select
                value={selCat}
                onChange={e => setSelCat(e.target.value)}
                className="text-sm border border-border-col rounded-btn px-3 py-2.5 outline-none focus:border-gold bg-white text-ink min-w-[160px]"
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>

              {/* Language select */}
              <select
                value={selLang}
                onChange={e => setSelLang(e.target.value)}
                className="text-sm border border-border-col rounded-btn px-3 py-2.5 outline-none focus:border-gold bg-white text-ink min-w-[160px]"
              >
                <option value="">All Languages</option>
                {allLanguages.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="text-sm border border-border-col rounded-btn px-3 py-2.5 outline-none focus:border-gold bg-white text-ink min-w-[140px]"
              >
                <option value="rating">Top Rated</option>
                <option value="jobs">Most Jobs</option>
                <option value="rate_asc">Price: Low → High</option>
                <option value="rate_desc">Price: High → Low</option>
              </select>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-ink border border-border-col rounded-btn px-3 py-2.5"
                >
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display font-semibold text-ink text-lg mb-2">No matches found</h3>
              <p className="text-muted text-sm mb-4">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="text-sm text-gold font-semibold hover:text-gold-dark">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(p => (
                <ProviderCard key={p.slug} provider={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-page-bg pt-nav flex items-center justify-center">
        <div className="text-muted text-sm">Loading…</div>
      </div>
    }>
      <BrowseInner />
    </Suspense>
  )
}
