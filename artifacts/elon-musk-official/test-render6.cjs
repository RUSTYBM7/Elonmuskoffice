const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('/tmp/dist-fix/index.html', 'utf8');
const jsMatch = html.match(/assets\/(index-[^"]+\.js)/);
const jsCode = fs.readFileSync('/tmp/dist-fix/assets/' + jsMatch[1], 'utf8');

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

try { window.eval(jsCode); } catch (e) { console.log('TOP-LEVEL:', e.message); process.exit(1); }

setTimeout(() => {
  const root = window.document.getElementById('root');
  const html = root?.innerHTML || '';
  console.log('=== Full Root HTML (first 5000 chars):');
  console.log(html.slice(0, 5000));
  process.exit(0);
}, 6000);
