import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { helperToProvider } from '@/lib/helpers'

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base
  let n = 1
  while (await db.helper.findUnique({ where: { slug } })) {
    n += 1
    slug = `${base}-${n}`
  }
  return slug
}

export async function GET() {
  const rows = await db.helper.findMany({
    where: { status: 'active' },
    include: { kyc: true, reviews: true },
    orderBy: { rating: 'desc' },
  })
  return NextResponse.json(rows.map(helperToProvider))
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, location, whatsapp, email, title, bio, categories, languages, skills, hourlyRate, dayRate } = body

  if (!name || !location || !whatsapp || !title || !bio ||
      !Array.isArray(categories) || categories.length === 0 ||
      !Array.isArray(languages) || languages.length === 0 ||
      !skills || !hourlyRate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const slug = await uniqueSlug(slugify(name))
  const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  const helper = await db.helper.create({
    data: {
      slug,
      name,
      initials,
      role: title,
      title,
      bio,
      skillsCsv: String(skills).split(',').map(s => s.trim()).filter(Boolean).join(','),
      hourlyRate: Number(hourlyRate),
      dayRate: dayRate ? Number(dayRate) : null,
      location,
      languagesCsv: languages.join(','),
      categoriesCsv: categories.join(','),
      whatsapp,
      email: email || null,
      status: 'pending', // ops must review + run KYC before this becomes visible in /browse
      kyc: { create: {} }, // defaults to tier: unverified
    },
  })

  return NextResponse.json({ id: helper.id, slug: helper.slug }, { status: 201 })
}
