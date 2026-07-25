'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/browse',       label: 'Browse Pros'   },
  { href: '/how-it-works', label: 'How It Works'  },
  { href: '/post-job',     label: 'Request Help'  },
]

export default function Nav() {
  const pathname  = usePathname()
  const [open,    setOpen]    = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome    = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = isHome && !scrolled
    ? 'bg-transparent border-transparent'
    : 'bg-white border-b border-border-col shadow-sm'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-ink'
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-ink'
  const linkHover = isHome && !scrolled
    ? 'hover:text-gold'
    : 'hover:text-gold'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className={`font-display font-bold text-xl ${logoColor} flex items-center gap-2`}>
          <span className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
            <span className="text-soro-black text-sm font-black">S</span>
          </span>
          Soro Ghana
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${textColor} ${linkHover} ${pathname === l.href ? 'text-gold' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/join"
            className={`text-sm font-semibold transition-colors ${textColor} ${linkHover}`}
          >
            Start Earning
          </Link>
          <Link
            href="/post-job"
            className="bg-gold text-soro-black text-sm font-bold px-4 py-2 rounded-btn hover:bg-gold-dark transition-colors"
          >
            Get Matched
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(v => !v)}
          className={`md:hidden p-2 ${textColor}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border-col px-4 py-4 space-y-3">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-ink hover:text-gold py-2"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border-col space-y-2">
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold text-center border border-border-col text-ink py-2.5 rounded-btn hover:border-gold hover:text-gold transition-colors"
            >
              Start Earning
            </Link>
            <Link
              href="/post-job"
              onClick={() => setOpen(false)}
              className="block text-sm font-bold text-center bg-gold text-soro-black py-2.5 rounded-btn hover:bg-gold-dark transition-colors"
            >
              Get Matched
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
