export type Category = {
  slug: string
  icon: string
  label: string
  description: string
  href: string
}

export const categories: Category[] = [
  { slug: 'translation', icon: '🌍', label: 'Translation & Language', description: 'French · Spanish · Hausa · Twi', href: '/browse?cat=translation' },
  { slug: 'tech',        icon: '💻', label: 'Tech & Development',     description: 'Web · Mobile · Data · AI',        href: '/browse?cat=tech' },
  { slug: 'creative',   icon: '📸', label: 'Creative & Design',       description: 'Video · Photo · Branding · Art',  href: '/browse?cat=creative' },
  { slug: 'business',   icon: '📊', label: 'Business & Finance',      description: 'Accounting · Legal · Consulting', href: '/browse?cat=business' },
  { slug: 'trades',     icon: '🔧', label: 'Home & Trades',           description: 'Electrician · Plumbing · HVAC',   href: '/browse?cat=trades' },
  { slug: 'logistics',  icon: '📦', label: 'Logistics & Import',      description: 'Customs · Freight · Sourcing',    href: '/browse?cat=logistics' },
  { slug: 'education',  icon: '🎓', label: 'Tutoring & Training',     description: 'Academic · Corporate · Language', href: '/browse?cat=education' },
  { slug: 'events',     icon: '🛡️', label: 'Security & Events',       description: 'Guarding · Protocol · Events',    href: '/browse?cat=events' },
]

export const allLanguages = ['English', 'French', 'Spanish', 'Arabic', 'Chinese', 'Turkish', 'Portuguese', 'Twi', 'Ga', 'Hausa', 'Ewe']
