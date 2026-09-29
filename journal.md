# Student Course Management App (EduPulse) — Development Journal

## 📌 Project Summary

* **Project:** EduPulse (Student Course & Assignment Management App)
* **Type:** Interactive Product Engineering Practice Application
* **Tech Stack:** Vanilla HTML5, CSS3, Vanilla JavaScript (ES6+), `localStorage`
* **Status:** Completed

---

## 📝 1. Development Log & What I Worked On

### Core Application Architecture
* Set up a Single-Page Application (SPA) structure in `index.html` with distinct view sections (`dashboard`, `courses`, `assignments`, `grades`, `admin-hub`).
* Implemented a custom CSS design system (`styles.css`) utilizing CSS variables for theme styling, dark mode accents, glassmorphic cards, responsive flex/grid layouts, and micro-animations.
* Created a centralized client-side data store (`appState`) in `app.js` with `localStorage` persistence and automatic initialization using default seed data.

### Student Experience Implementation
* **Dashboard View:** Created key metric widgets for Overall GPA, pending tasks count, completion rate %, and enrolled courses count. Built an urgent deadlines list and recent grades feed.
* **Courses View:** Designed course cards displaying course code tags, instructor info, class schedules, room locations, enrolled student counts, coursework progress bars, and letter grades.
* **Assignments View:** Built multi-status tab filtering (`All`, `Pending`, `Submitted`, `Graded`, `Overdue`), course and priority dropdown filters, sorting options, and global text search.
* **Assignment Submission Flow:** Built a modal allowing students to submit text notes and specify attachment filenames.
* **Grades & Performance Analytics:** Developed GPA calculation algorithms (weighted score sum divided by total weights) and letter grade mapping (A through F / 4.0 scale), paired with course grade breakdown tables.

### Teacher & Admin Portal Implementation
* **Role Switcher:** Added a top navigation toggle switch to flip between Student mode and Teacher/Admin mode, updating the user profile display and enabling admin-only UI elements.
* **Management Hub:** Built 4 sub-tabs for teachers:
  1. **Manage Assignments:** Table listing created assignments with edit and deletion actions.
  2. **Interactive Gradebook:** Inline table input for direct score and feedback entry with instant saving.
  3. **Review Submissions Inbox:** Inbox view showing student submissions with a direct modal link to award points and feedback.
  4. **Manage Courses:** Table for creating and updating course details.
* **Modals:** Implemented pop-up dialogs for assignment and course creation/editing, submission turn-in, and grading.

---

## 💡 2. Important Decisions Made

1. **Vanilla JS SPA over Heavy Frameworks:** Decided to build the entire app with zero external framework dependencies (pure HTML/CSS/JS). This kept the app lightweight, fast to load, and easy to run in any browser without transpilation or build steps.
2. **Instant Role Toggle over Complex Auth System:** Rather than spending time setting up a mock authentication login/register screen, I implemented an instant toggle switch in the navbar. This allows immediate testing and exploration of both Student and Teacher workflows.
3. **Simulated File Uploads:** Saved time by using text/filename simulation for assignment attachments rather than building complex file upload handlers or requiring cloud storage setup.
4. **Single State Container with Re-rendering:** Used a single state object saved to `localStorage` and called a unified `renderAllViews()` method on state changes, ensuring all views stay synchronized.

---

## 🛠️ 3. Problems Encountered & How I Solved Them

### Problem 1: Keeping Multiple Dynamic Views Synchronized
* **Issue:** When a student turns in an assignment or a teacher edits a grade, multiple UI components need updates simultaneously (e.g., Dashboard stats, Assignment list badges, Gradebook table, Header notification count).
* **Solution:** Centralized data mutations into dedicated handler functions, updated the shared `appState` object, saved to `localStorage`, and called `renderAllViews()` to update all UI components reliably.

### Problem 2: Handling Overdue Assignments Automatically
* **Issue:** Pending assignments needed to transition to `OVERDUE` automatically when the due date passed.
* **Solution:** Created an `autoCheckOverdueStatus()` function that runs on page load and state changes, comparing `dueDate` ISO strings against `new Date()`.

### Problem 3: Inline Gradebook Scoring Validation
* **Issue:** Entering invalid numerical scores in the inline gradebook could distort GPA calculations.
* **Solution:** Added bounds checking in `saveInlineGrade()` to validate that entered scores are non-negative numbers within the assignment's `maxPoints` limit, displaying toast notifications when input is invalid.

---

## ⏸️ 4. What I Parked (Out of Scope)

* **Backend Server & Real Database:** Parked building a Node.js/Express backend and PostgreSQL/Supabase database in favor of a fast client-side `localStorage` solution.
* **Actual File Binary Storage:** Parked real PDF/DOCX file uploading and server storage.
* **Multi-Student Enrollment Management:** Parked dynamic student course registration/drop features (kept enrolled counts as fixed course metadata).
* **Real-Time WebSockets:** Parked live notifications and collaborative grading.

---

## 🤖 5. Working with Antigravity

Using **Antigravity** as an AI coding assistant helped accelerate building the application.

### What Worked Well
* **Rapid UI Component & Layout Generation:** Antigravity was effective at drafting clean HTML structures and CSS layout rules (CSS Grid, Flexbox, dynamic badges, glassmorphism cards).
* **Data Manipulation & Utility Functions:** Quickly generated date formatting helpers, weighted average formulas, and GPA letter grade mapping logic.
* **Event Handling Patterns:** Helped structure modular event listeners and public API methods for modal dialog triggers.

### What I Learned from Building with Antigravity
* **Reviewing State Flow:** AI-generated code works best when structured around a clear state flow. Verifying how state mutations reflect in DOM rendering was essential.
* **Keeping Scope Focused:** Giving specific instructions on exact components and features yielded cleaner, more maintainable code than asking for vague high-level requirements.

---

## 🚀 Final Project Checklist

* [x] Core functionality completed
* [x] Dual-role toggle (Student / Teacher) working
* [x] Student features working (Dashboard, Courses, Assignments, Submissions, Grades)
* [x] Teacher features working (Management Hub, Assignment CRUD, Inline Gradebook, Submissions Inbox, Course CRUD)
* [x] Responsive layout & glassmorphic CSS styling completed
* [x] `localStorage` persistence working
* [x] GitHub README case study completed

