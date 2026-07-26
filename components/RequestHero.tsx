'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const EXAMPLES = [
  'Airport pickup + SIM card, landing Thursday at Kotoka',
  'French-speaking business assistant for 3 days in Accra',
  'Someone to help me buy fabric and gold at Makola Market',
]

export default function RequestHero() {
  const router = useRouter()
  const [text, setText] = useState('')

  const submit = () => {
    const params = new URLSearchParams()
    if (text.trim()) params.set('desc', text.trim())
    router.push(`/post-job${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <div className="w-full max-w-2xl mb-6">
      <div className="bg-white rounded-2xl shadow-card border border-border-col p-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Tell our coordinator what you need — e.g. &quot;French-speaking business assistant and a driver for 3 days to visit cocoa factories&quot;"
          rows={3}
          className="w-full px-4 py-3 text-ink placeholder:text-muted text-sm outline-none bg-transparent resize-none"
        />
        <div className="flex justify-end px-1 pb-1">
          <button
            onClick={submit}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-soro-black font-bold text-sm px-5 py-2.5 rounded-btn transition-colors"
          >
            Get Matched <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            onClick={() => setText(ex)}
            className="text-xs bg-white hover:bg-gold-light text-muted hover:text-gold-dark border border-border-col hover:border-gold/40 rounded-full px-3 py-1.5 transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
