import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, category, language, location, budget, timeline, contactName, contactPhone, contactEmail } = body

  if (!title || !description || !category || !contactName || !contactPhone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const jobRequest = await db.jobRequest.create({
    data: {
      title, description, category,
      language: language || null,
      location: location || null,
      budget: budget || null,
      timeline: timeline || null,
      contactName, contactPhone,
      contactEmail: contactEmail || null,
    },
  })

  return NextResponse.json({ id: jobRequest.id }, { status: 201 })
}
