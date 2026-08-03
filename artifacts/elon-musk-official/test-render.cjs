const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('/tmp/dist-new/index.html', 'utf8');
const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  beforeParse(window) {
    window.addEventListener('error', (e) => {
      console.log('WINDOW ERROR:', e.error?.message || e.message);
      console.log('Stack:', e.error?.stack?.split('\n').slice(0, 10).join('\n'));
    });
    window.addEventListener('unhandledrejection', (e) => {
      console.log('UNHANDLED PROMISE:', e.reason?.message || e.reason);
    });
    // Override console.error
    const origErr = window.console.error;
    window.console.error = (...args) => {
      const msg = args.map(a => {
        if (a && a.message) return a.message;
        if (a && a.toString) return a.toString();
        return String(a);
      }).join(' ').slice(0, 1000);
      console.log('CONSOLE.ERROR:', msg);
    };
  }
});

setTimeout(() => {
  const root = dom.window.document.getElementById('root');
  console.log('=== Root HTML length:', root?.innerHTML?.length || 0);
  console.log('=== Root first 500 chars:');
  console.log(root?.innerHTML?.slice(0, 500));
  process.exit(0);
}, 8000);
