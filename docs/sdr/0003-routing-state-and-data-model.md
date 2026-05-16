# 0003: Routing, State, and Data Model

## Context
We need to manage multiple views (Generator, Favorites, Custom Activities, Statistics) and state in a Single Page Application (SPA) without a framework.

## Decision
- **Routing**: Simple section toggling using CSS classes (e.g., `.hidden`). No hash routing is necessary for this scope.
- **State**: Maintained in memory and synchronized with `localStorage` on change.
- **Data Model**:
  - `activities`: Array of base demo activities + custom activities.
  - `favorites`: Array of activity IDs.
  - `history`: Array of objects `{ activityId, generatedAt }`.

## Consequences
- Very fast transitions between views.
- State management is straightforward but must be carefully updated in tandem with DOM updates.
