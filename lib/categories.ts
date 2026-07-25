export type Category = {
  slug: string
  icon: string
  label: string
  description: string
  href: string
}

// Organized around why someone is in Ghana, not around professional skill
// domains — matches how the AI Coordinator actually intakes a request ("why
// are you visiting?") rather than a generic freelance-marketplace taxonomy.
// Keep in sync with prisma/seed.ts if you add/rename a category.
export const categories: Category[] = [
  { slug: 'airport-assistant',  icon: '🛬', label: 'Airport Assistant',  description: 'Arrivals pickup · Baggage · SIM card · Currency exchange', href: '/browse?cat=airport-assistant' },
  { slug: 'business-assistant', icon: '💼', label: 'Business Assistant', description: 'Factory visits · Translation · Negotiation · Trade fairs', href: '/browse?cat=business-assistant' },
  { slug: 'shopping-assistant', icon: '🛍️', label: 'Shopping Assistant', description: 'Makola Market · Gold · Fabric · Electronics',              href: '/browse?cat=shopping-assistant' },
  { slug: 'student-assistant',  icon: '🎓', label: 'Student Assistant',  description: 'University registration · Housing · Bank account',        href: '/browse?cat=student-assistant' },
  { slug: 'medical-assistant',  icon: '🏥', label: 'Medical Assistant',  description: 'Hospital navigation · Appointments · Medicine pickup',     href: '/browse?cat=medical-assistant' },
  { slug: 'photographer',       icon: '📸', label: 'Photographer',       description: 'Business branding · Events · Drone footage',               href: '/browse?cat=photographer' },
  { slug: 'driver',             icon: '🚗', label: 'Driver',             description: 'Private driver · SUV · Long-distance',                     href: '/browse?cat=driver' },
  { slug: 'local-friend',       icon: '🤝', label: 'Local Friend',       description: 'Restaurants · Nightlife · Hidden spots · Culture',         href: '/browse?cat=local-friend' },
  { slug: 'event-assistant',    icon: '🎤', label: 'Event Assistant',    description: 'Conference support · Interpreting · Booth staff',          href: '/browse?cat=event-assistant' },
]

export const allLanguages = ['English', 'French', 'Spanish', 'Arabic', 'Chinese', 'Turkish', 'Portuguese', 'Twi', 'Ga', 'Hausa', 'Ewe']
