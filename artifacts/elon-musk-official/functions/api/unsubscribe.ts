/**
 * Newsletter Unsubscribe API
 *
 * This endpoint handles newsletter unsubscriptions.
 * GET /api/unsubscribe?email=xxx
 */

import { Resend } from 'resend';
import { unsubscribeEmailTemplate } from '../../src/lib/email-templates';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(context.request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      // Return HTML page for direct access
      return new Response(getUnsubscribePageHTML(), {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const resendApiKey = context.env.RESEND_API_KEY;
    const fromEmail = context.env.FROM_EMAIL || 'Independent <newsletter@elonmuskoffice.site>';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const template = unsubscribeEmailTemplate({ email });

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
    }

    // Return success page
    return new Response(getUnsubscribedPageHTML(email), {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new Response(getErrorPageHTML(), {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

function getUnsubscribePageHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe - Independent</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    h1 { font-size: 24px; color: #1a1a1a; margin: 0 0 20px 0; }
    p { color: #666; line-height: 1.6; }
    .error { color: #dc2626; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Unsubscribe</h1>
    <p class="error">Missing email parameter.</p>
    <p>Please use the unsubscribe link from your email.</p>
  </div>
</body>
</html>
`;
}

function getUnsubscribedPageHTML(email: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed - Independent</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    h1 { font-size: 24px; color: #1a1a1a; margin: 0 0 20px 0; }
    p { color: #666; line-height: 1.6; }
    .success { color: #16a34a; }
    .email { font-weight: 600; color: #1a1a1a; }
    .btn { display: inline-block; background: #1a1a1a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="success">Successfully Unsubscribed</h1>
    <p>You've been removed from the Independent newsletter.</p>
    <p class="email">${email}</p>
    <p>We're sorry to see you go. You can resubscribe anytime.</p>
    <a href="https://elonmuskoffice.site" class="btn">Visit Website</a>
  </div>
</body>
</html>
`;
}

function getErrorPageHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - Independent</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    h1 { font-size: 24px; color: #dc2626; margin: 0 0 20px 0; }
    p { color: #666; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Something Went Wrong</h1>
    <p>We couldn't process your request. Please try again later.</p>
  </div>
</body>
</html>
`;
}
