export type Provider = {
  slug:          string
  name:          string
  initials:      string
  role:          string
  title:         string
  bio:           string
  tag:           string
  tagColor:      string
  skills:        string[]
  rate:          string
  hourlyRate:    number
  dayRate?:      number
  location:      string
  languages:     string[]
  categories:    string[]
  avatar:        string
  availability:  'available' | 'busy' | 'away'
  responseTime:  string
  completedJobs: number
  rating:        number
  reviewCount:   number
  verified:      boolean
  tier?:         'unverified' | 'standard_helper' | 'business_assistant' | 'executive_translator'
  memberSince:   string
  successRate:   number
  featured:      boolean
  reviews:       Array<{
    id:               string
    reviewerName:     string
    reviewerInitials: string
    rating:           number
    date:             string
    title:            string
    body:             string
    clientType:       string
  }>
}

export const providers: Provider[] = [
  {
    slug: 'kofi-mensah-dev', name: 'Kofi Mensah', initials: 'KM',
    role: 'Full-Stack Developer', title: 'Full-Stack Developer & AI Engineer',
    bio: 'I build fast, reliable web and mobile applications. 5 years building products for startups in Ghana, the UK, and remotely for US clients. I speak English and French fluently — I can work directly with francophone clients without a translator in the room.',
    tag: 'Top Rated', tagColor: 'bg-ghana-green text-white',
    skills: ['React', 'Next.js', 'Node.js', 'Python', 'AI Engineering', 'Mobile Development', 'PostgreSQL'],
    rate: 'GHS 250 / hr', hourlyRate: 250,
    location: 'East Legon, Accra', languages: ['English', 'French', 'Twi'],
    categories: ['business-assistant'],
    avatar: '💻', availability: 'available', responseTime: '< 2 hours',
    completedJobs: 34, rating: 4.9, reviewCount: 28,
    verified: true, memberSince: '2024', successRate: 97, featured: true,
    reviews: [
      { id: 'r1', reviewerName: 'Marc Dupont', reviewerInitials: 'MD', rating: 5, date: '2026-06-10',
        title: 'Exceptional work, delivered on time',
        body: 'Kofi built our entire e-commerce platform in 3 weeks. Communication was perfect in French which made collaboration seamless.',
        clientType: 'French startup, remote' },
    ],
  },
  {
    slug: 'abena-asante-translator', name: 'Abena Asante', initials: 'AA',
    role: 'French Translator & Fixer', title: 'French-English Translator & Business Fixer',
    bio: 'Born in Accra, raised partly in Abidjan, worked in Dakar for 3 years. I bridge Francophone West Africa and Ghana better than anyone I know. I translate live in meetings, handle procurement trips, navigate investors around Accra.',
    tag: 'Top Rated', tagColor: 'bg-ghana-green text-white',
    skills: ['French Translation', 'Live Interpreting', 'Business Meeting Rep', 'Local Navigator', 'Procurement Officer', 'Market Research'],
    rate: 'GHS 180 / hr', hourlyRate: 180, dayRate: 900,
    location: 'Airport Residential, Accra', languages: ['English', 'French', 'Twi', 'Dioula'],
    categories: ['business-assistant', 'local-friend', 'airport-assistant'],
    avatar: '🌍', availability: 'available', responseTime: '< 1 hour',
    completedJobs: 67, rating: 4.95, reviewCount: 52,
    verified: true, memberSince: '2024', successRate: 99, featured: true,
    reviews: [
      { id: 'r3', reviewerName: 'Thierry Koffi', reviewerInitials: 'TK', rating: 5, date: '2026-06-20',
        title: 'She made Ghana feel like home for our team',
        body: 'We came from Abidjan to expand our distribution to Ghana. Abena spent 4 days with us — meetings, market visits, supplier negotiations. Worth every cedi.',
        clientType: 'Ivoirian distribution company' },
    ],
  },
  {
    slug: 'kwame-boateng-marketing', name: 'Kwame Boateng', initials: 'KB',
    role: 'Digital Marketing Specialist', title: 'Digital Marketing & Meta Ads Specialist',
    bio: "I run paid ads that actually convert. Managed over GHS 2M in Meta and Google ad spend across Ghana, Nigeria, and for brands targeting the African diaspora in the UK.",
    tag: 'Verified', tagColor: 'bg-gold text-soro-black',
    skills: ['Meta Ads', 'Google Ads', 'SEO', 'Email Marketing', 'Content Strategy', 'Social Media Management'],
    rate: 'GHS 200 / hr', hourlyRate: 200,
    location: 'Labone, Accra', languages: ['English', 'Twi'],
    categories: ['business-assistant'],
    avatar: '📊', availability: 'available', responseTime: '< 3 hours',
    completedJobs: 45, rating: 4.8, reviewCount: 38,
    verified: true, memberSince: '2024', successRate: 95, featured: true,
    reviews: [
      { id: 'r5', reviewerName: 'Esi Appiah', reviewerInitials: 'EA', rating: 5, date: '2026-06-05',
        title: 'Tripled our online sales in 60 days',
        body: 'We gave Kwame GHS 8,000 to run our Meta ads for 2 months. Sales went from GHS 12,000/month to GHS 38,000/month.',
        clientType: 'Ghanaian fashion brand' },
    ],
  },
  {
    slug: 'akosua-darko-photographer', name: 'Akosua Darko', initials: 'AD',
    role: 'Commercial Photographer', title: 'Commercial Photographer & Drone Operator',
    bio: 'I shoot brands, events, products, real estate aerials, and documentary work. CAA-licensed drone operator — one of very few women in Ghana with this certification.',
    tag: 'Rising Star', tagColor: 'bg-ghana-red text-white',
    skills: ['Commercial Photography', 'Drone Operation', 'Product Photography', 'Event Photography', 'Video Production'],
    rate: 'GHS 300 / hr', hourlyRate: 300, dayRate: 1800,
    location: 'Osu, Accra', languages: ['English', 'Twi', 'Spanish'],
    categories: ['photographer', 'event-assistant'],
    avatar: '📸', availability: 'busy', responseTime: '< 4 hours',
    completedJobs: 89, rating: 4.9, reviewCount: 71,
    verified: true, memberSince: '2024', successRate: 98, featured: false,
    reviews: [
      { id: 'r6', reviewerName: 'Marta García', reviewerInitials: 'MG', rating: 5, date: '2026-06-15',
        title: 'World-class quality, total professional',
        body: 'Hired Akosua to shoot our hotel property in Accra. The aerial footage was stunning. Delivered edited files in 48 hours.',
        clientType: 'Spanish hotel group' },
    ],
  },
  {
    slug: 'emmanuel-tetteh-inspector', name: 'Emmanuel Tetteh', initials: 'ET',
    role: 'Warehouse Inspector', title: 'Warehouse Inspector & Procurement Specialist',
    bio: 'I have spent 8 years working in logistics, import/export, and supply chain across Ghana. I inspect warehouses and factories for international buyers, verify goods at Tema Port before shipment.',
    tag: 'Verified', tagColor: 'bg-gold text-soro-black',
    skills: ['Warehouse Inspection', 'Factory Audit', 'Quality Control', 'Port Liaison', 'Procurement Officer', 'Supply Chain'],
    rate: 'GHS 150 / hr', hourlyRate: 150, dayRate: 800,
    location: 'Tema, Greater Accra', languages: ['English', 'Twi'],
    categories: ['business-assistant'],
    avatar: '🏭', availability: 'available', responseTime: '< 2 hours',
    completedJobs: 112, rating: 4.85, reviewCount: 94,
    verified: true, memberSince: '2024', successRate: 96, featured: false,
    reviews: [
      { id: 'r7', reviewerName: 'Wei Zhang', reviewerInitials: 'WZ', rating: 5, date: '2026-05-30',
        title: 'Exactly what we needed in Ghana',
        body: 'Emmanuel inspected our cocoa shipment at Tema before we wired $85,000. Saved us from a fraudulent supplier.',
        clientType: 'Chinese trading company' },
    ],
  },
  {
    slug: 'yaw-owusu-guide', name: 'Yaw Owusu', initials: 'YO',
    role: 'Business Tour Guide', title: 'Business Tour Guide & Local Navigator',
    bio: 'I grew up in Kumasi, studied in Accra, lived in Spain for 4 years, and came back. I take investors, entrepreneurs, and executives around Accra and beyond.',
    tag: 'Top Rated', tagColor: 'bg-ghana-green text-white',
    skills: ['Local Navigator', 'Tour Guide', 'Spanish Translation', 'Live Interpreting', 'Market Research', 'Business Meeting Rep'],
    rate: 'GHS 120 / hr', hourlyRate: 120, dayRate: 700,
    location: 'Cantonments, Accra', languages: ['English', 'Spanish', 'Twi'],
    categories: ['local-friend', 'business-assistant'],
    avatar: '🗺️', availability: 'available', responseTime: '< 1 hour',
    completedJobs: 58, rating: 4.95, reviewCount: 49,
    verified: true, memberSince: '2024', successRate: 99, featured: false,
    reviews: [
      { id: 'r8', reviewerName: 'Carlos Reyes', reviewerInitials: 'CR', rating: 5, date: '2026-06-22',
        title: 'The best decision of our Ghana trip',
        body: 'Yaw spent 3 days with us — markets, farms, government offices, supplier meetings. His Spanish is perfect and his knowledge of Ghana is deep.',
        clientType: 'Mexican agri-investment fund' },
    ],
  },
  {
    slug: 'ama-oppong-designer', name: 'Ama Oppong', initials: 'AO',
    role: 'Brand & Graphic Designer', title: 'Brand Identity & Graphic Designer',
    bio: 'I design brands that look like they belong internationally, built for Ghana. Logos, full brand identities, packaging, pitch decks, social media systems.',
    tag: 'Verified', tagColor: 'bg-gold text-soro-black',
    skills: ['Brand Identity', 'Graphic Design', 'Logo Design', 'Packaging Design', 'Pitch Deck Design', 'UI Design', 'Illustration'],
    rate: 'GHS 220 / hr', hourlyRate: 220,
    location: 'Dzorwulu, Accra', languages: ['English', 'Twi', 'French'],
    categories: ['business-assistant'],
    avatar: '🎨', availability: 'available', responseTime: '< 3 hours',
    completedJobs: 76, rating: 4.9, reviewCount: 61,
    verified: true, memberSince: '2024', successRate: 97, featured: false,
    reviews: [
      { id: 'r9', reviewerName: 'Nana Adjei', reviewerInitials: 'NA', rating: 5, date: '2026-06-01',
        title: 'She understood the brief better than I did',
        body: 'I gave Ama a rough idea for our startup brand. What she came back with was beyond what I imagined.',
        clientType: 'Ghanaian fintech startup' },
    ],
  },
  {
    slug: 'adwoa-sarpong-va', name: 'Adwoa Sarpong', initials: 'AS',
    role: 'Executive Virtual Assistant', title: 'Executive VA & Customer Success',
    bio: 'I manage schedules, inboxes, research, customer support, CRM systems, and operations for busy executives. I have worked remotely for a UK consulting firm and a US e-commerce brand simultaneously.',
    tag: 'Rising Star', tagColor: 'bg-ghana-red text-white',
    skills: ['Virtual Assistant', 'Customer Support', 'CRM Management', 'Calendar Management', 'Research', 'Email Management'],
    rate: 'GHS 90 / hr', hourlyRate: 90,
    location: 'Spintex, Accra', languages: ['English', 'Twi', 'French'],
    categories: ['business-assistant'],
    avatar: '🧑‍💼', availability: 'available', responseTime: '< 1 hour',
    completedJobs: 43, rating: 4.95, reviewCount: 38,
    verified: true, memberSince: '2025', successRate: 100, featured: false,
    reviews: [
      { id: 'r10', reviewerName: 'David Chen', reviewerInitials: 'DC', rating: 5, date: '2026-06-18',
        title: 'Best VA I have had in 6 years of outsourcing',
        body: 'Adwoa manages my entire inbox, schedules, and client follow-ups. Works across time zones without issue.',
        clientType: 'US consulting firm, remote' },
    ],
  },
]

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find(p => p.slug === slug)
}
