/* ==========================================================================
   EDUPULSE COURSE MANAGEMENT APP - JAVASCRIPT LOGIC
   100% Vanilla JS (ES6+) - LocalStorage Persistence - Role Switcher
   ========================================================================== */

(function () {
  'use strict';

  // LocalStorage Key
  const STORAGE_KEY = 'edupulse_app_data_v1';

  // Initial Seed Data (Loaded if LocalStorage is empty)
  const DEFAULT_SEED_DATA = {
    role: 'student', // 'student' or 'teacher'
    user: {
      name: 'Alex Morgan',
      initials: 'AM',
      roleText: 'Student'
    },
    courses: [
      {
        id: 'c1',
        code: 'CS101',
        name: 'Data Structures & Algorithms',
        instructor: 'Dr. Alan Turing',
        schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
        room: 'Science Hall 302',
        color: '#6366f1',
        enrolledCount: 42
      },
      {
        id: 'c2',
        code: 'MATH202',
        name: 'Multivariable Calculus',
        instructor: 'Prof. Ada Lovelace',
        schedule: 'Tue, Thu 01:00 PM - 02:30 PM',
        room: 'Math Building 108',
        color: '#3b82f6',
        enrolledCount: 38
      },
      {
        id: 'c3',
        code: 'PHYS105',
        name: 'General University Physics',
        instructor: 'Dr. Richard Feynman',
        schedule: 'Mon, Wed 02:00 PM - 03:30 PM',
        room: 'Physics Lab 12B',
        color: '#10b981',
        enrolledCount: 29
      },
      {
        id: 'c4',
        code: 'ENG110',
        name: 'Academic Writing & Research',
        instructor: 'Prof. Virginia Woolf',
        schedule: 'Friday 09:00 AM - 12:00 PM',
        room: 'Humanities 201',
        color: '#f59e0b',
        enrolledCount: 25
      }
    ],
    assignments: [
      {
        id: 'a1',
        courseId: 'c1',
        title: 'AVL Tree & Graph Traversals',
        description: 'Implement AVL Tree balancing and BFS/DFS algorithms with time complexity analysis.',
        dueDate: getRelativeDateOffset(2), // 2 days in future
        priority: 'HIGH',
        maxPoints: 100,
        weight: 15,
        status: 'PENDING',
        score: null,
        feedback: null,
        submissionText: null,
        attachment: null,
        submittedAt: null
      },
      {
        id: 'a2',
        courseId: 'c2',
        title: 'Stokes Theorem & Vector Calculus Problem Set',
        description: 'Solve problem set #4 covering surface integrals and Green theorem applications.',
        dueDate: getRelativeDateOffset(4), // 4 days in future
        priority: 'MEDIUM',
        maxPoints: 50,
        weight: 10,
        status: 'PENDING',
        score: null,
        feedback: null,
        submissionText: null,
        attachment: null,
        submittedAt: null
      },
      {
        id: 'a3',
        courseId: 'c3',
        title: 'Electromagnetism Lab Report #2',
        description: 'Analyze experimental data from magnetic coil flux measurements and submit PDF lab log.',
        dueDate: getRelativeDateOffset(-1), // 1 day overdue
        priority: 'HIGH',
        maxPoints: 100,
        weight: 20,
        status: 'OVERDUE',
        score: null,
        feedback: null,
        submissionText: null,
        attachment: null,
        submittedAt: null
      },
      {
        id: 'a4',
        courseId: 'c1',
        title: 'Array & Hash Map Benchmark Assignment',
        description: 'Compare performance metrics between custom HashMap implementation and Array search.',
        dueDate: getRelativeDateOffset(-3), // Submitted 3 days ago
        priority: 'MEDIUM',
        maxPoints: 100,
        weight: 15,
        status: 'SUBMITTED',
        score: null,
        feedback: null,
        submissionText: 'Completed hash table implementation in Java with linear probing collision resolution.',
        attachment: 'hashmap_benchmark.zip',
        submittedAt: getRelativeDateOffset(-3)
      },
      {
        id: 'a5',
        courseId: 'c1',
        title: 'Midterm Algorithmic Exam',
        description: 'In-class written exam covering Sorting, Dynamic Programming, and Recursion.',
        dueDate: getRelativeDateOffset(-10),
        priority: 'HIGH',
        maxPoints: 100,
        weight: 25,
        status: 'GRADED',
        score: 96,
        feedback: 'Outstanding performance! Flawless dynamic programming proofs.',
        submissionText: 'Submitted in-class physical exam sheet.',
        attachment: null,
        submittedAt: getRelativeDateOffset(-10)
      },
      {
        id: 'a6',
        courseId: 'c2',
        title: 'Calculus Quiz #1',
        description: 'Partial derivatives and gradient vectors quick evaluation.',
        dueDate: getRelativeDateOffset(-12),
        priority: 'LOW',
        maxPoints: 30,
        weight: 10,
        status: 'GRADED',
        score: 28,
        feedback: 'Great step-by-step vector derivations.',
        submissionText: 'Online Quiz Submission #904',
        attachment: null,
        submittedAt: getRelativeDateOffset(-12)
      },
      {
        id: 'a7',
        courseId: 'c3',
        title: 'Optics & Wave Motion Mechanics',
        description: 'Calculate refraction angles and diffraction grating patterns for monochromatic lasers.',
        dueDate: getRelativeDateOffset(-15),
        priority: 'MEDIUM',
        maxPoints: 100,
        weight: 15,
        status: 'GRADED',
        score: 88,
        feedback: 'Good observations, but double-check your error propagation calculations.',
        submissionText: 'Laser optics data log attached.',
        attachment: 'optics_report.pdf',
        submittedAt: getRelativeDateOffset(-15)
      },
      {
        id: 'a8',
        courseId: 'c4',
        title: 'Literary Essay Draft - Modernism',
        description: 'Write a 1500-word analysis on stream-of-consciousness narrative techniques.',
        dueDate: getRelativeDateOffset(-8),
        priority: 'MEDIUM',
        maxPoints: 100,
        weight: 20,
        status: 'GRADED',
        score: 92,
        feedback: 'Compelling thesis statement and eloquent prose style!',
        submissionText: 'Literary analysis essay on To The Lighthouse.',
        attachment: 'essay_draft_v2.docx',
        submittedAt: getRelativeDateOffset(-8)
      }
    ]
  };

  // State Container
  let appState = {};
  let currentView = 'dashboard';
  let currentAdminTab = 'assignments';

  // Helper: Date offset ISO generator
  function getRelativeDateOffset(daysOffset, hoursOffset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    d.setHours(d.getHours() + hoursOffset);
    return d.toISOString();
  }

  // --- INITIALIZATION ---
  function init() {
    loadState();
    autoCheckOverdueStatus();
    setupEventListeners();
    updateRoleUI();
    renderAllViews();
    showToast('EduPulse loaded successfully', 'info');
  }

  // Save to LocalStorage
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }

  // Load from LocalStorage
  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        appState = JSON.parse(stored);
      } else {
        appState = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
        saveState();
      }
    } catch (e) {
      console.error('Error loading state from localStorage', e);
      appState = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
    }
  }

  // Auto-mark past due pending assignments as OVERDUE
  function autoCheckOverdueStatus() {
    const now = new Date();
    let updated = false;
    appState.assignments.forEach(a => {
      if (a.status === 'PENDING') {
        const due = new Date(a.dueDate);
        if (due < now) {
          a.status = 'OVERDUE';
          updated = true;
        }
      }
    });
    if (updated) saveState();
  }

  // --- ROLE SWITCHER & UI ---
  function updateRoleUI() {
    const isTeacher = appState.role === 'teacher';
    const body = document.body;
    const roleToggleCheckbox = document.getElementById('role-toggle-checkbox');
    const studentLabel = document.getElementById('role-student-label');
    const adminLabel = document.getElementById('role-admin-label');
    const userNameDisplay = document.getElementById('user-name-display');
    const userRoleDisplay = document.getElementById('user-role-display');
    const userAvatarText = document.getElementById('user-avatar-text');

    if (isTeacher) {
      body.classList.add('admin-mode-active');
      roleToggleCheckbox.checked = true;
      studentLabel.classList.remove('active');
      adminLabel.classList.add('active');
      userNameDisplay.textContent = 'Prof. Robert Davis';
      userRoleDisplay.textContent = 'Teacher / Admin';
      userAvatarText.textContent = 'RD';
    } else {
      body.classList.remove('admin-mode-active');
      roleToggleCheckbox.checked = false;
      studentLabel.classList.add('active');
      adminLabel.classList.remove('active');
      userNameDisplay.textContent = appState.user.name;
      userRoleDisplay.textContent = 'Student';
      userAvatarText.textContent = appState.user.initials;
    }
  }

  // --- VIEW ROUTING ---
  function switchView(viewName) {
    currentView = viewName;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const views = document.querySelectorAll('.view-section');
    views.forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Close mobile sidebar if open
    document.getElementById('app-sidebar').classList.remove('mobile-open');

    // Re-render specific view
    renderAllViews();
  }

  function switchAdminTab(tabName) {
    currentAdminTab = tabName;
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-admin-tab') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const contents = document.querySelectorAll('.admin-tab-content');
    contents.forEach(content => {
      if (content.id === `admin-tab-${tabName}`) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    renderAdminHub();
  }

  // --- RENDERING ENGINE ---
  function renderAllViews() {
    renderHeaderNotifications();
    renderDashboard();
    renderCourses();
    renderAssignments();
    renderGrades();
    renderAdminHub();
    updateBadges();
  }

  function updateBadges() {
    const pendingCount = appState.assignments.filter(a => a.status === 'PENDING' || a.status === 'OVERDUE').length;
    const badgeEl = document.getElementById('assignments-badge-count');
    if (badgeEl) badgeEl.textContent = pendingCount;
  }

  // Header Notifications
  function renderHeaderNotifications() {
    const now = new Date();
    const notifBadge = document.getElementById('notif-badge');
    const notifCountText = document.getElementById('notif-count-text');
    const notifList = document.getElementById('notif-list');

    // Filter assignments due within 48 hours or overdue
    const urgentItems = appState.assignments.filter(a => {
      if (a.status === 'OVERDUE') return true;
      if (a.status === 'PENDING') {
        const due = new Date(a.dueDate);
        const diffHours = (due - now) / (1000 * 60 * 60);
        return diffHours <= 48;
      }
      return false;
    });

    notifBadge.textContent = urgentItems.length;
    notifCountText.textContent = `${urgentItems.length} items`;

    if (urgentItems.length === 0) {
      notifList.innerHTML = `<div class="notif-empty"><i class="fa-solid fa-circle-check text-success"></i> No urgent deadlines!</div>`;
      return;
    }

    notifList.innerHTML = urgentItems.map(a => {
      const course = getCourseById(a.courseId);
      const isOverdue = a.status === 'OVERDUE';
      const dueFormatted = formatTimeLeft(a.dueDate);
      return `
        <div class="notif-item" onclick="app.openAssignmentAction('${a.id}')">
          <div class="notif-item-title">${escapeHTML(a.title)} (${course ? course.code : ''})</div>
          <div class="notif-item-time ${isOverdue ? 'text-danger' : 'text-warning'}">
            <i class="fa-solid ${isOverdue ? 'fa-triangle-exclamation' : 'fa-clock'}"></i>
            ${isOverdue ? 'OVERDUE - ' + dueFormatted : 'Due ' + dueFormatted}
          </div>
        </div>
      `;
    }).join('');
  }

  // 1. Render Dashboard
  function renderDashboard() {
    // Stats calculation
    const totalAssignments = appState.assignments.length;
    const pendingItems = appState.assignments.filter(a => a.status === 'PENDING' || a.status === 'OVERDUE');
    const submittedItems = appState.assignments.filter(a => a.status === 'SUBMITTED' || a.status === 'GRADED');
    const completionRate = totalAssignments > 0 ? Math.round((submittedItems.length / totalAssignments) * 100) : 0;
    const gpa = calculateOverallGPA();

    document.getElementById('stat-gpa').textContent = gpa.toFixed(2);
    document.getElementById('stat-pending').textContent = pendingItems.length;
    document.getElementById('stat-urgent-sub').textContent = `${pendingItems.filter(a => a.priority === 'HIGH').length} high priority`;
    document.getElementById('stat-completion').textContent = `${completionRate}%`;
    document.getElementById('stat-submitted-ratio').textContent = `${submittedItems.length} of ${totalAssignments} completed`;
    document.getElementById('stat-courses-count').textContent = appState.courses.length;

    // Urgent Deadlines List Widget
    const dashUrgentList = document.getElementById('dash-urgent-list');
    const upcomingList = appState.assignments
      .filter(a => a.status === 'PENDING' || a.status === 'OVERDUE')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4);

    if (upcomingList.length === 0) {
      dashUrgentList.innerHTML = `<div class="notif-empty"><i class="fa-solid fa-glass-cheers text-success"></i> All caught up! No pending deadlines.</div>`;
    } else {
      dashUrgentList.innerHTML = upcomingList.map(a => {
        const course = getCourseById(a.courseId);
        const statusBadge = getStatusBadgeHTML(a.status);
        const timeLeft = formatTimeLeft(a.dueDate);
        return `
          <div class="assignment-compact-item">
            <div class="assignment-compact-left">
              <span class="course-badge-mini" style="background-color: ${course ? course.color : '#6366f1'}">${course ? course.code : 'COURSE'}</span>
              <div>
                <div class="assignment-compact-title">${escapeHTML(a.title)}</div>
                <div class="assignment-compact-sub"><i class="fa-regular fa-clock"></i> ${timeLeft}</div>
              </div>
            </div>
            <div>
              ${statusBadge}
            </div>
          </div>
        `;
      }).join('');
    }

    // Course Overview Mini Grid
    const dashCoursesList = document.getElementById('dash-courses-list');
    dashCoursesList.innerHTML = appState.courses.map(c => {
      const courseGrade = calculateCourseScore(c.id);
      return `
        <div class="assignment-compact-item" style="border-left: 4px solid ${c.color}">
          <div>
            <div class="assignment-compact-title">${escapeHTML(c.code)} - ${escapeHTML(c.name)}</div>
            <div class="assignment-compact-sub"><i class="fa-solid fa-user-tie"></i> ${escapeHTML(c.instructor)}</div>
          </div>
          <span class="course-grade-pill">${courseGrade.gradeText}</span>
        </div>
      `;
    }).join('');

    // Recent Grades Feed Widget
    const dashGradesFeed = document.getElementById('dash-grades-feed');
    const gradedList = appState.assignments
      .filter(a => a.status === 'GRADED')
      .slice(0, 4);

    if (gradedList.length === 0) {
      dashGradesFeed.innerHTML = `<div class="notif-empty">No graded assignments yet.</div>`;
    } else {
      dashGradesFeed.innerHTML = gradedList.map(a => {
        const course = getCourseById(a.courseId);
        const pct = Math.round((a.score / a.maxPoints) * 100);
        return `
          <div class="assignment-compact-item">
            <div>
              <div class="assignment-compact-title">${escapeHTML(a.title)}</div>
              <div class="assignment-compact-sub">${course ? course.code : ''} • ${escapeHTML(a.feedback || 'Graded')}</div>
            </div>
            <div style="text-align: right">
              <div style="font-weight: 800; font-size: 16px; color: #34d399">${a.score}/${a.maxPoints}</div>
              <div style="font-size: 11px; color: #94a3b8">${pct}%</div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 2. Render Courses
  function renderCourses() {
    const grid = document.getElementById('courses-grid');
    const isTeacher = appState.role === 'teacher';

    grid.innerHTML = appState.courses.map(c => {
      const courseAssignments = appState.assignments.filter(a => a.courseId === c.id);
      const completedCount = courseAssignments.filter(a => a.status === 'SUBMITTED' || a.status === 'GRADED').length;
      const progressPct = courseAssignments.length > 0 ? Math.round((completedCount / courseAssignments.length) * 100) : 0;
      const gradeInfo = calculateCourseScore(c.id);

      return `
        <div class="course-card">
          <div class="course-card-banner">
            <span class="course-code-tag" style="background-color: ${c.color}">${escapeHTML(c.code)}</span>
            <h3 class="course-title">${escapeHTML(c.name)}</h3>
            <div class="course-instructor"><i class="fa-solid fa-chalkboard-user"></i> ${escapeHTML(c.instructor)}</div>
          </div>
          <div class="course-card-body">
            <div class="course-info-list">
              <div class="course-info-item">
                <i class="fa-regular fa-clock"></i>
                <span>${escapeHTML(c.schedule)}</span>
              </div>
              <div class="course-info-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>${escapeHTML(c.room)}</span>
              </div>
              <div class="course-info-item">
                <i class="fa-solid fa-users"></i>
                <span>${c.enrolledCount} Enrolled Students</span>
              </div>
            </div>

            <div class="course-progress-container">
              <div class="course-progress-label">
                <span>Coursework Progress</span>
                <span>${progressPct}%</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
              </div>
            </div>

            <div class="course-card-footer">
              <div class="course-grade-pill">${gradeInfo.gradeText} (${gradeInfo.pctText})</div>
              ${isTeacher ? `
                <button class="btn btn-sm btn-secondary" onclick="app.openEditCourseModal('${c.id}')">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
              ` : `
                <button class="btn btn-sm btn-secondary" onclick="app.filterAssignmentsByCourse('${c.id}')">
                  <i class="fa-solid fa-tasks"></i> Tasks (${courseAssignments.length})
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. Render Assignments
  function renderAssignments() {
    const grid = document.getElementById('assignments-grid');
    const courseSelect = document.getElementById('filter-course-select');
    const statusTabActive = document.querySelector('#assignment-status-tabs .filter-tab.active')?.getAttribute('data-status') || 'ALL';
    const selectedCourse = document.getElementById('filter-course-select')?.value || 'ALL';
    const selectedPriority = document.getElementById('filter-priority-select')?.value || 'ALL';
    const sortBy = document.getElementById('sort-assignments-select')?.value || 'DUE_ASC';
    const searchQuery = document.getElementById('global-search')?.value.toLowerCase().trim() || '';

    // Populate Course Select Filter
    courseSelect.innerHTML = `<option value="ALL">All Courses</option>` +
      appState.courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
    if (selectedCourse !== 'ALL') courseSelect.value = selectedCourse;

    // Update Status Counters
    const counts = {
      ALL: appState.assignments.length,
      PENDING: appState.assignments.filter(a => a.status === 'PENDING').length,
      SUBMITTED: appState.assignments.filter(a => a.status === 'SUBMITTED').length,
      GRADED: appState.assignments.filter(a => a.status === 'GRADED').length,
      OVERDUE: appState.assignments.filter(a => a.status === 'OVERDUE').length,
    };
    document.getElementById('count-all').textContent = counts.ALL;
    document.getElementById('count-pending').textContent = counts.PENDING;
    document.getElementById('count-submitted').textContent = counts.SUBMITTED;
    document.getElementById('count-graded').textContent = counts.GRADED;
    document.getElementById('count-overdue').textContent = counts.OVERDUE;

    // Filter Logic
    let filtered = appState.assignments.filter(a => {
      if (statusTabActive !== 'ALL' && a.status !== statusTabActive) return false;
      if (selectedCourse !== 'ALL' && a.courseId !== selectedCourse) return false;
      if (selectedPriority !== 'ALL' && a.priority !== selectedPriority) return false;
      if (searchQuery) {
        const course = getCourseById(a.courseId);
        const matchTitle = a.title.toLowerCase().includes(searchQuery);
        const matchDesc = a.description.toLowerCase().includes(searchQuery);
        const matchCourse = course && (course.code.toLowerCase().includes(searchQuery) || course.name.toLowerCase().includes(searchQuery));
        if (!matchTitle && !matchDesc && !matchCourse) return false;
      }
      return true;
    });

    // Sorting Logic
    filtered.sort((a, b) => {
      if (sortBy === 'DUE_ASC') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'DUE_DESC') return new Date(b.dueDate) - new Date(a.dueDate);
      if (sortBy === 'PRIORITY') {
        const pOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
        return pOrder[a.priority] - pOrder[b.priority];
      }
      if (sortBy === 'COURSE') {
        const cA = getCourseById(a.courseId)?.code || '';
        const cB = getCourseById(b.courseId)?.code || '';
        return cA.localeCompare(cB);
      }
      return 0;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background-color: #151d30; border-radius: 20px; border: 1px dashed #334155;">
          <i class="fa-solid fa-folder-open" style="font-size: 40px; color: #64748b; margin-bottom: 12px;"></i>
          <h3 style="font-size: 18px; color: #f8fafc;">No assignments found</h3>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Try adjusting your search or filter settings.</p>
        </div>
      `;
      return;
    }

    const isTeacher = appState.role === 'teacher';

    grid.innerHTML = filtered.map(a => {
      const course = getCourseById(a.courseId);
      const statusBadge = getStatusBadgeHTML(a.status);
      const priorityPill = getPriorityPillHTML(a.priority);
      const timeLeft = formatTimeLeft(a.dueDate);

      let actionButtons = '';
      if (!isTeacher) {
        if (a.status === 'PENDING' || a.status === 'OVERDUE') {
          actionButtons = `<button class="btn btn-primary btn-sm" onclick="app.openSubmitWorkModal('${a.id}')"><i class="fa-solid fa-upload"></i> Submit Work</button>`;
        } else if (a.status === 'SUBMITTED') {
          actionButtons = `<button class="btn btn-secondary btn-sm" disabled><i class="fa-solid fa-check"></i> Turn In Done</button>`;
        } else if (a.status === 'GRADED') {
          actionButtons = `<button class="btn btn-secondary btn-sm" onclick="app.viewFeedback('${a.id}')"><i class="fa-solid fa-star"></i> View Score (${a.score}/${a.maxPoints})</button>`;
        }
      } else {
        // Teacher actions
        actionButtons = `
          <button class="btn btn-secondary btn-sm" onclick="app.openGradeModal('${a.id}')"><i class="fa-solid fa-pen-to-square"></i> Grade</button>
          <button class="btn btn-danger btn-sm" onclick="app.deleteAssignment('${a.id}')"><i class="fa-solid fa-trash"></i></button>
        `;
      }

      return `
        <div class="assignment-card">
          <div>
            <div class="assignment-card-header">
              <span class="course-badge-mini" style="background-color: ${course ? course.color : '#6366f1'}">${course ? course.code : 'COURSE'}</span>
              <div style="display: flex; gap: 6px;">
                ${priorityPill}
                ${statusBadge}
              </div>
            </div>
            <h3 class="assignment-card-title">${escapeHTML(a.title)}</h3>
            <p class="assignment-card-desc">${escapeHTML(a.description)}</p>
          </div>

          <div>
            <div class="assignment-meta-row">
              <span class="assignment-time-badge ${a.status === 'OVERDUE' ? 'text-danger' : ''}">
                <i class="fa-regular fa-calendar"></i> ${timeLeft}
              </span>
              <span><strong>${a.maxPoints}</strong> pts (${a.weight}%)</span>
            </div>

            ${a.status === 'GRADED' ? `
              <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 10px; padding: 10px; margin-top: 12px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: #34d399; font-size: 13px;">
                  <span>Score Obtained</span>
                  <span>${a.score} / ${a.maxPoints} (${Math.round((a.score/a.maxPoints)*100)}%)</span>
                </div>
                ${a.feedback ? `<div style="font-size: 12px; color: #cbd5e1; margin-top: 4px; font-style: italic;">"${escapeHTML(a.feedback)}"</div>` : ''}
              </div>
            ` : ''}

            <div class="assignment-card-actions">
              ${actionButtons}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. Render Grades & GPA View
  function renderGrades() {
    const overallGpa = calculateOverallGPA();
    document.getElementById('grades-gpa-val').textContent = overallGpa.toFixed(2);

    const gradedAssignments = appState.assignments.filter(a => a.status === 'GRADED');
    document.getElementById('metric-total-graded').textContent = `${gradedAssignments.length} items`;

    let totalPctSum = 0;
    gradedAssignments.forEach(a => {
      totalPctSum += (a.score / a.maxPoints) * 100;
    });
    const avgPct = gradedAssignments.length > 0 ? (totalPctSum / gradedAssignments.length).toFixed(1) : 'N/A';
    document.getElementById('metric-avg-score').textContent = gradedAssignments.length > 0 ? `${avgPct}%` : 'N/A';

    // Best Course
    let bestCourseCode = 'N/A';
    let maxCoursePct = -1;
    appState.courses.forEach(c => {
      const info = calculateCourseScore(c.id);
      if (info.numericPct > maxCoursePct) {
        maxCoursePct = info.numericPct;
        bestCourseCode = `${c.code} (${info.pctText})`;
      }
    });
    document.getElementById('metric-best-course').textContent = bestCourseCode;

    // Course Breakdown Container
    const container = document.getElementById('grades-courses-container');
    container.innerHTML = appState.courses.map(c => {
      const courseAssignments = appState.assignments.filter(a => a.courseId === c.id);
      const courseScoreInfo = calculateCourseScore(c.id);

      return `
        <div class="grade-course-card">
          <div class="grade-course-header">
            <div>
              <span class="course-code-tag" style="background-color: ${c.color}">${escapeHTML(c.code)}</span>
              <h3>${escapeHTML(c.name)}</h3>
            </div>
            <div class="grade-course-score">${courseScoreInfo.gradeText} (${courseScoreInfo.pctText})</div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Assignment Title</th>
                  <th>Due Date</th>
                  <th>Weight</th>
                  <th>Status</th>
                  <th>Points</th>
                  <th>Score %</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                ${courseAssignments.length === 0 ? `<tr><td colspan="7" style="text-align: center; color: #94a3b8;">No coursework assigned yet.</td></tr>` : ''}
                ${courseAssignments.map(a => {
                  const pct = a.score !== null ? Math.round((a.score / a.maxPoints) * 100) : '-';
                  return `
                    <tr>
                      <td><strong>${escapeHTML(a.title)}</strong></td>
                      <td>${new Date(a.dueDate).toLocaleDateString()}</td>
                      <td>${a.weight}%</td>
                      <td>${getStatusBadgeHTML(a.status)}</td>
                      <td>${a.score !== null ? a.score : '-'} / ${a.maxPoints}</td>
                      <td>${pct !== '-' ? `<strong>${pct}%</strong>` : '-'}</td>
                      <td style="font-style: italic; color: #94a3b8;">${escapeHTML(a.feedback || '-')}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. Render Admin Portal
  function renderAdminHub() {
    renderAdminAssignmentsTable();
    renderAdminGradebook();
    renderAdminSubmissionsInbox();
    renderAdminCoursesTable();
  }

  function renderAdminAssignmentsTable() {
    const tbody = document.getElementById('admin-assignments-tbody');
    if (!tbody) return;

    tbody.innerHTML = appState.assignments.map(a => {
      const course = getCourseById(a.courseId);
      return `
        <tr>
          <td><span class="course-badge-mini" style="background-color: ${course ? course.color : '#6366f1'}">${course ? course.code : ''}</span></td>
          <td><strong>${escapeHTML(a.title)}</strong></td>
          <td>${new Date(a.dueDate).toLocaleString()}</td>
          <td>${getPriorityPillHTML(a.priority)}</td>
          <td>${a.maxPoints} pts</td>
          <td>${a.weight}%</td>
          <td>${getStatusBadgeHTML(a.status)}</td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="app.openEditAssignmentModal('${a.id}')"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-danger" onclick="app.deleteAssignment('${a.id}')"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderAdminGradebook() {
    const courseSelect = document.getElementById('gradebook-course-filter');
    const tbody = document.getElementById('admin-gradebook-tbody');
    if (!courseSelect || !tbody) return;

    // Populate Gradebook Filter Dropdown
    const currentVal = courseSelect.value || 'ALL';
    courseSelect.innerHTML = `<option value="ALL">All Courses</option>` +
      appState.courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
    if (currentVal) courseSelect.value = currentVal;

    let items = appState.assignments;
    if (courseSelect.value !== 'ALL') {
      items = items.filter(a => a.courseId === courseSelect.value);
    }

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #94a3b8;">No assignments found for gradebook entry.</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(a => {
      const course = getCourseById(a.courseId);
      const scoreVal = a.score !== null ? a.score : '';
      const feedbackVal = a.feedback || '';
      const pctDisplay = a.score !== null ? `${Math.round((a.score / a.maxPoints) * 100)}%` : '-';

      return `
        <tr>
          <td><strong>${escapeHTML(a.title)}</strong></td>
          <td><span class="course-badge-mini" style="background-color: ${course ? course.color : '#6366f1'}">${course ? course.code : ''}</span></td>
          <td>${getStatusBadgeHTML(a.status)}</td>
          <td>${a.maxPoints} pts</td>
          <td>
            <input type="number" class="inline-score-input" id="gb-score-${a.id}" value="${scoreVal}" placeholder="0-${a.maxPoints}" min="0" max="${a.maxPoints}">
          </td>
          <td><strong id="gb-pct-${a.id}">${pctDisplay}</strong></td>
          <td>
            <input type="text" class="inline-feedback-input" id="gb-fb-${a.id}" value="${escapeHTML(feedbackVal)}" placeholder="Enter feedback comment...">
          </td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="app.saveInlineGrade('${a.id}')"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderAdminSubmissionsInbox() {
    const container = document.getElementById('admin-submissions-list');
    if (!container) return;

    const submittedAssignments = appState.assignments.filter(a => a.status === 'SUBMITTED');

    if (submittedAssignments.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #94a3b8;">
          <i class="fa-solid fa-inbox" style="font-size: 36px; margin-bottom: 8px;"></i>
          <p>No pending student submissions to review.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = submittedAssignments.map(a => {
      const course = getCourseById(a.courseId);
      return `
        <div class="submission-card">
          <div class="submission-card-header">
            <div>
              <span class="course-badge-mini" style="background-color: ${course ? course.color : '#6366f1'}">${course ? course.code : ''}</span>
              <span class="submission-card-title">${escapeHTML(a.title)}</span>
            </div>
            <span class="badge badge-submitted"><i class="fa-solid fa-paper-plane"></i> Submitted ${a.submittedAt ? new Date(a.submittedAt).toLocaleDateString() : ''}</span>
          </div>
          
          <div class="submission-content-box">
            <strong>Student Response:</strong>
            <p style="margin-top: 4px;">"${escapeHTML(a.submissionText || 'No text note provided.')}"</p>
            ${a.attachment ? `<div style="margin-top: 8px; font-weight: 600; color: #818cf8;"><i class="fa-solid fa-paperclip"></i> Attachment: ${escapeHTML(a.attachment)}</div>` : ''}
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button class="btn btn-primary btn-sm" onclick="app.openGradeModal('${a.id}')">
              <i class="fa-solid fa-check-double"></i> Grade Submission Now
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderAdminCoursesTable() {
    const tbody = document.getElementById('admin-courses-tbody');
    if (!tbody) return;

    tbody.innerHTML = appState.courses.map(c => {
      return `
        <tr>
          <td><span class="course-code-tag" style="background-color: ${c.color}">${escapeHTML(c.code)}</span></td>
          <td><strong>${escapeHTML(c.name)}</strong></td>
          <td>${escapeHTML(c.instructor)}</td>
          <td>${escapeHTML(c.schedule)}</td>
          <td>${escapeHTML(c.room)}</td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="app.openEditCourseModal('${c.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn btn-sm btn-danger" onclick="app.deleteCourse('${c.id}')"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- CALCULATION UTILITIES ---
  function getCourseById(id) {
    return appState.courses.find(c => c.id === id);
  }

  function calculateCourseScore(courseId) {
    const courseAssignments = appState.assignments.filter(a => a.courseId === courseId && a.status === 'GRADED');
    if (courseAssignments.length === 0) {
      return { numericPct: 100, pctText: '100%', gradeText: 'A / 4.0' };
    }

    let weightedScoreSum = 0;
    let totalWeightSum = 0;

    courseAssignments.forEach(a => {
      const pct = (a.score / a.maxPoints);
      weightedScoreSum += pct * a.weight;
      totalWeightSum += a.weight;
    });

    const finalPct = totalWeightSum > 0 ? (weightedScoreSum / totalWeightSum) * 100 : 100;
    const gradeLetter = getLetterFromPct(finalPct);

    return {
      numericPct: finalPct,
      pctText: `${finalPct.toFixed(1)}%`,
      gradeText: gradeLetter
    };
  }

  function calculateOverallGPA() {
    if (appState.courses.length === 0) return 4.0;
    let sumGpa = 0;
    appState.courses.forEach(c => {
      const info = calculateCourseScore(c.id);
      sumGpa += getGpaPointsFromPct(info.numericPct);
    });
    return sumGpa / appState.courses.length;
  }

  function getLetterFromPct(pct) {
    if (pct >= 93) return 'A (4.0)';
    if (pct >= 90) return 'A- (3.7)';
    if (pct >= 87) return 'B+ (3.3)';
    if (pct >= 83) return 'B (3.0)';
    if (pct >= 80) return 'B- (2.7)';
    if (pct >= 77) return 'C+ (2.3)';
    if (pct >= 70) return 'C (2.0)';
    return 'F (0.0)';
  }

  function getGpaPointsFromPct(pct) {
    if (pct >= 93) return 4.0;
    if (pct >= 90) return 3.7;
    if (pct >= 87) return 3.3;
    if (pct >= 83) return 3.0;
    if (pct >= 80) return 2.7;
    if (pct >= 77) return 2.3;
    if (pct >= 70) return 2.0;
    return 0.0;
  }

  function formatTimeLeft(isoDateStr) {
    const due = new Date(isoDateStr);
    const now = new Date();
    const diffMs = due - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffMs < 0) {
      const absDays = Math.abs(diffDays);
      return absDays === 0 ? 'Overdue today' : `Overdue by ${absDays} day${absDays > 1 ? 's' : ''}`;
    }

    if (diffDays === 0) {
      return diffHours === 0 ? 'Due in less than an hour' : `Due in ${diffHours} hr${diffHours > 1 ? 's' : ''}`;
    }

    return `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }

  function getStatusBadgeHTML(status) {
    switch (status) {
      case 'PENDING':
        return `<span class="badge badge-pending"><i class="fa-solid fa-hourglass-half"></i> Pending</span>`;
      case 'SUBMITTED':
        return `<span class="badge badge-submitted"><i class="fa-solid fa-paper-plane"></i> Submitted</span>`;
      case 'GRADED':
        return `<span class="badge badge-graded"><i class="fa-solid fa-circle-check"></i> Graded</span>`;
      case 'OVERDUE':
        return `<span class="badge badge-overdue"><i class="fa-solid fa-triangle-exclamation"></i> Overdue</span>`;
      default:
        return `<span class="badge">${status}</span>`;
    }
  }

  function getPriorityPillHTML(priority) {
    switch (priority) {
      case 'HIGH':
        return `<span class="priority-pill priority-high">High</span>`;
      case 'MEDIUM':
        return `<span class="priority-pill priority-medium">Med</span>`;
      case 'LOW':
        return `<span class="priority-pill priority-low">Low</span>`;
      default:
        return '';
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --- EVENT LISTENERS & ACTIONS ---
  function setupEventListeners() {
    // Role Switcher Toggle
    const roleToggle = document.getElementById('role-toggle-checkbox');
    roleToggle.addEventListener('change', (e) => {
      appState.role = e.target.checked ? 'teacher' : 'student';
      saveState();
      updateRoleUI();
      renderAllViews();
      showToast(`Switched to ${appState.role === 'teacher' ? 'Teacher / Admin' : 'Student'} Mode`, 'info');
    });

    // Sidebar Mobile Toggle
    document.getElementById('sidebar-toggle-btn').addEventListener('click', () => {
      document.getElementById('app-sidebar').classList.toggle('mobile-open');
    });

    // Navigation Items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        switchView(targetView);
      });
    });

    // Dynamic Switch View Links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-switch-view]');
      if (link) {
        e.preventDefault();
        const view = link.getAttribute('data-switch-view');
        switchView(view);
      }
    });

    // Notification Dropdown Toggle
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });

    // Global Search Input
    const globalSearch = document.getElementById('global-search');
    globalSearch.addEventListener('input', () => {
      if (currentView === 'assignments') renderAssignments();
    });

    // Assignment Status Filter Tabs
    document.querySelectorAll('#assignment-status-tabs .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#assignment-status-tabs .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderAssignments();
      });
    });

    // Filter Controls Change
    document.getElementById('filter-course-select').addEventListener('change', renderAssignments);
    document.getElementById('filter-priority-select').addEventListener('change', renderAssignments);
    document.getElementById('sort-assignments-select').addEventListener('change', renderAssignments);

    // Admin Sub Tabs Navigation
    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-admin-tab');
        switchAdminTab(targetTab);
      });
    });

    // Admin Gradebook Course Filter
    document.getElementById('gradebook-course-filter').addEventListener('change', renderAdminGradebook);

    // Reset Demo Data Button
    document.getElementById('reset-data-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all data back to original demo state?')) {
        appState = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
        saveState();
        updateRoleUI();
        renderAllViews();
        showToast('Demo data reset successfully!', 'info');
      }
    });

    // Quick Buttons
    document.getElementById('dash-quick-submit-btn')?.addEventListener('click', () => switchView('assignments'));
    document.getElementById('dash-quick-create-btn')?.addEventListener('click', () => window.app.openCreateAssignmentModal());
    document.getElementById('dash-open-admin-btn')?.addEventListener('click', () => switchView('admin-hub'));
    document.getElementById('create-assignment-btn')?.addEventListener('click', () => window.app.openCreateAssignmentModal());
    document.getElementById('admin-create-assign-btn')?.addEventListener('click', () => window.app.openCreateAssignmentModal());
    document.getElementById('add-course-btn')?.addEventListener('click', () => window.app.openCreateCourseModal());
    document.getElementById('admin-create-course-btn')?.addEventListener('click', () => window.app.openCreateCourseModal());

    // Modal Close Listeners
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        document.getElementById(modalId).classList.add('hidden');
      });
    });

    // Form Submissions
    document.getElementById('form-assignment').addEventListener('submit', handleAssignmentFormSubmit);
    document.getElementById('form-course').addEventListener('submit', handleCourseFormSubmit);
    document.getElementById('form-submit-work').addEventListener('submit', handleSubmitWorkFormSubmit);
    document.getElementById('form-grade-work').addEventListener('submit', handleGradeWorkFormSubmit);
  }

  // --- FORM HANDLERS ---
  function handleAssignmentFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('assign-id-input').value;
    const title = document.getElementById('assign-title-input').value.trim();
    const courseId = document.getElementById('assign-course-select').value;
    const priority = document.getElementById('assign-priority-select').value;
    const dateVal = document.getElementById('assign-date-input').value;
    const maxPoints = parseFloat(document.getElementById('assign-points-input').value) || 100;
    const weight = parseFloat(document.getElementById('assign-weight-input').value) || 10;
    const description = document.getElementById('assign-desc-input').value.trim();

    const isoDueDate = new Date(dateVal).toISOString();

    if (id) {
      // Edit existing assignment
      const assign = appState.assignments.find(a => a.id === id);
      if (assign) {
        assign.title = title;
        assign.courseId = courseId;
        assign.priority = priority;
        assign.dueDate = isoDueDate;
        assign.maxPoints = maxPoints;
        assign.weight = weight;
        assign.description = description;
      }
      showToast('Assignment updated successfully!', 'success');
    } else {
      // Create new assignment
      const newAssign = {
        id: 'a_' + Date.now(),
        courseId,
        title,
        description,
        dueDate: isoDueDate,
        priority,
        maxPoints,
        weight,
        status: 'PENDING',
        score: null,
        feedback: null,
        submissionText: null,
        attachment: null,
        submittedAt: null
      };
      appState.assignments.unshift(newAssign);
      showToast('New assignment created!', 'success');
    }

    saveState();
    document.getElementById('modal-assignment').classList.add('hidden');
    renderAllViews();
  }

  function handleCourseFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('course-id-input').value;
    const code = document.getElementById('course-code-input').value.trim();
    const name = document.getElementById('course-name-input').value.trim();
    const color = document.getElementById('course-color-input').value;
    const instructor = document.getElementById('course-instructor-input').value.trim() || 'Staff Instructor';
    const room = document.getElementById('course-room-input').value.trim() || 'Online Hall';
    const schedule = document.getElementById('course-schedule-input').value.trim() || 'TBD';

    if (id) {
      const course = getCourseById(id);
      if (course) {
        course.code = code;
        course.name = name;
        course.color = color;
        course.instructor = instructor;
        course.room = room;
        course.schedule = schedule;
      }
      showToast('Course updated successfully!', 'success');
    } else {
      const newCourse = {
        id: 'c_' + Date.now(),
        code,
        name,
        color,
        instructor,
        room,
        schedule,
        enrolledCount: 30
      };
      appState.courses.push(newCourse);
      showToast('New course added!', 'success');
    }

    saveState();
    document.getElementById('modal-course').classList.add('hidden');
    renderAllViews();
  }

  function handleSubmitWorkFormSubmit(e) {
    e.preventDefault();
    const assignId = document.getElementById('submit-assign-id').value;
    const textNotes = document.getElementById('submit-text-input').value.trim();
    const attachment = document.getElementById('submit-file-input').value.trim();

    const assign = appState.assignments.find(a => a.id === assignId);
    if (assign) {
      assign.status = 'SUBMITTED';
      assign.submissionText = textNotes;
      assign.attachment = attachment || null;
      assign.submittedAt = new Date().toISOString();
      saveState();
      showToast(`Work turned in for "${assign.title}"`, 'success');
    }

    document.getElementById('modal-submit').classList.add('hidden');
    renderAllViews();
  }

  function handleGradeWorkFormSubmit(e) {
    e.preventDefault();
    const assignId = document.getElementById('grade-assign-id').value;
    const scoreVal = parseFloat(document.getElementById('grade-score-input').value);
    const feedback = document.getElementById('grade-feedback-input').value.trim();

    const assign = appState.assignments.find(a => a.id === assignId);
    if (assign) {
      assign.status = 'GRADED';
      assign.score = scoreVal;
      assign.feedback = feedback || 'Graded by instructor.';
      saveState();
      showToast(`Saved grade (${scoreVal}/${assign.maxPoints}) for ${assign.title}`, 'success');
    }

    document.getElementById('modal-grade').classList.add('hidden');
    renderAllViews();
  }

  // --- PUBLIC API METHODS (FOR INLINE CLICK HANDLERS) ---
  window.app = {
    openCreateAssignmentModal: function () {
      document.getElementById('form-assignment').reset();
      document.getElementById('assign-id-input').value = '';
      document.getElementById('modal-assignment-title').textContent = 'Create New Assignment';
      
      // Populate course options
      const select = document.getElementById('assign-course-select');
      select.innerHTML = appState.courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');

      // Default date: tomorrow at 23:59
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 0, 0);
      document.getElementById('assign-date-input').value = tomorrow.toISOString().slice(0, 16);

      document.getElementById('modal-assignment').classList.remove('hidden');
    },

    openEditAssignmentModal: function (id) {
      const a = appState.assignments.find(item => item.id === id);
      if (!a) return;

      document.getElementById('assign-id-input').value = a.id;
      document.getElementById('modal-assignment-title').textContent = 'Edit Assignment';

      const select = document.getElementById('assign-course-select');
      select.innerHTML = appState.courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
      select.value = a.courseId;

      document.getElementById('assign-title-input').value = a.title;
      document.getElementById('assign-priority-select').value = a.priority;
      document.getElementById('assign-date-input').value = new Date(a.dueDate).toISOString().slice(0, 16);
      document.getElementById('assign-points-input').value = a.maxPoints;
      document.getElementById('assign-weight-input').value = a.weight;
      document.getElementById('assign-desc-input').value = a.description;

      document.getElementById('modal-assignment').classList.remove('hidden');
    },

    deleteAssignment: function (id) {
      if (confirm('Are you sure you want to delete this assignment?')) {
        appState.assignments = appState.assignments.filter(a => a.id !== id);
        saveState();
        renderAllViews();
        showToast('Assignment deleted', 'info');
      }
    },

    openCreateCourseModal: function () {
      document.getElementById('form-course').reset();
      document.getElementById('course-id-input').value = '';
      document.getElementById('modal-course-title').textContent = 'Add New Course';
      document.getElementById('modal-course').classList.remove('hidden');
    },

    openEditCourseModal: function (id) {
      const c = getCourseById(id);
      if (!c) return;

      document.getElementById('course-id-input').value = c.id;
      document.getElementById('modal-course-title').textContent = 'Edit Course';
      document.getElementById('course-code-input').value = c.code;
      document.getElementById('course-name-input').value = c.name;
      document.getElementById('course-color-input').value = c.color;
      document.getElementById('course-instructor-input').value = c.instructor;
      document.getElementById('course-room-input').value = c.room;
      document.getElementById('course-schedule-input').value = c.schedule;

      document.getElementById('modal-course').classList.remove('hidden');
    },

    deleteCourse: function (id) {
      if (confirm('Deleting this course will also remove all associated assignments. Proceed?')) {
        appState.courses = appState.courses.filter(c => c.id !== id);
        appState.assignments = appState.assignments.filter(a => a.courseId !== id);
        saveState();
        renderAllViews();
        showToast('Course and coursework deleted', 'info');
      }
    },

    openSubmitWorkModal: function (id) {
      const a = appState.assignments.find(item => item.id === id);
      if (!a) return;

      document.getElementById('submit-assign-id').value = a.id;
      document.getElementById('submit-assign-title-display').textContent = a.title;
      const course = getCourseById(a.courseId);
      document.getElementById('submit-assign-meta-display').textContent = `${course ? course.code : ''} • Due ${new Date(a.dueDate).toLocaleString()}`;
      document.getElementById('submit-text-input').value = a.submissionText || '';
      document.getElementById('submit-file-input').value = a.attachment || '';

      document.getElementById('modal-submit').classList.remove('hidden');
    },

    openGradeModal: function (id) {
      const a = appState.assignments.find(item => item.id === id);
      if (!a) return;

      document.getElementById('grade-assign-id').value = a.id;
      document.getElementById('grade-assign-title-display').textContent = a.title;
      document.getElementById('grade-max-points-display').value = `${a.maxPoints} Points`;
      document.getElementById('grade-score-input').value = a.score !== null ? a.score : a.maxPoints;
      document.getElementById('grade-score-input').max = a.maxPoints;
      document.getElementById('grade-feedback-input').value = a.feedback || '';

      const preview = document.getElementById('grade-student-work-preview');
      preview.innerHTML = `
        <strong>Submission Status:</strong> ${getStatusBadgeHTML(a.status)}<br>
        <strong>Student Notes:</strong> ${escapeHTML(a.submissionText || 'No text submitted.')}
        ${a.attachment ? `<br><strong>Attached File:</strong> ${escapeHTML(a.attachment)}` : ''}
      `;

      document.getElementById('modal-grade').classList.remove('hidden');
    },

    saveInlineGrade: function (id) {
      const scoreInput = document.getElementById(`gb-score-${id}`);
      const fbInput = document.getElementById(`gb-fb-${id}`);
      const assign = appState.assignments.find(a => a.id === id);

      if (assign && scoreInput) {
        const val = parseFloat(scoreInput.value);
        if (isNaN(val) || val < 0 || val > assign.maxPoints) {
          showToast(`Please enter a valid score between 0 and ${assign.maxPoints}`, 'error');
          return;
        }

        assign.score = val;
        assign.feedback = fbInput ? fbInput.value.trim() : 'Graded';
        assign.status = 'GRADED';
        saveState();
        renderAllViews();
        showToast(`Grade updated for ${assign.title}`, 'success');
      }
    },

    viewFeedback: function (id) {
      const a = appState.assignments.find(item => item.id === id);
      if (a) {
        alert(`Grade Info for "${a.title}":\n\nScore: ${a.score}/${a.maxPoints} (${Math.round((a.score/a.maxPoints)*100)}%)\nFeedback: ${a.feedback || 'No comments.'}`);
      }
    },

    filterAssignmentsByCourse: function (courseId) {
      switchView('assignments');
      const select = document.getElementById('filter-course-select');
      if (select) {
        select.value = courseId;
        renderAssignments();
      }
    },

    openAssignmentAction: function (id) {
      switchView('assignments');
    }
  };

  // Toast Notification Helper
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
