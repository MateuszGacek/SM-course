# Agent Guide

This repo is a static, modular learning website. Keep it simple, data-driven, and GitHub Pages compatible.

## Principles

- Do not add a backend, build step, database, or server-only dependency.
- Keep course content in `data/courses.js`.
- Keep UI logic in `scripts/`.
- Keep visual rules in `styles/`.
- Avoid giant single-file HTML pages.
- Prefer reusable component helpers from `scripts/components.js`.
- Use relative URLs via `pathToRoot()` and `coursePath()` from `scripts/router.js`.
- Preserve localStorage keys unless intentionally migrating data.

## UI Components

Reusable UI helpers live in `scripts/components.js`.

Current component API version: `1.0.0`.

Available helpers include:

- buttons
- dropdown selectors
- search inputs
- text areas
- status selectors
- progress controls
- favorite/bookmark buttons
- collapsible lesson sections

When improving the site, extend these helpers instead of duplicating controls in page renderers.

## Course Data Shape

Each course has:

- `slug`
- `title`
- `summary`
- `level`
- `status`
- `accent`
- `tags`
- `outcomes`
- `subcourses`

Each subcourse has:

- `slug`
- `title`
- `summary`
- `duration`
- `status`
- `lessons`

Each lesson has:

- `id`
- `title`
- `summary`
- `topics`
- `tasks`
- `hints`

## Quality Checklist

- Home supports many courses.
- Course pages support many subcourses.
- Subcourse pages support many lessons.
- Search works on home, course, and subcourse pages.
- Favorites and progress persist with localStorage.
- Notes persist per course and subcourse.
- Navigation works from nested GitHub Pages paths.
- Mobile layout remains readable.

