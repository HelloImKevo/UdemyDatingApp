# PR Description Template

## Output Structure

The PR description file contains two sections — the PR description for GitHub and the commit message for git. Both go in one file so the author can copy each to its destination.

```markdown
Pull Request Description
========================

Title: <type>(scope): concise summary

## Summary

<2-5 sentences: what this PR does and why it matters. Lead with the
problem, then the solution. A reviewer should understand the purpose
after reading just this section.>

## Changes

### <Logical Group 1 — e.g., "Contactless Refund Flow">
- Description of change and its purpose
- Another related change

### <Logical Group 2 — e.g., "Test Coverage">
- What tests were added or modified
- What edge cases are now covered

### <Logical Group 3 — e.g., "Build Configuration">
- Dependency or config changes

## Testing

### Automated
- `./gradlew testDebugUnitTest` — all tests pass
- `npm test` — all suites pass

### Manual Verification
1. Step-by-step instructions for manual QA
2. Include specific inputs, expected outputs
3. Note any device/environment requirements

### Verification Commands
```shell
# Build verification
./gradlew assembleDebug

# Unit tests
./gradlew testDebugUnitTest

# Lint
./gradlew lintDebug

# Full check
./gradlew check
```

## Risks & Known Issues

- <Flag anything that could break existing behavior>
- <Note any performance implications>
- <Call out areas needing extra review scrutiny>
- If none, write "None — this change is backwards-compatible and
  covered by automated tests."

## Related

- Resolves: JIRA-XXXX (or GitHub issue link)
- Related: links to design docs, ADRs, Slack threads
- Depends on: other PRs that must merge first

---

Git Commit Message
==================

<Copy the block below into your git commit editor or use with
git commit -m>

type(scope): subject line max 72 chars

Body explaining what changed and why, wrapped at 90 characters
per line. Reference the ticket if applicable.

Test Plan:
- Automated: ./gradlew testDebugUnitTest
- Manual: description of manual verification
- Lint: ./gradlew lintDebug
```

## Writing Guidelines

### Summary Section
- Lead with *why* — what problem exists, what user need drives this
- Then *what* — the approach taken
- Avoid implementation details here — save those for Changes
- If this is a bugfix, describe the symptom, root cause, and fix in that order

### Changes Section
- Group by logical concern, not by file path
- Each bullet should describe a *purpose*, not just a file modification
- Bad: "Modified PaymentService.kt" — Good: "Added retry logic for declined transactions"
- Use sub-groups when the PR touches multiple areas (feature, tests, config)
- If the PR is large, add a "Files at a Glance" table:

```markdown
| File | Change |
|------|--------|
| PaymentService.kt | Added retry with exponential backoff |
| PaymentServiceTest.kt | 6 new test cases for retry scenarios |
| build.gradle.kts | Bumped coroutines to 1.8.0 |
```

### Testing Section
- Be specific about *what* to run and *what to expect*
- Include both automated commands and manual steps
- For manual steps, include exact inputs ("enter amount $1.00, tap card")
- Note any required test environment setup (emulator, device, backend)

### Risks Section
- Be honest — flag genuinely risky areas, don't just write "None"
- Call out backwards-incompatible changes explicitly
- Note any changes to public APIs, database schemas, or serialization formats
- If performance-sensitive code changed, say so

## Sizing Guidelines

| PR Size | Lines Changed | Description Length |
|---------|--------------|-------------------|
| Small | < 50 lines | 15-25 lines |
| Medium | 50-200 lines | 30-50 lines |
| Large | 200-500 lines | 50-80 lines |
| Too Large | > 500 lines | Consider splitting the PR |

The 80-line hard cap on PR descriptions forces concision. If you
cannot describe the PR in 80 lines, the PR itself may be too large
and should be split into smaller, reviewable units.

## Anti-Patterns to Avoid

| Anti-Pattern | Fix |
|-------------|-----|
| "Updated files" | Describe *what* changed and *why* |
| Copy-pasting the full diff | Summarize at the right abstraction level |
| No test plan | Always include verification steps, even for docs changes |
| "LGTM" test plan | Specify exact commands and expected outcomes |
| Burying breaking changes | Call them out prominently in Summary and Risks |
| Emoji and decoration | Keep it professional and scannable |
| Wall of text | Use bullets, headers, and tables for scannability |
