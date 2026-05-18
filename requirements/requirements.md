# Activity Generator App Requirements

## 1. System Purpose

The purpose of the system is to help users find ideas for spending free time based on their interests and preferences.
The application generates random activities according to selected categories, filters, and user settings.

The system is designed as a lightweight client-side web application that can be deployed on GitHub Pages.

---

# 2. System Scope

The system allows users to:

* select activity categories;
* configure activity preferences;
* generate random activities;
* filter activities;
* save favorite activities;
* reorder favorite activities via interactive drag-and-drop;
* manage custom activities;
* view generation history and statistics;
* export and import all custom activities, history, and preferences as a local JSON file.

The system does not include:

* user authentication;
* backend server;
* cloud database;
* payment processing;
* social networking features.

All data is stored locally in browser LocalStorage.

---

# 3. User Roles

## 3.1 Guest User

The application supports one user role:

### Guest User capabilities:

* generate activities;
* filter activities;
* save favorites;
* reorder favorites via drag-and-drop;
* create custom activities with character validation;
* delete activities;
* reset demo data;
* view statistics and history;
* export/import local user data.

---

# 4. Main Entities

## 4.1 Activity

Represents an activity idea.

Attributes:

* id
* title
* description (formatted in italics)
* category
* duration
* locationType
* costType
* difficulty
* rating
* isFavorite
* isCustom

---

## 4.2 UserPreferences

Represents user-selected preferences.

Attributes:

* selectedCategories
* maxDuration
* preferredLocation
* preferredCostType

---

## 4.3 ActivityHistory

Stores previously generated activities.

Attributes:

* activityId
* generatedAt

---

# 5. Functional Requirements

## FR-1 Activity Generation

The system shall generate a random activity according to selected user preferences and filters.

---

## FR-2 Category Selection

The user shall be able to select one or multiple activity categories.
The categories are fully localized in Ukrainian:

* Спорт (Sport)
* Навчання (Education)
* Креативність (Creativity)
* Розваги (Entertainment)
* На вулиці (Outdoor)
* Відпочинок (Relaxation)

---

## FR-3 Activity Filtering

The user shall be able to filter activities by:

* duration (using an interactive range slider);
* location type;
* cost type;
* difficulty level.

---

## FR-4 Favorites Management

The user shall be able to:

* add activities to favorites;
* remove activities from favorites;
* view favorite activities;
* reorder favorite activities interactively using drag-and-drop sorting.

---

## FR-5 Custom Activity Management

The user shall be able to:

* create custom activities;
* edit custom activities;
* delete custom activities.

---

## FR-6 Activity History

The system shall store and display recently generated activities.

---

## FR-7 Demo Data Reset

The system shall provide a button to restore default localized demo activities.

---

## FR-8 Statistics

The system shall display simple statistics:

* number of generated activities;
* number of favorite activities;
* most selected category.

---

## FR-9 Data Portability (Export & Import)

The user shall be able to:

* export all favorites, custom activities, and preferences to a local JSON file;
* import data from a previously exported JSON file to restore their configurations.

---

# 6. Business Rules

## BR-1 Free Activities Rule

If the user selects “Free only”, the system shall not display paid activities.

---

## BR-2 Duration Rule

If the user sets maximum duration, the system shall only display activities with equal or lower duration.

---

## BR-3 Category Rule

The system shall only generate activities from selected categories.

---

## BR-4 Anti-Repetition Rule

The system shall avoid generating the same activity repeatedly within the last 5 generations.
However, if active filters yield fewer than 5 total matching activities, the anti-repetition rule is relaxed automatically to prevent a "No activities found" error.

---

## BR-5 Validation Rule

At least one category must be selected before generating activities.

---

## BR-6 Drag & Drop Persistence Rule

The manually sorted order of favorite activities must persist in LocalStorage and remain identical on page reload.

---

## BR-7 Custom Input Validation Rule

Custom activity inputs (title and description) must adhere to character limits (e.g., maximum length validation) to prevent UI breaking and layout overlap.

---

# 7. Non-Functional Requirements

## NFR-1 Platform

The application shall work in modern desktop and mobile browsers.

---

## NFR-2 Deployment

The application shall be deployable on GitHub Pages.

---

## NFR-3 Performance

The application shall load within 3 seconds on a normal internet connection.

---

## NFR-4 Persistence

User data shall persist using browser LocalStorage.

---

## NFR-5 Responsiveness

The user interface shall adapt to mobile and desktop screen sizes (fully responsive grid and flex layouts).

---

## NFR-6 Dark Glassmorphism Styling

The application shall feature a dark glassmorphism theme:
* Semi-transparent dark panels (`rgba(30, 30, 35, 0.5)` background with `backdrop-filter: blur(10px)`);
* Dynamic dice background image filling the viewport.

---

## NFR-7 Premium Typography

The application shall utilize premium typography from Google Fonts:
* **Outfit** font for general body text and navigation elements;
* **Playfair Display** (bold & italic) for the main title logo and primary buttons.

---

## NFR-8 Micro-Animations & Dynamic Hover Effects

The application shall feature engaging UI micro-animations:
* **Spotlight effect**: A dynamic cursor tracker on cards that increases card contrast by 50% under the mouse cursor.
* **Bouncing Category Icons**: Theme emojis (🏃, 📚, 🎨, 🎮, 🏕️, 🧘) must perform a jump-and-tilt micro-animation when hovered.

---

## NFR-9 Language Support

The user interface, controls, and default list of 34+ activities must be fully localized in Ukrainian.

---

# 8. Acceptance Criteria

## AC-1 Activity Generation

Given selected categories and filters,
when the user clicks “Generate”,
then the system displays a matching activity.

---

## AC-2 Favorites

Given a generated activity,
when the user clicks “Add to Favorites”,
then the activity appears in the favorites list.

---

## AC-3 Validation

Given no selected category,
when the user attempts to generate an activity,
then the system displays a validation error.

---

## AC-4 Custom Activity

Given valid activity data,
when the user submits the form,
then the activity is added to the system.

---

## AC-5 Reset Demo Data

When the user clicks “Reset Demo Data”,
then default activities are restored.

---

## AC-6 Drag-and-Drop Reordering

Given a list of favorite activities,
when the user drags a card and drops it in a new position,
then the list reorders accordingly and the new order is saved to LocalStorage.

---

## AC-7 Data Portability

Given local custom activities and favorites,
when the user exports their data,
then a JSON file is downloaded.
When the user imports a valid JSON file,
then their configurations are successfully merged/restored.

---

# 9. Assumptions and Constraints

## Assumptions

* Users have internet access.
* Users use modern browsers.
* Users do not require account registration.

---

## Constraints

* The system must work without a backend server.
* The system must use client-side storage only.
* The system must be compatible with GitHub Pages hosting.
* The project should remain lightweight and suitable for educational purposes.
