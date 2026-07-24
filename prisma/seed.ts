import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../lib/generated/prisma/client'
import { providers } from '../lib/providers'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const db = new PrismaClient({ adapter })

// Rough starting tier so the admin console has something to show —
// real tiering should come from actual KYC completion, not this heuristic.
function tierFor(hourlyRate: number, verified: boolean): string {
  if (!verified) return 'unverified'
  if (hourlyRate >= 220) return 'executive_translator'
  if (hourlyRate >= 140) return 'business_assistant'
  return 'standard_helper'
}

async function main() {
  for (const p of providers) {
    const helper = await db.helper.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        initials: p.initials,
        role: p.role,
        title: p.title,
        bio: p.bio,
        tagline: p.tag,
        skillsCsv: p.skills.join(','),
        hourlyRate: p.hourlyRate,
        dayRate: p.dayRate,
        location: p.location,
        languagesCsv: p.languages.join(','),
        categoriesCsv: p.categories.join(','),
        avatar: p.avatar,
        availability: p.availability,
        responseTime: p.responseTime,
        completedJobs: p.completedJobs,
        rating: p.rating,
        reviewCount: p.reviewCount,
        memberSince: p.memberSince,
        successRate: p.successRate,
        featured: p.featured,
        status: 'active',
      },
    })

    await db.kYCRecord.upsert({
      where: { helperId: helper.id },
      update: {},
      create: {
        helperId: helper.id,
        ghanaCardVerified: p.verified,
        policeCheckStatus: p.verified ? 'passed' : 'not_started',
        videoInterviewStatus: p.verified ? 'completed' : 'not_scheduled',
        tier: tierFor(p.hourlyRate, p.verified),
      },
    })

    for (const r of p.reviews) {
      await db.review.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          helperId: helper.id,
          reviewerName: r.reviewerName,
          rating: r.rating,
          title: r.title,
          body: r.body,
          clientType: r.clientType,
          createdAt: new Date(r.date),
        },
      })
    }
  }

  console.log(`Seeded ${providers.length} helpers.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
