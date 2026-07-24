import { db } from './db'
import type { Provider } from './providers'
import type { Prisma } from './generated/prisma/client'

type HelperRow = Prisma.HelperGetPayload<{ include: { kyc: true; reviews: true } }>

const tierBadge: Record<string, { tag: string; tagColor: string }> = {
  executive_translator: { tag: 'Top Rated', tagColor: 'bg-ghana-green text-white' },
  business_assistant:   { tag: 'Verified',  tagColor: 'bg-gold text-soro-black' },
  standard_helper:      { tag: 'Verified',  tagColor: 'bg-gold text-soro-black' },
  unverified:           { tag: 'New',       tagColor: 'bg-gray-200 text-ink' },
}

export function helperToProvider(h: HelperRow): Provider {
  const tier = h.kyc?.tier ?? 'unverified'
  const badge = tierBadge[tier] ?? tierBadge.unverified

  return {
    slug: h.slug,
    name: h.name,
    initials: h.initials,
    role: h.role,
    title: h.title,
    bio: h.bio,
    tag: badge.tag,
    tagColor: badge.tagColor,
    skills: h.skillsCsv ? h.skillsCsv.split(',').map(s => s.trim()).filter(Boolean) : [],
    rate: `GHS ${h.hourlyRate.toLocaleString()} / hr`,
    hourlyRate: h.hourlyRate,
    dayRate: h.dayRate ?? undefined,
    location: h.location,
    languages: h.languagesCsv ? h.languagesCsv.split(',').map(s => s.trim()).filter(Boolean) : [],
    categories: h.categoriesCsv ? h.categoriesCsv.split(',').map(s => s.trim()).filter(Boolean) : [],
    avatar: h.avatar,
    availability: (h.availability as Provider['availability']) ?? 'available',
    responseTime: h.responseTime ?? 'Usually within a day',
    completedJobs: h.completedJobs,
    rating: h.rating,
    reviewCount: h.reviewCount,
    verified: h.kyc?.ghanaCardVerified ?? false,
    tier: (tier as Provider['tier']) ?? 'unverified',
    memberSince: h.memberSince ?? String(h.createdAt.getFullYear()),
    successRate: h.successRate ?? 100,
    featured: h.featured,
    reviews: h.reviews.map(r => ({
      id: r.id,
      reviewerName: r.reviewerName,
      reviewerInitials: r.reviewerName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      rating: r.rating,
      date: r.createdAt.toISOString().slice(0, 10),
      title: r.title ?? '',
      body: r.body,
      clientType: r.clientType ?? '',
    })),
  }
}

export async function getActiveProviders(): Promise<Provider[]> {
  const rows = await db.helper.findMany({
    where: { status: 'active' },
    include: { kyc: true, reviews: true },
    orderBy: { rating: 'desc' },
  })
  return rows.map(helperToProvider)
}

export async function getFeaturedProviders(): Promise<Provider[]> {
  const rows = await db.helper.findMany({
    where: { status: 'active', featured: true },
    include: { kyc: true, reviews: true },
    orderBy: { rating: 'desc' },
  })
  return rows.map(helperToProvider)
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const row = await db.helper.findUnique({
    where: { slug },
    include: { kyc: true, reviews: true },
  })
  return row && row.status === 'active' ? helperToProvider(row) : null
}
