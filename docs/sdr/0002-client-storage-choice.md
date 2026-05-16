# 0002: Client Storage Choice

## Context
The application must persist user data (favorites, custom activities, history) without a backend.

## Decision
We will use the browser's `localStorage`.

## Options Considered
- `localStorage` (Chosen)
- `sessionStorage`
- `IndexedDB`

## Consequences
- Data is persistent across browser sessions.
- Easy to implement synchronous API.
- Storage limit (~5MB) is more than enough for simple activity objects and history IDs.

## Rejected Options and Why
- `sessionStorage`: Does not persist across tab closures.
- `IndexedDB`: Too complex for the small amount of simple data we are storing. We only need basic CRUD operations.
