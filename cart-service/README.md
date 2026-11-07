# cart-service

Tiny demo checkout API for the Incident Room project. In-memory data, no database, starts in under a second.

## Run

```bash
npm install
npm start          # listens on :3000 (override with PORT=xxxx)
```

## Test

```bash
npm test           # node:test suite: health, cart total, checkout
```

## Endpoints

| Method | Path | Meaning |
| --- | --- | --- |
| GET | `/health` | `{ status: "ok", version }` |
| GET | `/cart/:userId` | Cart items + computed total (`alice`, `bob` seeded) |
| POST | `/cart/:userId/checkout` | Order confirmation, or 500 if the total is not finite |

## Reproduce the incident

```bash
npm start &
curl -s -o /dev/null -w "%{http_code}\n" -X POST localhost:3000/cart/alice/checkout
```

`200` = working (`v2.13.2`). `500` = the seeded checkout bug (`v2.14.0`).
