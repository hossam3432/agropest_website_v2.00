# Claude Code Rules

- **Code Style:** Return ONLY unified diffs (`diff` format) for edits. Never rewrite entire files.
- **Behavior:** Be extremely concise. Do not explain your changes, write preambles, or give summaries unless explicitly asked.
- **Constraints:** Do not look inside `.next/` or run `npm run build` unless explicitly instructed.
