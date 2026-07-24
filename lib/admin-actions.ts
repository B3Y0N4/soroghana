'use server'

import { revalidatePath } from 'next/cache'
import { db } from './db'

export async function matchHelpersToJob(jobRequestId: string, helperIds: string[]) {
  if (helperIds.length === 0) return

  await db.$transaction([
    ...helperIds.map((helperId, i) =>
      db.match.upsert({
        where: { jobRequestId_helperId: { jobRequestId, helperId } },
        update: { rank: i + 1 },
        create: { jobRequestId, helperId, rank: i + 1, matchedBy: 'ops' },
      })
    ),
    db.jobRequest.update({ where: { id: jobRequestId }, data: { status: 'matched' } }),
  ])

  revalidatePath('/admin/jobs')
}

export async function updateJobStatus(jobRequestId: string, status: string) {
  await db.jobRequest.update({ where: { id: jobRequestId }, data: { status } })
  revalidatePath('/admin/jobs')
}

export async function updateHelperKyc(
  helperId: string,
  data: {
    ghanaCardVerified?: boolean
    policeCheckStatus?: string
    videoInterviewStatus?: string
    tier?: string
    notes?: string
  }
) {
  await db.kYCRecord.update({ where: { helperId }, data })
  revalidatePath('/admin/helpers')
  revalidatePath('/browse')
}

export async function setHelperStatus(helperId: string, status: 'pending' | 'active' | 'suspended') {
  await db.helper.update({ where: { id: helperId }, data: { status } })
  revalidatePath('/admin/helpers')
  revalidatePath('/browse')
}

// A visitor picked one of the offered helpers (confirmed by ops over
// WhatsApp, since there's no in-app accept flow yet). Turns the offer into
// the actual booked job and closes out the other offers on this request.
export async function acceptMatch(matchId: string) {
  const match = await db.match.findUniqueOrThrow({ where: { id: matchId } })

  await db.$transaction([
    db.match.update({ where: { id: matchId }, data: { status: 'accepted' } }),
    db.match.updateMany({
      where: { jobRequestId: match.jobRequestId, id: { not: matchId } },
      data: { status: 'declined' },
    }),
    db.jobRequest.update({ where: { id: match.jobRequestId }, data: { status: 'in_progress' } }),
    db.engagement.create({
      data: { jobRequestId: match.jobRequestId, helperId: match.helperId, status: 'scheduled' },
    }),
  ])

  revalidatePath('/admin/jobs')
}

export async function updateEngagementStatus(
  engagementId: string,
  status: 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled'
) {
  const timestamps: Record<string, object> = {
    in_progress: { startedAt: new Date() },
    completed: { endedAt: new Date() },
  }

  const engagement = await db.engagement.update({
    where: { id: engagementId },
    data: { status, ...(timestamps[status] ?? {}) },
  })

  if (status === 'completed' || status === 'cancelled') {
    await db.jobRequest.update({
      where: { id: engagement.jobRequestId },
      data: { status: status === 'completed' ? 'completed' : 'cancelled' },
    })
  }

  revalidatePath('/admin/jobs')
}
