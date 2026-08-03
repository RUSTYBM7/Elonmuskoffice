const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('/tmp/dist-new/index.html', 'utf8');
const jsCode = fs.readFileSync('/tmp/dist-new/assets/index-Cei40l4H.js', 'utf8');

const dom = new JSDOM(`<!DOCTYPE html><html><head><title>T</title></head><body><div id="root"></div></body></html>`, {
  url: 'http://localhost/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const window = dom.window;
window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {} });
window.MutationObserver = class { observe() {} disconnect() {} };
window.IntersectionObserver = class { observe() {} disconnect() {} };
window.ResizeObserver = class { observe() {} disconnect() {} };
window.requestAnimationFrame = (fn) => setTimeout(fn, 16);
window.cancelAnimationFrame = (id) => clearTimeout(id);
window.crypto = window.crypto || { randomUUID: () => 'uuid' };
window.WebKitMutationObserver = window.MutationObserver;
window.fetch = () => Promise.reject(new Error('no fetch'));
window.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
window.navigator.clipboard = { writeText: () => Promise.resolve() };
window.scrollTo = () => {};

try {
  window.eval(jsCode);
} catch (e) {
  console.log('TOP-LEVEL ERROR:', e.message);
  process.exit(1);
}

setTimeout(() => {
  const root = window.document.getElementById('root');
  const html = root?.innerHTML || '';
  // Get the section headings
  const headings = html.match(/<h2[^>]*>([^<]+)<\/h2>/g) || [];
  console.log('=== Root HTML length:', html.length);
  console.log('=== Section headings:');
  headings.slice(0, 15).forEach(h => console.log('  -', h.replace(/<[^>]+>/g, '').trim()));
  
  // Check for the user's key features
  console.log('\n=== Feature checks:');
  console.log('  Direct Allocation:', html.includes('Direct Allocation') || html.includes('direct access'));
  console.log('  SpaceX IPO:', html.includes('SpaceX IPO'));
  console.log('  Press Wall:', html.includes('PressWall') || html.includes('press'));
  console.log('  Stock Widget tickers:', (html.match(/TSLA|BTC|DOGE|SPX|NRL|XAI/g) || []).slice(0, 5));
}, 5000);
