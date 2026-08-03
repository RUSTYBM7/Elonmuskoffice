/**
 * Cloudflare Pages SPA Fallback Handler
 *
 * This function ensures all routes are handled by the SPA router.
 * Required for single-page applications where client-side routing handles navigation.
 */

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Only handle GET requests for HTML pages
  if (context.request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Skip API routes and static assets
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('.') // Has file extension
  ) {
    return context.next();
  }

  // Try to fetch the requested path
  const response = await context.next();

  // If 404, serve the SPA index
  if (response.status === 404) {
    return new Response(await (await fetch(new Request(url.origin + '/'))).text(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }

  return response;
};
