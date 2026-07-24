import { db } from '../db'

const PAYSTACK_BASE = 'https://api.paystack.co'

function authHeader(): HeadersInit {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) throw new Error('PAYSTACK_SECRET_KEY is not set — MoMo payouts are not configured yet')
  return { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
}

// Registers a helper's MoMo number as a Paystack transfer recipient. `network`
// is Paystack's mobile money bank_code: 'mtn', 'vod' (Vodafone/Telecel Cash),
// or 'atl' (AirtelTigo). Do this once per helper and store recipient_code.
export async function createMomoRecipient(
  helperName: string,
  momoNumber: string,
  network: 'mtn' | 'vod' | 'atl'
): Promise<string> {
  const res = await fetch(`${PAYSTACK_BASE}/transferrecipient`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'mobile_money',
      name: helperName,
      account_number: momoNumber,
      bank_code: network,
      currency: 'GHS',
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.status) throw new Error(data.message || 'Failed to create MoMo recipient')
  return data.data.recipient_code as string
}

// Pays a helper via MoMo for a completed engagement (the currency bridge's
// outbound leg) and records the result on the Payment row. Real Paystack
// call — throws until PAYSTACK_SECRET_KEY is set, on purpose.
export async function payoutHelper(
  engagementId: string,
  recipientCode: string,
  amountPesewas: number,
  reason: string
) {
  const res = await fetch(`${PAYSTACK_BASE}/transfer`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      source: 'balance',
      amount: amountPesewas,
      recipient: recipientCode,
      reason,
      currency: 'GHS',
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.status) throw new Error(data.message || 'Failed to initiate MoMo payout')

  await db.payment.update({
    where: { engagementId },
    data: {
      payoutCurrency: 'GHS',
      payoutAmount: amountPesewas,
      payoutStatus: data.data.status === 'success' ? 'paid' : 'pending',
      payoutReference: data.data.transfer_code,
    },
  })

  return data.data
}
