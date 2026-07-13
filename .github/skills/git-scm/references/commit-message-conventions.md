# Commit Message Conventions

## Format

```
type(scope): subject line (max 72 characters)

Body paragraph explaining WHAT changed and WHY. Wrap lines at 90
characters for readability in terminal windows and git log output.
Leave one blank line between the subject and body.

Additional paragraphs are fine when the change is complex. Focus on
the reasoning behind the change, not a line-by-line recitation of
the diff — reviewers can read the diff themselves.

Test Plan:
- Step 1: describe how to verify the change
- Step 2: include specific commands where applicable
- Step 3: note any manual verification needed
```

## Hard Rules

These are non-negotiable — violating them causes tooling or readability problems.

| Rule | Reason |
|------|--------|
| Pure ASCII only | Unicode and emoji render inconsistently across terminals, CI logs, and git clients |
| No `#` characters | Git's default comment character — lines starting with `#` are stripped from commit messages |
| Subject line max 72 chars | GitHub truncates at 72; `git log --oneline` is unreadable beyond this |
| Body lines wrap at 90 chars | Standard terminal width; unwrapped lines force horizontal scrolling |
| Total message under 60 lines | Keeps `git log -1` output scannable; forces concision |
| Blank line after subject | Git tooling uses this to separate subject from body |

## Type Prefixes

Use lowercase. Pick the type that best describes the *primary* purpose of the commit.

| Type | When to Use |
|------|------------|
| `feat` | New feature or capability visible to users or consumers |
| `fix` | Bug fix — corrects incorrect behavior |
| `refactor` | Code restructuring with no behavior change |
| `test` | Adding or modifying tests only |
| `docs` | Documentation changes only |
| `build` | Build system, dependencies, CI/CD configuration |
| `perf` | Performance improvement with no behavior change |
| `chore` | Housekeeping — formatting, linting config, file moves |
| `revert` | Reverts a previous commit (reference the reverted SHA) |

## Scope

The scope narrows which area of the codebase is affected. Use the module name, feature area, or layer:

```
feat(payments): add support for contactless refund flow
fix(receipt-printer): handle USB disconnect during print job
refactor(auth): extract token refresh into dedicated service
build(gradle): upgrade AGP to 8.4.0 and Kotlin to 2.0.0
test(settlement): add edge cases for partial batch close
```

If the change spans multiple scopes, either omit the scope or use the most significant one:
```
feat: add offline transaction queue with sync worker
```

## Subject Line Guidelines

- Use imperative mood: "add support for" not "added support for"
- Do not end with a period
- Do not capitalize beyond the first word (unless proper noun)
- Be specific: "fix null crash in PaymentViewModel.onSubmit" not "fix bug"

## Body Guidelines

- Explain the *why* — what problem existed, what decision was made
- Mention alternatives considered if the approach is non-obvious
- Reference issue/ticket numbers naturally: "Resolves JIRA-1234" or "Related to issue 567"
- For multi-file changes, group by logical concern, not by filename
- If the commit is a revert, explain why the original change was reverted

## Test Plan Section

The Test Plan appears at the end of the body. It gives future readers (and CI reviewers) a quick reference for how the change was verified.

```
Test Plan:
- Run ./gradlew testDebugUnitTest -- all payment tests pass
- Run ./gradlew lintDebug -- no new warnings
- Manual: open app, process contactless refund, verify receipt prints
- Verify: git diff --stat shows no unintended file changes
```

Keep the test plan factual and reproducible. Include:
- Automated test commands with expected outcomes
- Manual verification steps if applicable
- Build/lint commands that confirm no regressions

## Examples

### Feature commit
```
feat(payments): add contactless refund support for PAX A920

Implement the contactless refund flow for PAX A920 terminals.
Previously, refunds required card insertion even when the original
transaction was contactless. This change allows tap-to-refund when
the terminal supports CVM bypass for refund amounts under the
contactless floor limit.

Changes:
- Add RefundFlowType.CONTACTLESS to the transaction state machine
- Extend PaxDeviceAdapter to send the contactless refund APDU sequence
- Update RefundViewModel to select flow type based on original txn
- Add UI indicator showing "Tap card to refund" prompt

Test Plan:
- Run ./gradlew :payments:testDebugUnitTest -- 14 new tests pass
- Run ./gradlew :payments:lintDebug -- no new warnings
- Manual: process a contactless sale, then refund it via tap
- Verify refund receipt shows correct amount and "CONTACTLESS" label
```

### Bug fix commit
```
fix(settlement): prevent duplicate batch close on rapid double-tap

The "Close Batch" button did not disable itself after the first tap,
allowing a second tap to fire before the first network request
completed. This caused duplicate settlement requests, resulting in
double-posted batches in the gateway.

Root cause: the ViewModel emitted a Loading state but the Compose
button was not observing it for the enabled flag.

Fix: bind the button's enabled state to !isLoading and add an
idempotency key to the settlement request as a safety net.

Test Plan:
- Run ./gradlew :settlement:testDebugUnitTest
- Verify SettlementViewModelTest.batchClose_disablesButton passes
- Verify SettlementViewModelTest.batchClose_idempotent passes
- Manual: rapidly double-tap Close Batch, confirm single request
```

### Refactor commit
```
refactor(auth): extract token refresh into TokenRefreshService

The token refresh logic was duplicated across three API interceptors
(PaymentApi, SettlementApi, ReportingApi). Extracted into a shared
TokenRefreshService with synchronized refresh to prevent stampede
when multiple interceptors detect an expired token simultaneously.

No behavior change. All existing auth tests pass without modification.

Test Plan:
- Run ./gradlew testDebugUnitTest -- all 247 tests pass
- Run ./gradlew assembleDebug -- build succeeds
- Verify no new lint warnings
```
