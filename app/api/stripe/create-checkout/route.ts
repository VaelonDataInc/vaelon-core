import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-10-28.endive' as any,
});

// Map your 6-Tier master structure to your live Stripe Price IDs
const TIER_PRICE_MAP: Record<number, string> = {
  2: process.env.STRIPE_PRICE_RETAIL_BASE || '', // $20/mo Retail Base Feed
  3: process.env.STRIPE_PRICE_RETAIL_MAX || '', // $35/mo Retail Max Feed
  4: process.env.STRIPE_PRICE_INSTITUTIONAL || '', // $10,000/mo Institutional Entry
  5: process.env.STRIPE_PRICE_UNDERWRITER || '', // $20,000/mo Enterprise Underwriter
  6: process.env.STRIPE_PRICE_SOVEREIGN || '', // $40,000/mo Global Sovereign API
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tierLevel, userEmail } = body;

    if (!tierLevel || tierLevel < 2 || tierLevel > 6) {
      return NextResponse.json({ error: 'Invalid tier selection. Must be between Tier 2 and Tier 6.' }, { status: 400 });
    }

    const priceId = TIER_PRICE_MAP[tierLevel];
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price ID mapping is missing for this tier in environment configuration.' }, { status: 500 });
    }

    // Create Stripe Checkout Session for recurring subscriptions
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
      metadata: {
        tierLevel: tierLevel.toString(),
      },
    } as any);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
