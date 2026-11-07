'use strict';

// Red-to-green proof for the demo: on the working code all three pass;
// on the seeded bug (v2.14.0) the checkout test fails with a 500.

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const { createApp, VERSION } = require('../src/index');

describe('cart-service', () => {
  let server;
  let base;

  before(async () => {
    await new Promise((resolve) => {
      server = createApp().listen(0, () => {
        base = `http://127.0.0.1:${server.address().port}`;
        resolve();
      });
    });
  });

  after(() => server.close());

  it('health reports ok + version', async () => {
    const res = await fetch(`${base}/health`);
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(await res.json(), { status: 'ok', version: VERSION });
  });

  it('cart total is computed from unitPrice', async () => {
    const res = await fetch(`${base}/cart/alice`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.total, 2000 * 1 + 1200 * 2);
  });

  it('checkout succeeds', async () => {
    const res = await fetch(`${base}/cart/alice/checkout`, { method: 'POST' });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.total, 4400);
    assert.match(body.orderId, /^order-/);
  });
});
