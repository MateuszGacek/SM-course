# Agent Guide

This repo is a static, modular multi-course learning website. Current phase: course navigation and placeholders only. Do not add real lesson content unless the user explicitly asks for the next course-content step.

## Principles

- Do not add a backend, build step, database, or server-only dependency.
- Keep each course definition in its own `data/courses/<course-slug>.js` file.
- Keep the central course registry in `data/courses/index.js`.
- Keep UI logic in `scripts/`.
- Keep visual rules in `styles/`.
- Avoid giant single-file HTML pages.
- Do not create monolithic course data files.
- Write course explanations, descriptions, summaries, notes, UI copy, and learning guidance in Polish.
- Keep code, production-style examples, API names, variable names, commit-style snippets, and realistic engineering artifacts in English when that matches real-world code practice.
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
- collapsible sections

When improving the site, extend these helpers instead of duplicating controls in page renderers.

## Course Data Shape

Course-facing text should be Polish by default so the learner can read quickly. Technical examples may use English, especially when they represent production code, API contracts, TypeScript types, Git messages, logs, or interview-style code snippets.

Each course has:

- `slug`
- `title`
- `summary`
- `path`
- `priority`
- `status`
- `accent`
- `learningPath`
- `contentStatus`
- `focusAreas`
- `plannedModules`

Each planned module has:

- `title`
- `scope`
- `projectPlaceholder`

Valid `learningPath` values:

- `foundations`
- `professional-rn`
- `fullstack-awareness`
- `production-engineer`
- `bonus`

## Quality Checklist

- Home supports many courses grouped by learning path.
- Course pages render placeholders and planned modules.
- Search works on home by title, path, focus area, and planned module.
- Favorites and progress persist with localStorage.
- Notes persist per course.
- Navigation works from GitHub Pages paths.
- Mobile layout remains readable.
