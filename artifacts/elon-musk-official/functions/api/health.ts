/**
 * Health Check API Endpoint
 * GET /api/health
 */

export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'elonmuskoffice',
    platform: 'cloudflare-pages'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
