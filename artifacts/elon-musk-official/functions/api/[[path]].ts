/**
 * Cloudflare Pages Functions
 *
 * This directory contains serverless functions that run on Cloudflare Pages.
 * Each file corresponds to a route. Use [[catchall]].ts for wildcard routes.
 *
 * API endpoints example:
 * - functions/api/hello.ts → /api/hello
 * - functions/api/news.ts → /api/news
 * - functions/api/[[catchall]].ts → /api/*
 */

export async function onRequest(context: { request: Request }): Promise<Response> {
  // Handle API requests here
  // Example: Proxy to external APIs, process form submissions, etc.

  const url = new URL(context.request.url);

  // Add CORS headers for API endpoints
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(JSON.stringify({
    message: 'Elon Musk Office API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/news'],
    documentation: 'https://developers.cloudflare.com/pages/platform/functions/'
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
