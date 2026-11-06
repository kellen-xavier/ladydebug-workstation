# AGENTS

All the Agents must read this file first. And read after [README](README.md) and [docs](docs)

## Project Structure & Module Organization

This is a static, multi-page React and TypeScript portfolio. Page registration is in `src/pages.ts`; shared layouts and sections are in `src/components/`. Editable copy belongs in `src/content/` (Markdown for prose, TypeScript for typed data). Images, fonts, and the downloadable CV are in `src/assets/`; CSS is in `src/styles/`. Bun scripts are in `scripts/`; generated output is in `.generated/` and `dist/`. Unit tests are in `tests/`, browser tests in `e2e/`.

## Build, Test, and Development Commands

- `bun install --frozen-lockfile` installs the locked dependencies.
- `bun run dev` starts the hot-reloading site at `http://localhost:3000`.
- `bun test` runs unit, content, and integration tests.
- `bunx playwright install chromium` installs the browser for end-to-end tests.
- `bun run test:browser` tests the development site at desktop, tablet, and mobile widths.
- `bun run test:browser:production` builds the site, then tests the static production output.
- `bun run build` writes publishable pages and assets to `dist/`; `bun run preview` builds and serves them locally.
- `bun run typecheck` checks TypeScript; `bun run lint` checks Biome lint and formatting.

## Coding Style & Naming Conventions

Use two spaces and double quotes in TypeScript/TSX; Biome enforces formatting and recommended lint rules. CSS uses four spaces. Name React components and files in PascalCase (`WorkflowPage.tsx`); use camelCase for helpers and hooks (`contentFormat.ts`, `useHashReveal.ts`). Keep copy in content files. Preserve page IDs and links. Use relative paths for Markdown images so the build works under the GitHub Pages project subpath.

## Testing Guidelines

Write or update tests before changing behavior. Bun tests use `tests/*.test.ts(x)`; browser tests use `e2e/*.e2e.ts`. Keep descriptions in English. For intentional copy changes, update expectations and `tests/fixtures/portfolio-text.txt`. Run unit tests, typecheck, and lint; run production browser tests for page generation, routing, asset, or responsive changes. Prefer accessible roles and labels in browser tests.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit prefixes such as `feat:`, `refactor(content):`, `test/docs:`, and `docs:`. Use a concise summary. Open pull requests against `main` with a clear description, screenshots for visual changes, and notes on content or route changes. GitHub Actions checks lint, types, unit tests, and production browser tests; validated pushes to `main` publish `dist/` to GitHub Pages.
