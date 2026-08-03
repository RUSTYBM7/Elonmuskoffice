const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('/tmp/dist-new/index.html', 'utf8');

// Load the JS bundle
const jsCode = fs.readFileSync('/tmp/dist-new/assets/index-Cei40l4H.js', 'utf8');

// Set up minimal env
const dom = new JSDOM(
  `<!DOCTYPE html><html><head><title>T</title></head><body><div id="root"></div></body></html>`,
  {
    url: 'http://localhost/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  }
);
const window = dom.window;

// Polyfill browser globals
window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {} });
window.MutationObserver = class { observe() {} disconnect() {} };
window.IntersectionObserver = class { observe() {} disconnect() {} };
window.ResizeObserver = class { observe() {} disconnect() {} };
window.requestAnimationFrame = (fn) => setTimeout(fn, 16);
window.cancelAnimationFrame = (id) => clearTimeout(id);
window.crypto = window.crypto || { randomUUID: () => 'uuid' };
window.ResizeObserver = window.ResizeObserver;
window.WebKitMutationObserver = window.MutationObserver;
window.fetch = () => Promise.reject(new Error('no fetch'));
window.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
window.navigator.clipboard = { writeText: () => Promise.resolve() };
window.scrollTo = () => {};

// Add error tracking
const errors = [];
window.addEventListener('error', (e) => {
  errors.push({ type: 'error', message: e.error?.message || e.message, stack: e.error?.stack });
});
window.addEventListener('unhandledrejection', (e) => {
  errors.push({ type: 'rejection', reason: e.reason?.message || String(e.reason) });
});

const origErr = window.console.error;
window.console.error = (...args) => {
  const msg = args.map(a => {
    if (a && a.stack) return a.stack;
    if (a && a.message) return a.message;
    if (a && a.toString) return a.toString();
    return String(a);
  }).join(' ').slice(0, 1500);
  errors.push({ type: 'console.error', msg });
};

try {
  console.log('=== Evaluating bundle ===');
  window.eval(jsCode);
  console.log('=== Bundle evaluated, waiting for render ===');
} catch (e) {
  console.log('=== TOP-LEVEL ERROR:', e.message);
  console.log(e.stack?.split('\n').slice(0, 10).join('\n'));
  process.exit(1);
}

setTimeout(() => {
  const root = window.document.getElementById('root');
  console.log('=== Root HTML length:', root?.innerHTML?.length || 0);
  if (root && root.innerHTML.length > 0) {
    console.log('=== Page rendered OK ===');
  } else {
    console.log('=== Page is blank — root is empty ===');
    console.log('=== Errors encountered:', errors.length);
    errors.slice(0, 5).forEach((e, i) => {
      console.log(`Error ${i}:`, e);
    });
  }
  process.exit(0);
}, 6000);
