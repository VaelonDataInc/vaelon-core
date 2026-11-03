import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-09-30.endive' as any,
});

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get('origin')}/dashboard`,
    } as any);

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Portal session error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}