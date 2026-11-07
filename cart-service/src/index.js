'use strict';

/**
 * cart-service — a deliberately tiny checkout API.
 *
 * Endpoints:
 *   GET  /health              -> { status: "ok", version }
 *   GET  /cart/:userId        -> { userId, items, total }
 *   POST /cart/:userId/checkout -> { orderId, userId, total, version }
 *
 * Data is in-memory seed data. There is no database on purpose:
 * the demo needs a service that starts in under a second.
 */

const express = require('express');

const VERSION = '2.13.2';

// Seed carts. Item shape: { name, unitPrice (cents), qty }.
const carts = {
  alice: {
    items: [
      { name: 't-shirt', unitPrice: 2000, qty: 1 },
      { name: 'mug', unitPrice: 1200, qty: 2 },
    ],
  },
  bob: {
    items: [{ name: 'book', unitPrice: 900, qty: 1 }],
  },
};

function totalFor(items) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', version: VERSION });
  });

  app.get('/cart/:userId', (req, res) => {
    const cart = carts[req.params.userId];
    if (!cart) return res.status(404).json({ error: 'unknown user' });
    res.json({ userId: req.params.userId, items: cart.items, total: totalFor(cart.items) });
  });

  app.post('/cart/:userId/checkout', (req, res) => {
    const cart = carts[req.params.userId];
    if (!cart) return res.status(404).json({ error: 'unknown user' });
    const total = totalFor(cart.items);
    if (!Number.isFinite(total)) {
      console.error(`checkout failed: total is NaN (user=${req.params.userId}, version=${VERSION})`);
      return res.status(500).json({ error: 'checkout failed' });
    }
    res.json({ orderId: `order-${Date.now()}`, userId: req.params.userId, total, version: VERSION });
  });

  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`cart-service ${VERSION} listening on :${port}`));
}

module.exports = { createApp, VERSION };
