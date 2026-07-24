import Stripe from 'stripe'
import { db } from '../db'

function client(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set — card charging is not configured yet')
  return new Stripe(key)
}

// Charges the visitor's card for an engagement (the "currency bridge" inbound
// leg) and records the result on the Payment row. Real Stripe call, not a
// mock — this throws until STRIPE_SECRET_KEY is set, on purpose, rather than
// pretending a charge succeeded.
export async function chargeVisitor(
  engagementId: string,
  amountCents: number,
  currency: string,
  paymentMethodId: string
) {
  const stripe = client()

  const intent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: currency.toLowerCase(),
    payment_method: paymentMethodId,
    confirm: true,
    automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
  })

  await db.payment.upsert({
    where: { engagementId },
    update: {
      chargeCurrency: currency,
      chargeAmount: amountCents,
      chargeStatus: intent.status === 'succeeded' ? 'charged' : 'pending',
      chargeReference: intent.id,
    },
    create: {
      engagementId,
      chargeCurrency: currency,
      chargeAmount: amountCents,
      chargeStatus: intent.status === 'succeeded' ? 'charged' : 'pending',
      chargeReference: intent.id,
      payoutAmount: 0,
    },
  })

  return intent
}
