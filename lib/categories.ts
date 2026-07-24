export type Category = {
  slug: string
  icon: string
  label: string
  description: string
  href: string
}

// These slugs are the canonical category IDs used across the whole app
// (browse filters, post-job, join, and the Helper.categoriesCsv DB field).
// Keep in sync with prisma/seed.ts if you add/rename a category.
export const categories: Category[] = [
  { slug: 'language-translation', icon: '🌍', label: 'Translation & Language', description: 'French · Spanish · Hausa · Twi', href: '/browse?cat=language-translation' },
  { slug: 'tech-digital',         icon: '💻', label: 'Tech & Development',     description: 'Web · Mobile · Data · AI',        href: '/browse?cat=tech-digital' },
  { slug: 'creative-media',       icon: '📸', label: 'Creative & Design',       description: 'Video · Photo · Branding · Art',  href: '/browse?cat=creative-media' },
  { slug: 'business-consulting',  icon: '📊', label: 'Business & Finance',      description: 'Accounting · Legal · Consulting', href: '/browse?cat=business-consulting' },
  { slug: 'trades',                icon: '🔧', label: 'Home & Trades',           description: 'Electrician · Plumbing · HVAC',   href: '/browse?cat=trades' },
  { slug: 'on-ground-services',   icon: '📦', label: 'On-Ground & Logistics',   description: 'Fixers · Navigators · Sourcing',  href: '/browse?cat=on-ground-services' },
  { slug: 'education',             icon: '🎓', label: 'Tutoring & Training',     description: 'Academic · Corporate · Language', href: '/browse?cat=education' },
  { slug: 'events',                icon: '🛡️', label: 'Security & Events',       description: 'Guarding · Protocol · Events',    href: '/browse?cat=events' },
]

export const allLanguages = ['English', 'French', 'Spanish', 'Arabic', 'Chinese', 'Turkish', 'Portuguese', 'Twi', 'Ga', 'Hausa', 'Ewe']
