// Smoke tests: every route renders, and /travel is built from trips.json.
// Run with: npm test   (uses Node's built-in test runner, no extra packages)
const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('../app');

const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'app_server', 'data', 'trips.json'), 'utf8')
);

let server;
let base;
test.before(async () => {
  server = http.createServer(app);
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

const get = (p) =>
  new Promise((resolve, reject) => {
    http.get(base + p, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });

for (const p of ['/', '/travel', '/rooms', '/meals', '/news', '/about', '/contact']) {
  test(`GET ${p} renders with shared layout`, async () => {
    const { status, body } = await get(p);
    assert.strictEqual(status, 200);
    assert.match(body, /<div id="header">/);
    assert.match(body, /<div id="footer">/);
  });
}

test('/travel renders one list item per trip in trips.json', async () => {
  const { body } = await get('/travel');
  const count = (body.match(/<li class="trip"/g) || []).length;
  assert.strictEqual(count, trips.length);
});

test('/travel shows each trip\'s JSON fields', async () => {
  const { body } = await get('/travel');
  for (const t of trips) {
    assert.ok(body.includes(`data-code="${t.code}"`), `code ${t.code}`);
    assert.ok(body.includes(`src="/images/${t.image}"`), `image ${t.image}`);
    assert.ok(body.includes(t.resort.replace(/&/g, "&amp;")), `resort ${t.resort}`);
    assert.ok(body.includes(t.length), `length ${t.length}`);
    // names contain curly apostrophes; compare against HBS-escaped output
    assert.ok(body.includes(t.name.replace(/&/g, '&amp;')), `name ${t.name}`);
  }
  assert.match(body, /\$799\.00/);
  assert.match(body, /February 15, 2027/);
});

test('every trip image exists in public/images', () => {
  for (const t of trips) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'images', t.image)), t.image);
  }
});

test('unknown route returns 404', async () => {
  const { status } = await get('/nope');
  assert.strictEqual(status, 404);
});
