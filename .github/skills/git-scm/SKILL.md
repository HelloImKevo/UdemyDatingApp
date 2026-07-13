---
name: git-scm
description: "Git source control workflow — analyze diffs, staged changes, commit history, stash, branches, and generate pull request descriptions and commit messages. Use when the user asks to summarize changes, write a PR description, craft a commit message, review git history, inspect stashed work, compare branches, or produce a changelist summary. Also use when the user mentions git diff, git log, git stash, git blame, or asks for a PR template."
---

# Git SCM Skill

## When to Use

- Generating a pull request description from staged or committed changes
- Writing a commit message for a changelist
- Summarizing what changed across a branch, stash, or set of commits
- Comparing branches to understand divergence
- Investigating git history, blame, or provenance of specific code
- Producing a changelist document for code review or audit purposes

## Procedure

### Step 1 — Determine the Change Source

Ask or infer which changes to analyze:

| Source | Git Command | When |
|--------|-------------|------|
| Staged changes | `git diff --cached` | User is about to commit |
| Unstaged changes | `git diff` | User wants to preview before staging |
| Last N commits | `git log -p -N` | User recently committed and wants a summary |
| Branch comparison | `git log --oneline main..HEAD` + `git diff main...HEAD` | User wants a PR for the whole branch |
| Stashed work | `git stash show -p stash@{0}` | User wants to summarize stashed WIP |

Always start with `git status` and `git diff --cached --stat` (or `git diff --stat`) to get a high-level picture before diving into full diffs.

### Step 2 — Read the Full Diff

Run the appropriate `git diff` command and read every changed file. For large diffs (>500 lines), read the stat summary first, then read changes file-by-file using `git diff --cached -- <path>`.

While reading, classify each change into categories:

- **Feature** — new capability, new endpoint, new screen, new module
- **Bugfix** — corrects incorrect behavior, fixes crash, fixes data issue
- **Refactor** — restructures without changing behavior (rename, move, extract)
- **Dependency** — adds, removes, or upgrades a dependency
- **Test** — adds or modifies test coverage
- **Config/Build** — CI, Gradle, package.json, Dockerfile, environment config
- **Documentation** — README, comments, ADRs, design docs

### Step 3 — Gather Supporting Context

Depending on the change, gather additional context:

- `git log --oneline -10` — recent commit history for narrative continuity
- `git log --oneline main..HEAD` — all commits on this branch
- `git branch -vv` — tracking branch and upstream info
- Related files (tests, config, build files) for understanding impact
- `git blame <file>` — if understanding *why* existing code was written matters

### Step 4 — Write the PR Description

Follow the PR description template in [references/pr-description-template.md](references/pr-description-template.md).

Key principles:
- **Lead with the "why"** — reviewers need to understand the problem before the solution
- **Group changes logically** — not by file, but by purpose (e.g., "Added error handling for timeout scenarios" not "Modified PaymentService.kt, TimeoutHandler.kt, PaymentServiceTest.kt")
- **Be specific about testing** — include exact commands reviewers can run
- **Call out risks** — flag anything that could break existing behavior, affect performance, or needs extra scrutiny
- **Keep it under 80 lines** — concise descriptions get reviewed faster

### Step 5 — Write the Commit Message

Follow the conventions in [references/commit-message-conventions.md](references/commit-message-conventions.md).

Key rules:
- Pure ASCII only — no emoji, no Unicode, no special characters
- No `#` characters anywhere in the message (Git treats them as comment markers)
- Subject line: `type(scope): description` — max 72 characters
- Body: explain what and why, wrapped at 90 characters per line
- Include a `Test Plan:` section with verification steps
- Keep the total message under 60 lines

### Step 6 — Generate Verification Commands

Based on the types of files changed, include the appropriate verification commands:

| File Type | Verification Commands |
|-----------|----------------------|
| `*.kt` (Android) | `./gradlew testDebugUnitTest`, `./gradlew lintDebug` |
| `*.swift` (iOS) | `xcodebuild test -scheme <Scheme> -destination 'platform=iOS Simulator,name=iPhone 16'` |
| `*.ts/*.tsx` (Web) | `npm test`, `npm run lint`, `npm run build` |
| `*.java` (Spring Boot) | `./mvnw test`, `./gradlew test` |
| `*.dart` (Flutter) | `flutter test`, `dart analyze`, `flutter build apk --debug` |
| `build.gradle*` | `./gradlew dependencies`, `./gradlew assembleDebug` |
| `package.json` | `npm ci && npm test`, `npm audit` |
| `Dockerfile` | `docker build -t <tag> .`, `docker run --rm <tag> <healthcheck>` |

### Step 7 — Write the Output File

Combine the PR description and commit message into a single Markdown file. Default filename: `PR-SUMMARY.md` in the repository root (or user-specified location).

The file contains both sections so the author can copy each to the appropriate destination:
- PR description → GitHub PR form
- Commit message → `git commit` editor or `git commit -m`

## References

| Document | When to Read |
|----------|-------------|
| [Commit Message Conventions](references/commit-message-conventions.md) | Always — defines the commit message format, types, scopes, and line rules |
| [PR Description Template](references/pr-description-template.md) | Always — defines the PR output structure, section guidance, and examples |
| [Git Analysis Patterns](references/git-analysis-patterns.md) | When investigating complex history, merge conflicts, or multi-branch workflows |
