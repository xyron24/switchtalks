# AGENTS.md — cart-service

Instructions for AI agents working in this directory.

## Run

```bash
npm install   # once
npm start     # :3000, or PORT=xxxx npm start
```

## Test

```bash
npm test      # must be green before you claim a fix works
```

## Reproduce a checkout failure

```bash
npm start &
curl -s -X POST localhost:3000/cart/alice/checkout
```

Read the HTTP status code and the JSON body. Quote both verbatim when reporting.
Also check the server's stderr for the structured error line:
`checkout failed: total is NaN (user=…, version=…)`.

## Rules

- Reproduce first, with exact output. Never propose a fix you have not run.
- Keep fixes minimal: the smallest diff that turns the failing test green without breaking the others.
- Do not push, open PRs, or merge without an explicit human approval in the incident thread.
