/**
 * Newsletter Subscription API
 *
 * This endpoint handles newsletter subscriptions via Resend email service.
 * POST /api/subscribe
 *
 * Required environment variable: RESEND_API_KEY (set via Cloudflare Pages settings)
 */

import { Resend } from 'resend';
import { welcomeEmailTemplate, confirmationEmailTemplate } from '../../src/lib/email-templates';

interface SubscribeRequest {
  email: string;
  firstName?: string;
  confirmSubscription?: boolean;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  try {
    const body = await context.request.json() as SubscribeRequest;
    const { email, firstName, confirmSubscription } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Get RESEND_API_KEY from environment
    const resendApiKey = context.env.RESEND_API_KEY;
    const fromEmail = context.env.FROM_EMAIL || 'Independent <newsletter@elonmuskoffice.site>';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      // In development without API key, simulate success
      if (context.env.ENVIRONMENT !== 'production') {
        return new Response(JSON.stringify({
          success: true,
          message: 'Subscription simulated (API key not configured)',
          email: email
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const resend = new Resend(resendApiKey);

    // Generate unsubscribe URL (placeholder - in production, use actual unsubscribe endpoint)
    const baseUrl = new URL(context.request.url).origin;
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`;
    const confirmUrl = `${baseUrl}/api/confirm?email=${encodeURIComponent(email)}`;

    if (confirmSubscription) {
      // Send confirmation email first
      const confirmationTemplate = confirmationEmailTemplate({
        email,
        firstName,
        unsubscribeUrl: confirmUrl
      });

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html,
        text: confirmationTemplate.text
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Confirmation email sent. Please check your inbox.',
        email: email
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Send welcome email directly
    const welcomeTemplate = welcomeEmailTemplate({
      email,
      firstName,
      unsubscribeUrl
    });

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: welcomeTemplate.subject,
      html: welcomeTemplate.html,
      text: welcomeTemplate.text
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed! Check your inbox for a welcome email.',
      email: email
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process subscription. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
