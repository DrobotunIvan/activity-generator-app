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
* manage custom activities;
* view generation history.

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
* create custom activities;
* delete activities;
* reset demo data;
* view statistics and history.

---

# 4. Main Entities

## 4.1 Activity

Represents an activity idea.

Attributes:

* id
* title
* description
* category
* duration
* locationType
* costType
* difficulty
* rating
* isFavorite

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

Example categories:

* Sport
* Education
* Creativity
* Entertainment
* Outdoor
* Relaxation

---

## FR-3 Activity Filtering

The user shall be able to filter activities by:

* duration;
* location type;
* cost type;
* difficulty level.

---

## FR-4 Favorites Management

The user shall be able to:

* add activities to favorites;
* remove activities from favorites;
* view favorite activities.

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

The system shall provide a button to restore default demo activities.

---

## FR-8 Statistics

The system shall display simple statistics:

* number of generated activities;
* number of favorite activities;
* most selected category.

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

---

## BR-5 Validation Rule

At least one category must be selected before generating activities.

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

The user interface shall adapt to mobile and desktop screen sizes.

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
