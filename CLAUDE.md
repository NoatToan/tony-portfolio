@AGENTS.md

# Portfolio — project rules

- House rules: `.claude/tlm-plugin/` (see `RULES.md` there). Frontend code follows `skills/fe-coding/SKILL.md`
  (STEP 2 + STEP 3 App Router), `ai/nextjs/app-router/06-hard-rules.md` and `ai/shared-fe/`. Review with the
  `fe-reviewer` agent before committing.
- Product decisions: `docs/DECISIONS.md` (append-only log). Personal source notes: `docs/drive-scan-notes.md` (gitignored).
- Gates (same as CI): `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Deploy: push to `main`, and GitHub Actions deploys to Vercel. After content changes, run `npm run bench` and push the
  updated benchmark data.
