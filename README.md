# Student Course Management App

A simple student course management app built as a one-day product engineering practice project.

The app allows students to view their courses, assignments, and grades, while teachers can create courses, add assignments, and grade student submissions.

The goal of this project is to practice building a small full-stack application with authentication, role-based access, database relationships, and basic CRUD operations.

## 🎯 Goal

This project is mainly for learning and experimentation.

I want to practice:

* Building a full-stack application
* Working with a database
* Authentication
* Role-based access
* CRUD operations
* API/server-side logic
* Forms and validation
* Dashboard data
* Git and GitHub
* Deploying an application

---

# 👥 User Roles

There are two user types.

### Student

Students can:

* Sign up and log in
* View their courses
* View assignments
* Submit an assignment
* View their grades

### Teacher

Teachers can:

* Sign up and log in
* Create courses
* Create assignments
* View student submissions
* Grade submissions

---

# ⭐ Core Features

## Authentication

* Sign up
* Login
* Logout
* User roles
* Protected dashboard

## Student Dashboard

Students can see:

* Number of courses
* Upcoming assignments
* Recent grades
* Average grade

## Teacher Dashboard

Teachers can see:

* Number of courses
* Number of assignments
* Pending submissions
* Recent activity

## Courses

Teachers can:

* Create a course
* Edit a course
* Delete a course

Students can:

* View available courses
* View course details

## Assignments

Teachers can create assignments containing:

* Title
* Description
* Course
* Due date

Students can:

* View assignments
* Submit an assignment
* See whether an assignment has been submitted

## Grades

Teachers can:

* View submissions
* Add a grade
* Add short feedback

Students can:

* View their grades
* View teacher feedback

---

# 🗄️ Simple Database Structure

The application can use the following tables.

### Users

```text
id
name
email
password
role
created_at
```

### Courses

```text
id
name
description
teacher_id
created_at
```

### Enrollments

```text
id
student_id
course_id
```

### Assignments

```text
id
course_id
title
description
due_date
created_at
```

### Submissions

```text
id
assignment_id
student_id
content
submitted_at
grade
feedback
```

Keep the database simple. A separate grades table is not necessary for this practice project.

---

# 🔐 Basic Permissions

Students should only be able to:

* View their own submissions
* View their own grades
* Access student features

Teachers should only be able to:

* Manage their own courses
* Manage assignments for their courses
* Grade submissions for their courses

The backend should enforce these permissions rather than relying only on the frontend.

---

# 📱 Main Pages

## Public

```text
/
 /login
 /register
```

## Student

```text
/student/dashboard
/student/courses
/student/courses/[id]
/student/assignments
/student/grades
```

## Teacher

```text
/teacher/dashboard
/teacher/courses
/teacher/courses/[id]
/teacher/assignments
/teacher/submissions
```

---

# 🛠️ Suggested Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* PostgreSQL
* Supabase
* Git
* GitHub
* Vercel

The exact stack can be changed if another setup makes the project faster to build.

---

# 🚀 One-Day Development Plan

## Step 1 — Setup

* Create project
* Set up styling
* Connect database
* Set up authentication

## Step 2 — Core Data

* Create database tables
* Create sample users
* Create sample courses
* Create sample assignments

## Step 3 — Student Experience

* Student dashboard
* Course list
* Assignment list
* Submission
* Grades

## Step 4 — Teacher Experience

* Teacher dashboard
* Course creation
* Assignment creation
* Submission list
* Grading

## Step 5 — Polish

* Loading states
* Empty states
* Basic validation
* Responsive layout
* Fix obvious bugs

## Step 6 — Deploy

* Push to GitHub
* Deploy to Vercel
* Test the production version

---

# 🧪 Important Edge Cases

Keep the edge cases limited to the most useful ones:

* User tries to access the wrong dashboard
* Student tries to view another student's submission
* Teacher tries to edit another teacher's course
* Student submits an assignment twice
* Assignment has passed its due date
* Course has no assignments
* Student has no grades

---

# 📌 Out of Scope

To keep this project achievable in one day, the following are intentionally excluded:

* Email notifications
* Push notifications
* File uploads
* Attendance
* Course discussions
* School administration
* Parent accounts
* Multiple schools
* AI features
* Complex analytics
* Calendar
* Payment features

---

# 🎯 Definition of Done

The project is complete when:

* [ ] Users can register and log in
* [ ] Users have student or teacher roles
* [ ] Students can view courses
* [ ] Teachers can create courses
* [ ] Teachers can create assignments
* [ ] Students can submit assignments
* [ ] Teachers can grade submissions
* [ ] Students can view grades
* [ ] Basic permissions work
* [ ] The app is responsive
* [ ] The project is deployed
* [ ] The code is pushed to GitHub

---

# 📚 What I Practiced

This project helped me practice:

* Frontend development
* Backend logic
* Database relationships
* Authentication
* Authorization
* CRUD operations
* Form handling
* Data fetching
* State management
* Error handling
* Git/GitHub
* Deployment

---

# 📝 Development Journal

See [`journal.md`](./journal.md) for notes about the development process, technical decisions, problems, and lessons learned.
