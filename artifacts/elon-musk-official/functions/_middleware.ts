/**
 * Cloudflare Pages Middleware
 *
 * This middleware handles:
 * - Security headers
 * - CORS for API routes
 * - Request logging
 * - Analytics-free tracking (optional)
 */

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();

  // Add security headers to all responses
  const newHeaders = new Headers(response.headers);

  newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  newHeaders.set('X-XSS-Protection', '1; mode=block');

  // Add cache headers for static assets
  const url = new URL(context.request.url);
  if (url.pathname.match(/\.(js|css|woff2)$/)) {
    newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // CORS headers for API routes
  if (url.pathname.startsWith('/api/')) {
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};
