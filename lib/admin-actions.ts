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
