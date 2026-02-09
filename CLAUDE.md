# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright end-to-end test suite targeting external websites. Uses `@playwright/test` with pnpm as the package manager.

## Commands

```bash
# Install dependencies
pnpm install

# Install browser binaries (required before first run)
pnpm exec playwright install --with-deps

# Run all tests (headless, across chromium/firefox/webkit)
pnpm exec playwright test

# Run a single test file
pnpm exec playwright test tests/example.spec.ts

# Run tests matching a name pattern
pnpm exec playwright test -g "has title"

# Run tests for a specific browser
pnpm exec playwright test --project=chromium

# Run in headed mode (visible browser)
pnpm exec playwright test --headed

# Run in UI mode (interactive)
pnpm exec playwright test --ui

# View the HTML report
pnpm exec playwright show-report
```

## Architecture

- **Test files** live in `tests/` and use the `*.spec.ts` naming convention
- **Config** is in `playwright.config.ts` — tests run in parallel across three browser projects: chromium, firefox, webkit
- **CI** runs via GitHub Actions (`.github/workflows/playwright.yml`) on push/PR to main/master; uses single worker with 2 retries
- **No base URL** is configured — tests navigate to full URLs directly
- **Traces** are collected on first retry (`trace: 'on-first-retry'`)
- **Reporter** is HTML; reports are uploaded as CI artifacts with 30-day retention
