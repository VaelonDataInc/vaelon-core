import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-09-30.endive' as any,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const tierLevel = formData.get('tierLevel')?.toString() || '1';
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // 1. Free Tier (Tier 1) bypasses Stripe and routes straight to the dashboard
    if (tierLevel === '1') {
      return NextResponse.redirect(`${origin}/dashboard?email=collector@vaelondata.com`, 303);
    }

    // 2. Map all 6 Sovereign Vault Tiers to their respective Stripe Price IDs
    const priceMap: Record<string, string | undefined> = {
      '2': process.env.STRIPE_TIER_2_PRICE_ID || process.env.STRIPE_PRO_PRICE_ID,
      '3': process.env.STRIPE_TIER_3_PRICE_ID,
      '4': process.env.STRIPE_TIER_4_PRICE_ID,
      '5': process.env.STRIPE_TIER_5_PRICE_ID,
      '6': process.env.STRIPE_TIER_6_PRICE_ID,
    };

    const priceId = priceMap[tierLevel];

    if (!priceId) {
      return NextResponse.json({ error: `Stripe Price ID not configured for Tier ${tierLevel}` }, { status: 400 });
    }

    // 3. Create Stripe Checkout Session for paid tiers
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        tier_level: tierLevel,
      },
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    } as any);

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }

    // 4. Clean redirect using standard 303 status
    return NextResponse.redirect(session.url, 303);
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}