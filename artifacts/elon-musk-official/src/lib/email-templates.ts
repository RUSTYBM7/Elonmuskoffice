/**
 * Email Templates for Elon Musk Office - Design System Compliant
 *
 * Design System:
 * - Light Mode: #FFFFFF background, #111111 text, #E5E5E5 borders
 * - Dark Mode: #0D0D0D background, #FAFAFA text, #292929 borders
 * - Primary Accent: #E31937 (Tesla Red - used in dark mode)
 * - Font: Inter, system-ui, -apple-system
 */

export interface EmailTemplateData {
  email: string;
  firstName?: string;
  unsubscribeUrl?: string;
  confirmUrl?: string;
}

// Design System Colors
const colors = {
  light: {
    background: '#FFFFFF',
    foreground: '#111111',
    border: '#E5E5E5',
    secondary: '#F5F5F5',
    muted: '#666666',
    mutedForeground: '#999999',
  },
  dark: {
    background: '#0D0D0D',
    foreground: '#FAFAFA',
    border: '#292929',
    secondary: '#1A1A1A',
    muted: '#A0A0A0',
    mutedForeground: '#666666',
    accent: '#E31937', // Tesla Red
  }
};

// Base email template wrapper
const baseEmailTemplate = (content: {
  title: string;
  subtitle?: string;
  html: string;
  text: string;
  accentColor?: string;
}) => {
  const c = colors.light;
  const accent = content.accentColor || c.foreground;

  return {
    subject: content.title,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse: collapse;}
    .button {padding: 12px 24px !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${c.secondary}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

  <!-- Preview Text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${content.subtitle || content.title}
  </div>

  <!-- Email Wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${c.secondary};">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: ${c.background}; border: 1px solid ${c.border};">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; text-align: center; border-bottom: 1px solid ${c.border};">
              <p style="margin: 0 0 24px 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${c.mutedForeground};">
                Newsletter &middot; Independent
              </p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 40px; height: 1px; background-color: ${c.border};"></div>
                <span style="font-size: 10px; letter-spacing: 0.2em; color: ${c.mutedForeground}; text-transform: uppercase;">Est. 2024</span>
                <div style="width: 40px; height: 1px; background-color: ${c.border};"></div>
              </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; color: ${c.foreground}; letter-spacing: -0.02em; line-height: 1.2;">
                ${content.title}
              </h1>
              ${content.subtitle ? `<p style="margin: 12px 0 0 0; font-size: 14px; color: ${c.muted}; font-style: italic; font-family: Georgia, serif;">${content.subtitle}</p>` : ''}
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content.html}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; border-top: 1px solid ${c.border}; background-color: ${c.secondary};">
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
                <div style="flex: 1; height: 1px; background-color: ${c.border};"></div>
                <span style="font-size: 10px; letter-spacing: 0.2em; color: ${c.mutedForeground}; text-transform: uppercase;">Independent</span>
                <div style="flex: 1; height: 1px; background-color: ${c.border};"></div>
              </div>
              <p style="margin: 0; font-size: 11px; color: ${c.mutedForeground}; text-align: center; line-height: 1.6;">
                &copy; ${new Date().getFullYear()} Independent. All rights reserved.<br>
                <span style="color: ${c.mutedForeground};">
                  ${content.accentColor ? 'Elon Musk\'s Ventures' : 'Stay informed. Think critically. Decide for yourself.'}
                </span>
              </p>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>`,
    text: content.text
  };
};

// Welcome email template
export const welcomeEmailTemplate = (data: EmailTemplateData) => {
  const greeting = data.firstName ? `Welcome to Independent, ${data.firstName}` : 'Welcome to Independent';

  return baseEmailTemplate({
    title: 'Welcome to Independent',
    subtitle: 'Your unfiltered briefing on Elon Musk\'s ventures',
    html: `
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #111111;">
        You've successfully subscribed to <strong>Independent</strong> — the newsletter that delivers unfiltered dispatches on Tesla, SpaceX, Neuralink, xAI, and more.
      </p>

      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F5F5; border: 1px solid #E5E5E5; margin: 24px 0;">
        <tr>
          <td style="padding: 24px;">
            <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.05em;">
              What to expect:
            </p>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #111111;">&bull; Breaking news and analysis</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #111111;">&bull; Technical deep-dives</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #111111;">&bull; Real-world updates from the ventures</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #111111;">&bull; No spin, no agenda</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #111111;">
        We don't send press releases. We cut through the noise and give you what matters.
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #111111;">
        Stay informed. Think critically. Decide for yourself.
      </p>

      <!-- CTA Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="border-radius: 0; background-color: #111111;">
            <a href="https://elonmuskoffice.site" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; font-size: 12px; font-weight: 500; color: #FFFFFF; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 0;">
              Visit Our Website
            </a>
          </td>
        </tr>
      </table>

      ${data.unsubscribeUrl ? `
      <p style="margin: 32px 0 0 0; font-size: 11px; color: #999999; text-align: center; line-height: 1.6;">
        If you didn't sign up for this newsletter, you can <a href="${data.unsubscribeUrl}" style="color: #999999; text-decoration: underline;">unsubscribe here</a>.
      </p>
      ` : ''}
    `,
    text: `
${greeting}

You've successfully subscribed to Independent — the newsletter that delivers unfiltered dispatches on Tesla, SpaceX, Neuralink, xAI, and more.

What to expect:
- Breaking news and analysis
- Technical deep-dives
- Real-world updates from the ventures
- No spin, no agenda

We don't send press releases. We cut through the noise and give you what matters.

Stay informed. Think critically. Decide for yourself.

Visit our website: https://elonmuskoffice.site

---
${data.unsubscribeUrl ? `If you didn't sign up for this newsletter, you can unsubscribe here: ${data.unsubscribeUrl}\n\n` : ''}
© ${new Date().getFullYear()} Independent. All rights reserved.
    `.trim()
  });
};

// Confirmation email template
export const confirmationEmailTemplate = (data: EmailTemplateData) => {
  return baseEmailTemplate({
    title: 'Confirm Your Subscription',
    html: `
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #111111; text-align: center;">
        Please confirm your subscription by clicking the button below.
      </p>

      <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; text-align: center;">
        You're subscribing with: <strong style="color: #111111;">${data.email}</strong>
      </p>

      <!-- CTA Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding: 8px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="border-radius: 0; background-color: #111111;">
                  <a href="${data.confirmUrl || '#'}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 32px; font-size: 12px; font-weight: 500; color: #FFFFFF; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 0;">
                    Confirm Subscription
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="margin: 32px 0 0 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">
        If you didn't request this, you can safely ignore this email.
      </p>
    `,
    text: `
Almost There! Please Confirm Your Subscription

Please confirm your subscription by clicking the link below.

You're subscribing with: ${data.email}

${data.confirmUrl ? `Confirm your subscription: ${data.confirmUrl}` : ''}

If you didn't request this, you can safely ignore this email.

© ${new Date().getFullYear()} Independent. All rights reserved.
    `.trim()
  });
};

// Unsubscribe confirmation template
export const unsubscribeEmailTemplate = (data: EmailTemplateData) => {
  return baseEmailTemplate({
    title: "You've Been Unsubscribed",
    html: `
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border: 1px solid #E5E5E5; margin-bottom: 20px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #111111;">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #111111; text-align: center;">
        You've been successfully removed from the Independent newsletter.
      </p>

      <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; text-align: center;">
        We're sorry to see you go. If you change your mind, you can resubscribe anytime.
      </p>

      <!-- CTA Button -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding: 8px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="border: 1px solid #E5E5E5; border-radius: 0; background-color: transparent;">
                  <a href="https://elonmuskoffice.site" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; font-size: 12px; font-weight: 500; color: #111111; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 0;">
                    Visit Our Website
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
    text: `
You've Been Unsubscribed

You've been successfully removed from the Independent newsletter.

We're sorry to see you go. If you change your mind, you can resubscribe anytime.

Visit our website: https://elonmuskoffice.site

© ${new Date().getFullYear()} Independent. All rights reserved.
    `.trim()
  });
};

// Contact form auto-reply template
export const contactAutoReplyTemplate = (data: { name: string; email: string; message: string }) => {
  return baseEmailTemplate({
    title: "We've Received Your Message",
    html: `
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #111111;">
        Hi ${data.name},
      </p>

      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #111111;">
        Thank you for reaching out. We've received your message and will get back to you as soon as possible.
      </p>

      <!-- Message Box -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F5F5; border: 1px solid #E5E5E5; margin: 24px 0;">
        <tr>
          <td style="padding: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.05em;">
              Your message:
            </p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #111111; white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</p>
          </td>
        </tr>
      </table>

      <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">
        We typically respond within 24-48 hours.
      </p>

      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #111111;">
        Best regards,<br>
        <strong>The Independent Team</strong>
      </p>
    `,
    text: `
Hi ${data.name},

Thank you for reaching out. We've received your message and will get back to you as soon as possible.

Your message:
${data.message}

We typically respond within 24-48 hours.

Best regards,
The Independent Team

© ${new Date().getFullYear()} Independent. All rights reserved.
    `.trim()
  });
};

// Weekly newsletter template
export const weeklyNewsletterTemplate = (data: {
  issueNumber: number;
  date: string;
  articles: Array<{
    title: string;
    summary: string;
    source: string;
    url: string;
  }>;
  unsubscribeUrl?: string;
}) => {
  const articlesHtml = data.articles.map((article, i) => `
    <tr>
      <td style="padding: 24px 0; border-bottom: 1px solid #E5E5E5;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="padding-bottom: 12px;">
              <span style="display: inline-block; font-size: 10px; font-weight: 500; color: #999999; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 8px; background-color: #F5F5F5;">
                ${article.source}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 8px;">
              <a href="${article.url}" target="_blank" rel="noopener noreferrer" style="font-size: 16px; font-weight: 500; color: #111111; text-decoration: none; line-height: 1.4;">
                ${article.title}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">
                ${article.summary}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return baseEmailTemplate({
    title: `Independent #${data.issueNumber} — ${data.date}`,
    html: `
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666;">
        Issue #${data.issueNumber} &middot; ${data.date}
      </p>

      <p style="margin: 0 0 32px 0; font-size: 14px; color: #666666; font-style: italic; font-family: Georgia, serif;">
        Stay informed. Think critically. Decide for yourself.
      </p>

      <!-- Articles -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        ${articlesHtml}
      </table>

      <!-- Footer Links -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 32px;">
        <tr>
          <td style="padding: 24px; background-color: #F5F5F5; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 12px; color: #666666;">
              You received this because you're subscribed to Independent.
            </p>
            <p style="margin: 0; font-size: 12px;">
              <a href="${data.unsubscribeUrl || '#'}" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
              &nbsp;&middot;&nbsp;
              <a href="https://elonmuskoffice.site" style="color: #999999; text-decoration: underline;">View in browser</a>
            </p>
          </td>
        </tr>
      </table>
    `,
    text: `
Independent #${data.issueNumber} — ${data.date}
${'='.repeat(50)}
Stay informed. Think critically. Decide for yourself.

${data.articles.map((article, i) => `
${i + 1}. ${article.title}
   Source: ${article.source}
   ${article.summary}
   ${article.url}
`).join('\n')}

---
You received this because you're subscribed to Independent.
Unsubscribe: ${data.unsubscribeUrl || '#'}
    `.trim()
  });
};

// Dark mode variant (Tesla Red accent)
export const darkModeWelcomeTemplate = (data: EmailTemplateData) => {
  const c = colors.dark;
  const accent = c.accent;

  return {
    subject: 'Welcome to Independent',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Independent</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse: collapse;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${c.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

  <div style="display: none; max-height: 0; overflow: hidden;">
    Welcome to Independent — Your unfiltered briefing
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${c.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: ${c.background}; border: 1px solid ${c.border};">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; text-align: center; border-bottom: 1px solid ${c.border};">
              <p style="margin: 0 0 24px 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${c.mutedForeground};">
                Newsletter &middot; Independent
              </p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 40px; height: 1px; background-color: ${c.border};"></div>
                <span style="font-size: 10px; letter-spacing: 0.2em; color: ${c.mutedForeground}; text-transform: uppercase;">Est. 2024</span>
                <div style="width: 40px; height: 1px; background-color: ${c.border};"></div>
              </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; color: ${c.foreground}; letter-spacing: -0.02em; line-height: 1.2;">
                Welcome to Independent
              </h1>
              <p style="margin: 12px 0 0 0; font-size: 14px; color: ${c.muted}; font-style: italic; font-family: Georgia, serif;">
                Your unfiltered briefing on Elon Musk's ventures
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: ${c.foreground};">
                You've successfully subscribed to <strong>Independent</strong> — the newsletter that delivers unfiltered dispatches on Tesla, SpaceX, Neuralink, xAI, and more.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${c.secondary}; border: 1px solid ${c.border}; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: ${c.foreground}; text-transform: uppercase; letter-spacing: 0.05em;">
                      What to expect:
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: ${c.foreground};">&bull; Breaking news and analysis</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: ${c.foreground};">&bull; Technical deep-dives</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: ${c.foreground};">&bull; Real-world updates from the ventures</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: ${c.foreground};">&bull; No spin, no agenda</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: ${c.foreground};">
                We don't send press releases. We cut through the noise and give you what matters.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: ${c.foreground};">
                Stay informed. Think critically. Decide for yourself.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius: 0; background-color: ${accent};">
                    <a href="https://elonmuskoffice.site" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; font-size: 12px; font-weight: 500; color: #FFFFFF; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 0;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>

              ${data.unsubscribeUrl ? `
              <p style="margin: 32px 0 0 0; font-size: 11px; color: ${c.mutedForeground}; text-align: center; line-height: 1.6;">
                If you didn't sign up, <a href="${data.unsubscribeUrl}" style="color: ${c.mutedForeground}; text-decoration: underline;">unsubscribe here</a>.
              </p>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; border-top: 1px solid ${c.border}; background-color: ${c.secondary};">
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
                <div style="flex: 1; height: 1px; background-color: ${c.border};"></div>
                <span style="font-size: 10px; letter-spacing: 0.2em; color: ${c.mutedForeground}; text-transform: uppercase;">Independent</span>
                <div style="flex: 1; height: 1px; background-color: ${c.border};"></div>
              </div>
              <p style="margin: 0; font-size: 11px; color: ${c.mutedForeground}; text-align: center; line-height: 1.6;">
                &copy; ${new Date().getFullYear()} Independent. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
    text: `
Welcome to Independent${data.firstName ? `, ${data.firstName}` : ''}

You've successfully subscribed to Independent — the newsletter that delivers unfiltered dispatches on Tesla, SpaceX, Neuralink, xAI, and more.

What to expect:
- Breaking news and analysis
- Technical deep-dives
- Real-world updates from the ventures
- No spin, no agenda

We don't send press releases. We cut through the noise and give you what matters.

Stay informed. Think critically. Decide for yourself.

Visit our website: https://elonmuskoffice.site

---
${data.unsubscribeUrl ? `If you didn't sign up, unsubscribe here: ${data.unsubscribeUrl}\n\n` : ''}
© ${new Date().getFullYear()} Independent. All rights reserved.
    `.trim()
  };
};
