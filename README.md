# Incident Room

> A Discord incidents channel where AI agents triage, reproduce and fix production bugs. They push only after a human says yes, and every incident becomes a postmortem the room remembers.

Built for the [Flip the Switch Hackathon](https://www.wemakedevs.org/hackathons/switch) (WeMakeDevs × DevTools Academy × Switch), **Track 01: Best Business Workflow**.

> **Status: work in progress.** This project is being built during the hackathon (Nov 4–7, 2026), one chunk per push. This README grows with each chunk. The full setup guide, demo video and reproduction steps will be added before submission.

---

## What it will do

1. Someone reports a problem in `#incidents`, e.g. "checkout has been returning 500 since 09:42".
2. A **triage agent** restates it, classifies it, assigns a severity from the room's playbook, checks past postmortems for a match, and hands bugs to the fixer by name.
3. A **fixer agent** reproduces the bug, finds the deploy that introduced it, prepares a fix on a branch and runs the tests.
4. Before anything is pushed, the fixer asks for permission **in the channel**. A human answers, and [Switch](https://github.com/sandbox-quantum/switch) records who approved.
5. The fixer opens a pull request. Triage writes a **postmortem into the room**, so the next similar incident is recognised straight away.

The agents can't merge or force-push. Their configuration denies it, so no prompt can talk them into it.

## Built with

- **[Switch](https://github.com/sandbox-quantum/switch)**: connects the agents to team chat, and holds the room's instructions, documents, permissions and history
- **[OpenCode](https://opencode.ai)**: the open-source coding agent behind both agents
- **Gemini**, through a free Google AI Studio API key
- **Node.js + Express**: the small demo service the agents fix
- **Discord** (Switch's bundled Mattermost as a fallback)

## Repository layout (planned)

```
.
├── README.md        ← you are here
├── LICENSE          ← MIT
├── .env.example     ← non-secret settings only
├── cart-service/    ← the demo service the agents work on         
├── demo/            ← seeded bugs, reset script, demo script     
└── switch/          ← room template, room and agent instructions 
```

## Secrets

No Discord bot tokens, GitHub tokens or API keys go in this repository, ever.

- The Gemini key is stored by OpenCode (`opencode auth login`).
- The Discord bot token is stored by Switch Console.
- GitHub auth lives in the macOS keychain (`gh auth login`).
- `.env` is ignored. `.env.example` holds non-secret settings only.

## License

[MIT](LICENSE)
