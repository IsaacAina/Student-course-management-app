# Case Study: EduPulse — Student Course & Assignment Management App

A responsive, client-side web application designed to help students track coursework, monitor GPA, and submit assignments, while providing teachers with an intuitive portal to create courses, manage assignments, and grade student work.

---

## 📌 Project Overview

**EduPulse** was built as a hands-on product engineering project to practice designing a full-featured dashboard application with dual user personas, complex weighted score calculations, and real-time client-side state management.

Unlike standard static prototypes, EduPulse is a fully interactive Single-Page Application (SPA) that operates entirely in the browser with persistent local storage and instant role toggling.

---

## 🎯 Why I Built It

The primary objective was to practice end-to-end frontend product engineering without relying on heavy frameworks or backend infrastructure. Key goals included:

* **Dual-User Experience Design:** Building distinct workflows for Students (tracking deadlines, submitting work, checking GPA) and Teachers (course management, coursework creation, inline grading).
* **State & Data Persistence:** Architecting a clean client-side state store backed by `localStorage` with automated data validation (e.g., auto-marking overdue tasks).
* **Mathematical Operations in JS:** Implementing real-time GPA algorithms based on weighted course assignments and letter grade conversions.
* **Modern Vanilla Web Skills:** Deepening skills in HTML5, Vanilla JavaScript (ES6+), custom CSS design systems (CSS variables, glassmorphic UI, responsive layouts), and accessibility patterns.

---

## ⭐ Implemented Features

### 👤 1. Role Switcher & Persona Management
* **Instant Role Toggle:** Switch between **Student** (Alex Morgan) and **Teacher / Admin** (Prof. Robert Davis) at any time via the top navigation toggle.
* **Role-Based UI Visibility:** Dynamic rendering adjusts navigation items, action buttons, and portal views based on the active role.

### 🎓 2. Student Experience
* **Interactive Dashboard:**
  * **Key Metrics:** Real-time Overall GPA, pending tasks count, completion rate percentage, and total enrolled courses.
  * **Urgent Deadlines Widget:** Displays upcoming tasks sorted by due date.
  * **Course Overview:** Visual progress cards showing course grades.
  * **Recent Grades & Feedback Feed:** Quick summary of recently evaluated work.
* **My Courses View:** Grid of enrolled subjects (e.g., CS101, MATH202) showing schedule, room details, instructor info, coursework progress bars, and current grades.
* **Assignments & Deadlines Hub:**
  * **Filter Tabs:** View all tasks or filter by status (`Pending`, `Submitted`, `Graded`, `Overdue`).
  * **Filter & Sort Controls:** Filter by specific course or priority (`High`, `Medium`, `Low`), and sort by due date or priority.
  * **Global Search:** Live text search across assignment titles, descriptions, and course codes.
* **Assignment Submission Modal:** Students can turn in work by adding text notes and simulating file attachments.
* **Grades & Performance Analytics:**
  * **Cumulative GPA Display:** Weighted out of 4.00 with academic standing indicators.
  * **Performance Metrics:** Average score, total graded items, best performing course, and letter grade equivalents (A, A-, B+, etc.).
  * **Course Breakdown Tables:** Itemized list of all assignments, weights, points, percentage scores, and teacher comments.

### 🛠️ 3. Teacher & Admin Portal
* **Management Hub Navigation:** 4 dedicated sub-tabs for administrative tasks:
  1. **Manage Assignments:** Full table view of created coursework with quick edit and deletion tools.
  2. **Interactive Gradebook:** Inline score and feedback editing table with quick-save capabilities.
  3. **Review Submissions Inbox:** Dedicated view for inspecting student text submissions and attached file metadata with a one-click grading modal.
  4. **Manage Courses:** Table of active courses with edit and creation features.
* **Coursework Modals:** Modal dialogs for creating or editing courses (course code, theme color, instructor, schedule, room) and assignments (title, course selection, priority, due date/time, max points, grade weight %, instructions).

### 🔔 4. Smart System Utilities
* **Urgent Deadline Notifications:** Header notification bell with a dropdown listing items due within 48 hours or overdue.
* **Auto-Overdue Evaluator:** Automatically checks task deadlines against the current time and updates task statuses.
* **Demo Data Reset:** One-click option in the sidebar to reset all application state to initial seed data.
* **Toast Notifications:** Feedback popups for actions like saving grades, creating assignments, or turning in work.

---

## 🛠️ Technologies Used

* **Frontend Structure:** HTML5 (Semantic elements, accessible modal dialogs, data attributes)
* **Styling & UI Design:** Vanilla CSS3 (Custom CSS properties, Glassmorphism backdrop filters, CSS Grid & Flexbox, micro-transitions)
* **Application Logic:** Vanilla JavaScript (ES6+, IIFE module pattern, event delegation, client-side routing)
* **Data Persistence:** Browser `localStorage` API (`edupulse_app_data_v1`)
* **Assets & Typography:** FontAwesome 6.4 (Icons), Google Fonts (Inter & Outfit)

---

## 💡 Key Decisions

1. **Vanilla JS & No Build Step:** Opted for pure Vanilla HTML/CSS/JS rather than framework tooling. This made the application lightweight, fast, and easy to run directly in any browser without build dependencies.
2. **Client-Side SPA Architecture:** Implemented single-page view switching using section IDs and `data-view` attributes for instant navigation without page reloads.
3. **Unified State Store & Centralized Renderer:** Maintained a single `appState` object saved in `localStorage`, paired with a `renderAllViews()` execution pipeline to ensure UI consistency whenever data changes.
4. **Simulated Role Switcher over Heavy Auth:** Used a header toggle to switch between student and teacher modes instead of requiring account creation, allowing immediate exploration of both user flows.
5. **Simulated File Attachments:** Allowed users to input simulated attachment filenames during submission, keeping the app completely functional without needing cloud blob storage.

---

## 📚 What I Learned

* **State Synchronization:** Managing reactive UI updates across multiple views (Dashboard, Assignment lists, Gradebook, Header badges) from a single source of truth in Vanilla JS.
* **Weighted Grade Algorithms:** Writing algorithms to calculate weighted course averages (`(score / maxPoints) * weight`) and converting percentage results into standard GPA scales (4.0 scale).
* **DOM Event Delegation:** Using global event listeners and `data-*` attributes to handle dynamic modal triggers and table interactions efficiently.
* **UI/UX Refinement:** Applying glassmorphism design trends, dark theme color palettes, and feedback toasts to enhance user experience.

---

## 🔮 What I Would Improve

If expanding this project beyond a client-side practice application, I would:

1. **Connect a Real Backend:** Integrate Firebase or Node.js with PostgreSQL/Supabase for authentic multi-user registration, database storage, and secure server-side role authorization.
2. **Real File Uploads:** Add cloud file storage (e.g. AWS S3 or Supabase Storage) for actual PDF/assignment file uploads.
3. **Student Enrollment System:** Enable students to browse a course catalog and self-enroll or drop subjects dynamically.
4. **Course Discussions & Announcements:** Build a real-time message board for instructors to post announcements and answer student questions.
5. **Export & Reports:** Add functionality to export student transcripts or gradebook tables as PDF/CSV files.

