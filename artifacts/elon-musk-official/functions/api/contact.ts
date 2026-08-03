/**
 * Contact Form API
 *
 * This endpoint handles contact form submissions.
 * POST /api/contact
 */

import { Resend } from 'resend';
import { contactAutoReplyTemplate } from '../../src/lib/email-templates';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  subject?: string;
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

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  try {
    const body = await context.request.json() as ContactRequest;
    const { name, email, message, subject } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const resendApiKey = context.env.RESEND_API_KEY;
    const fromEmail = context.env.FROM_EMAIL || 'Independent <contact@elonmuskoffice.site>';
    const adminEmail = context.env.ADMIN_EMAIL || 'private@elonmuskoffice.site';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      // Simulate success in development
      if (context.env.ENVIRONMENT !== 'production') {
        return new Response(JSON.stringify({
          success: true,
          message: 'Contact form submission simulated (API key not configured)',
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

    // Send auto-reply to user
    const autoReplyTemplate = contactAutoReplyTemplate({ name, email, message });
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: autoReplyTemplate.subject,
      html: autoReplyTemplate.html,
      text: autoReplyTemplate.text
    });

    // Send notification to admin
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Contact: ${subject || 'Website Inquiry'} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
      text: `
New Contact Form Submission
=======================
Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
      `
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Your message has been sent. We will get back to you soon.',
      email: email
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send message. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
