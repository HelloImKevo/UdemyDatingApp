# Git Analysis Patterns

Reference for complex git operations. Read this when investigating history, resolving ambiguity, or working with multi-branch workflows.

## Table of Contents

1. [Determining What to Analyze](#determining-what-to-analyze)
2. [Reading Complex Diffs](#reading-complex-diffs)
3. [Branch Comparison Strategies](#branch-comparison-strategies)
4. [Stash Investigation](#stash-investigation)
5. [History Investigation](#history-investigation)
6. [Handling Large Changelists](#handling-large-changelists)
7. [Multi-Commit Branch Summarization](#multi-commit-branch-summarization)

## Determining What to Analyze

Start every analysis by understanding the working tree state:

```bash
# What is the current state?
git status

# Are there staged changes?
git diff --cached --stat

# Are there unstaged changes?
git diff --stat

# Are there stashed changes?
git stash list

# What branch are we on and what's upstream?
git branch -vv

# What are the recent commits?
git log --oneline -10
```

Use this decision tree:

| State | User Likely Wants | Primary Command |
|-------|------------------|-----------------|
| Staged changes, no commits ahead | PR for what they are about to commit | `git diff --cached` |
| No staged, unstaged changes | Preview before staging | `git diff` |
| Multiple commits ahead of main | PR for the whole branch | `git diff main...HEAD` |
| Recent commits, clean tree | Summary of what they just committed | `git log -p -N` |
| Stash entries present | Summary of stashed WIP | `git stash show -p` |

## Reading Complex Diffs

### Stat-first approach
Always start with `--stat` to get the bird's-eye view before reading full diffs:

```bash
# Overview: which files, how many lines
git diff --cached --stat

# Then full diff for specific files of interest
git diff --cached -- src/main/kotlin/com/example/PaymentService.kt
```

### Filtering noise
Some changes are mechanical and obscure the real modifications:

```bash
# Ignore whitespace changes
git diff --cached -w

# Ignore moved lines (renamed files)
git diff --cached --diff-filter=M

# Show only added/deleted files
git diff --cached --diff-filter=AD --stat

# Show renames with similarity threshold
git diff --cached -M80 --stat
```

### Understanding renames
Git detects renames by content similarity. If a file was moved AND modified:

```bash
# Detect renames with 50% similarity threshold
git diff --cached -M50 --stat

# Show the actual rename path
git diff --cached --diff-filter=R --name-status
```

## Branch Comparison Strategies

### Two-dot vs three-dot diff

```bash
# Two-dot: diff between tips of two branches (includes changes on both sides)
git diff main..feature-branch

# Three-dot: changes on feature-branch since it diverged from main
# This is usually what you want for a PR
git diff main...feature-branch
```

### Listing commits on a branch

```bash
# Commits on this branch not in main
git log --oneline main..HEAD

# With graph to see merge structure
git log --oneline --graph main..HEAD

# With file stats per commit
git log --stat main..HEAD
```

### Finding the merge base

```bash
# Where did this branch diverge from main?
git merge-base main HEAD

# How far ahead/behind?
git rev-list --left-right --count main...HEAD
# Output: "3    7" means main is 3 ahead, HEAD is 7 ahead
```

## Stash Investigation

```bash
# List all stashes with dates
git stash list --date=relative

# Show what a specific stash contains (summary)
git stash show stash@{0} --stat

# Show full diff of a stash
git stash show -p stash@{0}

# Show untracked files in stash (if stashed with -u)
git stash show -p --include-untracked stash@{0}
```

## History Investigation

### Tracing a specific change

```bash
# Who last changed each line of a file?
git blame src/main/kotlin/PaymentService.kt

# Why was a specific line written? Show the commit that introduced it
git log -1 -p -S "specificCodeString" -- src/main/kotlin/PaymentService.kt

# History of a specific function (git tracks function-level changes)
git log -p -L :functionName:src/main/kotlin/PaymentService.kt
```

### Finding when a bug was introduced

```bash
# Binary search through history
git bisect start
git bisect bad          # current commit is broken
git bisect good v1.2.0  # this tag was known-good
# Git checks out the midpoint; test and mark good/bad until found
```

### Searching commit messages

```bash
# Find commits mentioning a ticket
git log --oneline --grep="JIRA-1234"

# Find commits that added or removed a specific string
git log --oneline -S "PaymentProcessor" --since="2026-01-01"
```

## Handling Large Changelists

When the diff is very large (>500 lines), use a structured approach:

1. **Start with stat**: `git diff --cached --stat` to see all files and line counts
2. **Categorize files**: group by directory/module to understand scope
3. **Read high-impact files first**: focus on business logic, not generated code
4. **Skip mechanical changes**: auto-formatting, import reordering, whitespace
5. **Summarize by component**: one bullet per logical change, not per file

For extremely large changelists, suggest the author split the PR:

```
This changelist touches N files across M modules. Consider splitting:
- PR 1: <refactor/preparation changes>
- PR 2: <the core feature>
- PR 3: <test coverage additions>
```

## Multi-Commit Branch Summarization

When a branch has many commits, the PR description should tell a coherent story, not list every commit. Use this approach:

1. `git log --oneline main..HEAD` to see all commits
2. Group commits by intent (feature work, fixups, refactors)
3. Identify the narrative arc: setup → core change → cleanup
4. Write the PR description from the narrative, not from the commit list
5. If commits are messy, suggest the author squash before merging
