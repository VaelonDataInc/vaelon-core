import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-09-30.endive' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // 1. Grab the raw body text (crucial for signature verification)
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    // 2. Verify the cryptographic signature against your webhook secret
    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET is not set. Verification bypassed.');
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    // 3. Handle subscription events to sync Neon user tiers automatically
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const tierLevel = parseInt(session.metadata?.tier_level || '1', 10);

      if (customerId) {
        await pool.query(
          `UPDATE users SET tier_level = $1, subscription_status = 'active' WHERE stripe_customer_id = $2`,
          [tierLevel, customerId]
        );
        console.log(`Successfully updated customer ${customerId} to tier ${tierLevel}`);
      }
    } 
    else if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const tierLevel = parseInt(subscription.metadata?.tier_level || '1', 10);

      if (customerId) {
        await pool.query(
          `UPDATE users SET tier_level = $1, subscription_status = $2 WHERE stripe_customer_id = $3`,
          [tierLevel, subscription.status, customerId]
        );
      }
    }
    // 4. Grace Period Buffer on Failed Payment (Protects User Access)
    else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      if (customerId) {
        await pool.query(
          `UPDATE users SET subscription_status = 'past_due' WHERE stripe_customer_id = $1`,
          [customerId]
        );
      }
    }
    // 5. Controlled Teardown After Exhausted Retries
    else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      if (customerId) {
        await pool.query(
          `UPDATE users SET tier_level = 1, subscription_status = 'canceled' WHERE stripe_customer_id = $1`,
          [customerId]
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Database execution error in webhook:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}