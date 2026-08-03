const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('/tmp/dist-fix/index.html', 'utf8');
const jsMatch = html.match(/assets\/(index-[^"]+\.js)/);
if (!jsMatch) { console.log('No JS found'); process.exit(1); }
const jsCode = fs.readFileSync('/tmp/dist-fix/' + jsMatch[1], 'utf8');

const dom = new JSDOM(`<!DOCTYPE html><html><head><title>T</title></head><body><div id="root"></div></body></html>`, {
  url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true,
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
window.SpeechRecognition = undefined;
window.webkitSpeechRecognition = undefined;

const errors = [];
window.addEventListener('error', (e) => errors.push({ type: 'error', msg: e.error?.message }));
window.addEventListener('unhandledrejection', (e) => errors.push({ type: 'rejection', msg: e.reason?.message }));
window.console.error = (...args) => errors.push({ type: 'console.error', msg: args[0]?.message || String(args[0]) });

try {
  window.eval(jsCode);
} catch (e) {
  console.log('TOP-LEVEL ERROR:', e.message);
  process.exit(1);
}

setTimeout(() => {
  const root = window.document.getElementById('root');
  const html = root?.innerHTML || '';
  console.log('=== Root HTML length:', html.length);
  if (html.length > 100) {
    const headings = html.match(/<h2[^>]*>([^<]+)<\/h2>/g) || [];
    console.log('=== Page rendered OK, section headings:');
    headings.slice(0, 15).forEach(h => console.log('  -', h.replace(/<[^>]+>/g, '').trim()));
    console.log('\n=== Feature checks:');
    console.log('  Direct Allocation:', html.includes('Direct Allocation') || html.includes('Built for the'));
    console.log('  SpaceX IPO:', html.includes('SpaceX IPO') || html.includes('real-time News'));
    console.log('  Stock Widget tickers:', (html.match(/TSLA|BTC|DOGE|SPX|NRL|XAI/g) || []).slice(0, 5));
  } else {
    console.log('=== Page is blank — root empty ===');
    errors.slice(0, 5).forEach((e, i) => console.log(`Error ${i}:`, e.msg?.slice(0, 200)));
  }
  process.exit(0);
}, 6000);
