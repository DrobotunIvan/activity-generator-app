# 0001: Stack Choice

## Context
The system requires a lightweight client-side web application deployable on GitHub Pages without a backend. The application must support filtering, randomization, custom activities, and simple state management.

## Decision
We will use Vanilla HTML, CSS, and JavaScript (ES Modules) without any external frameworks (React, Vue, etc.) or build tools (Vite, Webpack).

## Options Considered
- Vanilla HTML/CSS/JS (Chosen)
- Vite + Vanilla JS
- Vite + React + TypeScript

## Consequences
- Maximum simplicity and zero dependencies.
- Perfect fit for pure GitHub Pages hosting without requiring a CI build step.
- Manual DOM manipulation is required but manageable given the app's small scope.

## Rejected Options and Why
- React: Overkill for simple DOM updates and filtering.
- Vite: A build step is unnecessary since we have a simple file structure.
